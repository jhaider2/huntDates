-- Add test preference for Nevada Elk with 18 days notice
-- This should trigger an email on Feb 20, 2026 since Nevada deadline is March 10, 2026 (18 days away)

-- First, get your user ID (replace with your actual email)
-- You can find this by running: SELECT id FROM auth.users WHERE email = 'your-email@example.com';

-- Replace 'YOUR_USER_ID_HERE' with your actual user ID from the query above
INSERT INTO user_preferences (user_id, state, species, notify_days_before, completed)
VALUES ('YOUR_USER_ID_HERE', 'nevada', 'Elk', 18, false)
ON CONFLICT (user_id, state, species)
DO UPDATE SET
  notify_days_before = 18,
  completed = false;

-- To find your user ID, run this first:
-- SELECT id, email FROM auth.users;
