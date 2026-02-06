-- Sent Reminders Table
-- Tracks which reminders have been sent to prevent duplicates
-- Allows resending if user changes cadence

CREATE TABLE sent_reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  state VARCHAR(50) NOT NULL,
  species VARCHAR(100) NOT NULL,
  deadline VARCHAR(100) NOT NULL,
  notify_days_before INTEGER NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  -- Unique constraint ensures same reminder at same cadence isn't sent twice
  UNIQUE(user_id, state, species, deadline, notify_days_before)
);

-- Enable Row Level Security
ALTER TABLE sent_reminders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own sent reminders
CREATE POLICY "Users can view own sent reminders" ON sent_reminders
  FOR SELECT USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_sent_reminders_lookup ON sent_reminders(user_id, state, species, deadline, notify_days_before);
