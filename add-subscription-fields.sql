-- Add subscription fields to user_profiles table
-- Tracks whether users have paid for email reminders

ALTER TABLE user_profiles
ADD COLUMN subscription_status VARCHAR(20) DEFAULT 'free',
ADD COLUMN stripe_customer_id VARCHAR(255),
ADD COLUMN stripe_subscription_id VARCHAR(255),
ADD COLUMN subscription_end_date TIMESTAMP WITH TIME ZONE;

-- Add index for faster lookups
CREATE INDEX idx_subscription_status ON user_profiles(subscription_status);

-- subscription_status values:
-- 'free' - No subscription
-- 'active' - Active paid subscription
-- 'canceled' - Subscription canceled but still valid until end_date
-- 'expired' - Subscription expired
