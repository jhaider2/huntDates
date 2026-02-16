-- Delete a user by email address
-- WARNING: This will delete the user and all their data (preferences, profile, etc.)

-- Replace 'user@example.com' with the actual email address you want to delete

-- First, get the user ID
DO $$
DECLARE
  user_id_to_delete UUID;
BEGIN
  -- Get the user ID from auth.users
  SELECT id INTO user_id_to_delete
  FROM auth.users
  WHERE email = 'test@example.com'; -- CHANGE THIS EMAIL

  IF user_id_to_delete IS NOT NULL THEN
    -- Delete from user_preferences (due to foreign key constraint)
    DELETE FROM user_preferences WHERE user_id = user_id_to_delete;

    -- Delete from sent_reminders (due to foreign key constraint)
    DELETE FROM sent_reminders WHERE user_id = user_id_to_delete;

    -- Delete from user_profiles (due to foreign key constraint)
    DELETE FROM user_profiles WHERE id = user_id_to_delete;

    -- Delete from auth.users (this is the main deletion)
    DELETE FROM auth.users WHERE id = user_id_to_delete;

    RAISE NOTICE 'User deleted successfully';
  ELSE
    RAISE NOTICE 'User not found';
  END IF;
END $$;
