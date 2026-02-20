-- Allow multiple reminders for the same state/species at different intervals
-- This enables users to set up reminders like "7 days before", "2 days before", "1 day before" for the same hunt

-- Drop the old constraint that only allowed one reminder per state/species
ALTER TABLE user_preferences
DROP CONSTRAINT IF EXISTS user_preferences_user_id_state_species_key;

-- Add new constraint that includes notify_days_before
-- This allows multiple reminders for same state/species, as long as the days are different
ALTER TABLE user_preferences
ADD CONSTRAINT user_preferences_unique_reminder
UNIQUE(user_id, state, species, notify_days_before);

-- Note: Users can now have multiple reminders like:
-- - Nevada, Elk, 30 days before
-- - Nevada, Elk, 7 days before
-- - Nevada, Elk, 1 day before
