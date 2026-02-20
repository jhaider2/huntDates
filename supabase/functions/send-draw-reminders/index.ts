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
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get today's date
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Hunting data (same as script.js) - using lowercase state names to match UI
    const huntingData = [
      // Wyoming
      { state: "wyoming", stateDisplay: "Wyoming", species: "Elk", deadline: "January 31, 2026", results: "March 31, 2026" },
      { state: "wyoming", stateDisplay: "Wyoming", species: "Deer", deadline: "January 31, 2026", results: "March 31, 2026" },
      { state: "wyoming", stateDisplay: "Wyoming", species: "Moose", deadline: "January 31, 2026", results: "March 31, 2026" },
      { state: "wyoming", stateDisplay: "Wyoming", species: "Antelope", deadline: "June 1, 2026", results: "July 15, 2026" },
      { state: "wyoming", stateDisplay: "Wyoming", species: "Bighorn Sheep-Desert", deadline: "January 31, 2026", results: "March 31, 2026" },
      { state: "wyoming", stateDisplay: "Wyoming", species: "Bighorn Sheep-Rocky Mtn", deadline: "January 31, 2026", results: "March 31, 2026" },
      { state: "wyoming", stateDisplay: "Wyoming", species: "Mountain Goat", deadline: "January 31, 2026", results: "March 31, 2026" },
      { state: "wyoming", stateDisplay: "Wyoming", species: "Bison", deadline: "January 31, 2026", results: "March 31, 2026" },

      // Idaho
      { state: "idaho", stateDisplay: "Idaho", species: "Elk", deadline: "April 30, 2026", results: "June 1, 2026" },
      { state: "idaho", stateDisplay: "Idaho", species: "Deer", deadline: "April 30, 2026", results: "June 1, 2026" },
      { state: "idaho", stateDisplay: "Idaho", species: "Moose", deadline: "April 30, 2026", results: "June 1, 2026" },
      { state: "idaho", stateDisplay: "Idaho", species: "Antelope", deadline: "April 30, 2026", results: "June 1, 2026" },
      { state: "idaho", stateDisplay: "Idaho", species: "Fall Bear", deadline: "April 30, 2026", results: "June 1, 2026" },
      { state: "idaho", stateDisplay: "Idaho", species: "Bighorn Sheep-Rocky Mtn", deadline: "April 30, 2026", results: "June 1, 2026" },
      { state: "idaho", stateDisplay: "Idaho", species: "Mountain Goat", deadline: "April 30, 2026", results: "June 1, 2026" },

      // Montana
      { state: "montana", stateDisplay: "Montana", species: "Elk", deadline: "March 15, 2026", results: "May 1, 2026" },
      { state: "montana", stateDisplay: "Montana", species: "Deer", deadline: "March 15, 2026", results: "May 1, 2026" },
      { state: "montana", stateDisplay: "Montana", species: "Moose", deadline: "March 15, 2026", results: "May 1, 2026" },
      { state: "montana", stateDisplay: "Montana", species: "Antelope", deadline: "March 15, 2026", results: "May 1, 2026" },
      { state: "montana", stateDisplay: "Montana", species: "Bighorn Sheep-Desert", deadline: "March 15, 2026", results: "May 1, 2026" },
      { state: "montana", stateDisplay: "Montana", species: "Bighorn Sheep-Rocky Mtn", deadline: "March 15, 2026", results: "May 1, 2026" },
      { state: "montana", stateDisplay: "Montana", species: "Mountain Goat", deadline: "March 15, 2026", results: "May 1, 2026" },

      // Nevada
      { state: "nevada", stateDisplay: "Nevada", species: "Elk", deadline: "May 13, 2026 - 11pm PDT", results: "May 29, 2026" },
      { state: "nevada", stateDisplay: "Nevada", species: "Deer", deadline: "May 13, 2026 - 11pm PDT", results: "May 29, 2026" },
      { state: "nevada", stateDisplay: "Nevada", species: "Antelope", deadline: "May 13, 2026 - 11pm PDT", results: "May 29, 2026" },
      { state: "nevada", stateDisplay: "Nevada", species: "Bighorn Sheep-Desert", deadline: "May 13, 2026 - 11pm PDT", results: "May 29, 2026" },
      { state: "nevada", stateDisplay: "Nevada", species: "Bighorn Sheep-Rocky Mtn", deadline: "May 13, 2026 - 11pm PDT", results: "May 29, 2026" },
      { state: "nevada", stateDisplay: "Nevada", species: "Mountain Goat", deadline: "May 13, 2026 - 11pm PDT", results: "May 29, 2026" },

      // Arizona
      { state: "arizona", stateDisplay: "Arizona", species: "Elk", deadline: "June 10, 2026", results: "July 1, 2026" },
      { state: "arizona", stateDisplay: "Arizona", species: "Deer", deadline: "June 10, 2026", results: "July 1, 2026" },
      { state: "arizona", stateDisplay: "Arizona", species: "Antelope", deadline: "June 10, 2026", results: "July 1, 2026" },
      { state: "arizona", stateDisplay: "Arizona", species: "Bighorn Sheep-Desert", deadline: "June 10, 2026", results: "July 1, 2026" },
      { state: "arizona", stateDisplay: "Arizona", species: "Bighorn Sheep-Rocky Mtn", deadline: "June 10, 2026", results: "July 1, 2026" },
      { state: "arizona", stateDisplay: "Arizona", species: "Bison", deadline: "June 10, 2026", results: "July 1, 2026" },

      // New Mexico
      { state: "newmexico", stateDisplay: "New Mexico", species: "Elk", deadline: "March 18, 2026 - 5pm MDT", results: "April 22, 2026" },
      { state: "newmexico", stateDisplay: "New Mexico", species: "Deer", deadline: "March 18, 2026 - 5pm MDT", results: "April 22, 2026" },
      { state: "newmexico", stateDisplay: "New Mexico", species: "Barbary Sheep (Aoudad)", deadline: "March 18, 2026 - 5pm MDT", results: "April 22, 2026" },
      { state: "newmexico", stateDisplay: "New Mexico", species: "Pronghorn", deadline: "March 18, 2026 - 5pm MDT", results: "April 22, 2026" },
      { state: "newmexico", stateDisplay: "New Mexico", species: "Ibex", deadline: "March 18, 2026 - 5pm MDT", results: "April 22, 2026" },
      { state: "newmexico", stateDisplay: "New Mexico", species: "Bighorn Sheep-Desert", deadline: "March 18, 2026 - 5pm MDT", results: "April 22, 2026" },
      { state: "newmexico", stateDisplay: "New Mexico", species: "Oryx", deadline: "March 18, 2026 - 5pm MDT", results: "April 22, 2026" },

      // Colorado
      { state: "colorado", stateDisplay: "Colorado", species: "Elk", deadline: "April 1, 2026", results: "June 1, 2026" },
      { state: "colorado", stateDisplay: "Colorado", species: "Deer", deadline: "April 1, 2026", results: "June 1, 2026" },
      { state: "colorado", stateDisplay: "Colorado", species: "Moose", deadline: "April 1, 2026", results: "June 1, 2026" },
      { state: "colorado", stateDisplay: "Colorado", species: "Antelope", deadline: "April 1, 2026", results: "June 1, 2026" },
      { state: "colorado", stateDisplay: "Colorado", species: "Bighorn Sheep-Desert", deadline: "April 1, 2026", results: "June 1, 2026" },
      { state: "colorado", stateDisplay: "Colorado", species: "Bighorn Sheep-Rocky Mtn", deadline: "April 1, 2026", results: "June 1, 2026" },
      { state: "colorado", stateDisplay: "Colorado", species: "Mountain Goat", deadline: "April 1, 2026", results: "June 1, 2026" },

      // Utah
      { state: "utah", stateDisplay: "Utah", species: "Elk", deadline: "April 23, 2026", results: "May 31, 2026" },
      { state: "utah", stateDisplay: "Utah", species: "Deer", deadline: "April 23, 2026", results: "May 31, 2026" },
      { state: "utah", stateDisplay: "Utah", species: "Moose", deadline: "April 23, 2026", results: "May 31, 2026" },
      { state: "utah", stateDisplay: "Utah", species: "Antelope", deadline: "April 23, 2026", results: "May 31, 2026" },
      { state: "utah", stateDisplay: "Utah", species: "Bighorn Sheep-Desert", deadline: "April 23, 2026", results: "May 31, 2026" },
      { state: "utah", stateDisplay: "Utah", species: "Bighorn Sheep-Rocky Mtn", deadline: "April 23, 2026", results: "May 31, 2026" },
      { state: "utah", stateDisplay: "Utah", species: "Mountain Goat", deadline: "April 23, 2026", results: "May 31, 2026" },
      { state: "utah", stateDisplay: "Utah", species: "Bison", deadline: "April 23, 2026", results: "May 31, 2026" },
      { state: "utah", stateDisplay: "Utah", species: "Turkey", deadline: "April 23, 2026", results: "May 31, 2026" },
      { state: "utah", stateDisplay: "Utah", species: "Swan", deadline: "April 23, 2026", results: "May 31, 2026" },
      { state: "utah", stateDisplay: "Utah", species: "Sportsman Permits", deadline: "November 18, 2025 - 11pm MST", results: "November 26, 2025" },
    ]

    // Parse date helper (handles time annotations)
    function parseDate(dateString: string): Date {
      const datePortion = dateString.split(' - ')[0]
      return new Date(datePortion)
    }

    // Get all users with email notifications enabled (PAYWALL TEMPORARILY DISABLED)
    const { data: profiles, error: profileError } = await supabase
      .from('user_profiles')
      .select('id, subscription_status')
      .eq('email_notifications_enabled', true)
      // .in('subscription_status', ['active', 'canceled']) // TEMPORARILY DISABLED

    if (profileError) throw profileError

    let emailsSent = 0

    // For each user with notifications enabled
    for (const profile of profiles || []) {
      // Get user's email
      const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(profile.id)
      if (userError || !user?.email) continue

      // Get user's preferences (only non-completed ones)
      const { data: preferences, error: prefError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', profile.id)
        .eq('completed', false)

      if (prefError || !preferences || preferences.length === 0) continue

      // Group reminders by state for users with "ALL" species
      const remindersByState: Record<string, any[]> = {}

      for (const pref of preferences) {
        // Find matching hunt data
        let huntsToCheck = []

        if (pref.species === 'ALL') {
          // Get all species for this state
          huntsToCheck = huntingData.filter(h => h.state === pref.state)
        } else {
          // Get specific species
          huntsToCheck = huntingData.filter(h => h.state === pref.state && h.species === pref.species)
        }

        for (const hunt of huntsToCheck) {
          const deadline = parseDate(hunt.deadline)
          const daysUntil = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

          // Check if we should send reminder
          if (daysUntil === pref.notify_days_before) {
            // Check if this reminder was already sent
            const { data: existingReminder } = await supabase
              .from('sent_reminders')
              .select('id')
              .eq('user_id', profile.id)
              .eq('state', hunt.state)
              .eq('species', hunt.species)
              .eq('deadline', hunt.deadline)
              .eq('notify_days_before', pref.notify_days_before)
              .single()

            // Only add reminder if it hasn't been sent before
            if (!existingReminder) {
              if (!remindersByState[hunt.stateDisplay]) {
                remindersByState[hunt.stateDisplay] = []
              }
              remindersByState[hunt.stateDisplay].push({
                species: hunt.species,
                deadline: hunt.deadline,
                daysUntil,
                notify_days_before: pref.notify_days_before
              })
            }
          }
        }
      }

      // Send email if there are reminders
      if (Object.keys(remindersByState).length > 0) {
        // State URLs for apply now links (using stateDisplay for lookup)
        const stateUrlsByDisplay: Record<string, string> = {
          'Wyoming': 'https://wgfapps.wyo.gov/LoginPortal/Login1.aspx?return=http%3A//wgfd.wyo.gov/login-callback',
          'Montana': 'https://fwp.mt.gov/buyandapply',
          'Nevada': 'https://nevada.licensing.app/',
          'Idaho': 'https://gooutdoorsidaho.com',
          'Arizona': 'https://draw.azgfd.com/Home/',
          'New Mexico': 'https://onlinesales.wildlife.state.nm.us/',
          'Colorado': 'https://www.cpwshop.com/home.page',
          'Utah': 'https://www.utahdraws.com/internetsales'
        }

        // Build email HTML with professional styling
        let remindersList = ''
        let applyButtons = ''

        for (const [state, reminders] of Object.entries(remindersByState)) {
          remindersList += `
            <div style="margin-bottom: 24px;">
              <h3 style="color: #2c3e50; margin: 0 0 12px 0; font-size: 18px; border-bottom: 2px solid #3498db; padding-bottom: 8px;">${state}</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
          `
          for (const reminder of reminders) {
            remindersList += `
              <li style="padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
                <strong style="color: #34495e;">${reminder.species}</strong><br>
                <span style="color: #7f8c8d;">Deadline: ${reminder.deadline}</span><br>
                <span style="color: #e74c3c; font-weight: 600;">${reminder.daysUntil} day${reminder.daysUntil === 1 ? '' : 's'} away</span>
              </li>
            `
          }
          remindersList += `</ul>`

          // Add apply button for this state
          const stateUrl = stateUrlsByDisplay[state] || 'https://drawtracker.com'
          remindersList += `
            <div style="margin-top: 12px;">
              <a href="${stateUrl}" style="display: inline-block; padding: 10px 24px; background-color: #27ae60; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Apply Now for ${state} →</a>
            </div>
          </div>`
        }

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: white; font-size: 28px;">Draw Tracker</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Upcoming Draw Deadlines</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; color: #34495e; font-size: 16px;">You have draw deadlines approaching:</p>

              ${remindersList}

              <p style="margin: 30px 0 0 0; color: #95a5a6; font-size: 12px; text-align: center;">
                <strong>Reminder:</strong> Always verify deadlines with official state agencies before applying.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #7f8c8d; font-size: 12px;">
                You're receiving this because you enabled email notifications in Draw Tracker.<br>
                Questions? Email <a href="mailto:jordan@drawtracker.com" style="color: #3498db; text-decoration: none;">jordan@drawtracker.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `

        // Send email using Resend API
        const resendApiKey = Deno.env.get('RESEND_API_KEY')
        if (!resendApiKey) {
          console.error('RESEND_API_KEY not set')
          continue
        }

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Draw Tracker <noreply@updates.drawtracker.com>',
            to: [user.email],
            subject: '🎯 Draw Tracker: Upcoming Deadlines',
            html: emailHtml,
          }),
        })

        if (emailResponse.ok) {
          emailsSent++

          // Record all sent reminders to prevent duplicates
          for (const [state, reminders] of Object.entries(remindersByState)) {
            for (const reminder of reminders) {
              await supabase
                .from('sent_reminders')
                .insert({
                  user_id: profile.id,
                  state: state,
                  species: reminder.species,
                  deadline: reminder.deadline,
                  notify_days_before: reminder.notify_days_before
                })
            }
          }
        } else {
          const error = await emailResponse.text()
          console.error('Failed to send email:', error)
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, emailsSent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
