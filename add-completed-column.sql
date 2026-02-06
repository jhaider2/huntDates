-- Add completed column to user_preferences table
-- Allows users to track which applications they have completed

ALTER TABLE user_preferences
ADD COLUMN completed BOOLEAN DEFAULT false;
