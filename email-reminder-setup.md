# Email Reminder System Setup

This document explains how to set up automated email reminders for draw deadlines.

## Overview

The email reminder system will:
1. Run daily via Supabase Edge Function
2. Check for upcoming deadlines based on user preferences
3. Send email notifications to users X days before their selected draws

## "All Species" Feature

When users select "All Species" for a state:
- Only ONE email is sent for that state (not separate emails per species)
- The email includes ALL species deadlines for that state
- Example: User selects "Wyoming - All Species" → receives one email listing Elk, Deer, Moose, Antelope, Bighorn Sheep deadlines for Wyoming
- Database stores species value as "ALL"

## Step 1: Enable Supabase Edge Functions

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
supabase link --project-ref awwxgisrefxhhihdhbha
```

## Step 2: Create the Edge Function

The edge function code is in `supabase/functions/send-draw-reminders/index.ts`

Deploy it with:
```bash
supabase functions deploy send-draw-reminders
```

## Step 3: Set up Cron Job (Scheduled Function)

In your Supabase dashboard:

1. Go to **Database** → **Extensions**
2. Enable **pg_cron** extension

3. Run this SQL to schedule daily emails at 9 AM UTC:

```sql
SELECT cron.schedule(
  'send-daily-draw-reminders',
  '0 9 * * *', -- 9 AM UTC every day
  $$
  SELECT
    net.http_post(
      url:='https://awwxgisrefxhhihdhbha.supabase.co/functions/v1/send-draw-reminders',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
      body:='{}'::jsonb
    ) AS request_id;
  $$
);
```

## Step 4: Configure Email Templates

1. Go to **Authentication** → **Email Templates** in Supabase dashboard
2. You can customize the email templates there

## Alternative: Simple Email Approach (No Edge Functions)

If you want a simpler solution without serverless functions:

### Option A: Client-Side Checking
- Check deadlines when user logs in
- Show banner notification for upcoming draws
- Simpler but less reliable

### Option B: Third-Party Service
- Use services like:
  - **SendGrid** (99/day free emails)
  - **Mailgun** (5,000/month free)
  - **Resend** (3,000/month free, developer-friendly)

### Option C: Supabase Email Auth Hook
- Use Supabase's built-in email system
- Trigger custom emails via database triggers
- Limited customization but easier setup

## Recommended Approach for Now

Start with **Option A (Client-Side)** and add a notification banner:
- When users visit the site, check their preferences
- Show upcoming deadlines prominently
- Add "Email me a reminder" button

Later, upgrade to Edge Functions when you have more users.

## Cost Estimate

- **Supabase Edge Functions**: Free tier (500K invocations/month)
- **SendGrid/Mailgun**: Free tiers cover most small apps
- **Total**: $0/month for small to medium usage
