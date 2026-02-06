import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')!

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { userId, email, origin } = await req.json()

    if (!userId || !email) {
      throw new Error('Missing userId or email')
    }

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      // Create new Stripe customer using REST API
      const customerResponse = await fetch('https://api.stripe.com/v1/customers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email,
          'metadata[supabase_user_id]': userId
        })
      })

      const customer = await customerResponse.json()
      customerId = customer.id

      // Save customer ID to database
      await supabase
        .from('user_profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId)
    }

    // Create Stripe Checkout Session using REST API
    let baseUrl = origin || req.headers.get('origin')

    // Ensure baseUrl is a valid string, fallback to huntdates.com
    if (!baseUrl || typeof baseUrl !== 'string' || baseUrl === 'null' || baseUrl === 'undefined') {
      baseUrl = 'https://huntdates.com'
    }

    // Make sure baseUrl starts with http:// or https://
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      baseUrl = 'https://' + baseUrl
    }

    const successUrl = `${baseUrl}/settings.html?success=true`
    const cancelUrl = `${baseUrl}/subscribe.html?canceled=true`

    // Build the body manually as a URL-encoded string
    const bodyParams = [
      `customer=${encodeURIComponent(customerId)}`,
      `payment_method_types[]=card`,
      `line_items[0][price]=price_1SxcNvAB2XpVyENpH0c8r0oZ`,
      `line_items[0][quantity]=1`,
      `mode=subscription`,
      `success_url=${encodeURIComponent(successUrl)}`,
      `cancel_url=${encodeURIComponent(cancelUrl)}`,
      `metadata[supabase_user_id]=${encodeURIComponent(userId)}`
    ].join('&')

    const sessionResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams
    })

    const session = await sessionResponse.json()

    if (!sessionResponse.ok) {
      throw new Error(session.error?.message || 'Failed to create checkout session')
    }

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Checkout session error:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
