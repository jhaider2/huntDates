-- Create table for Utah draw odds data
-- Stores historical draw statistics for each hunt unit/species combination

CREATE TABLE utah_draw_odds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER NOT NULL,
  species VARCHAR(50) NOT NULL,
  unit_number VARCHAR(20) NOT NULL,
  hunt_code VARCHAR(50),
  hunt_description TEXT,
  bonus_points INTEGER NOT NULL,
  total_applicants INTEGER NOT NULL DEFAULT 0,
  successful_applicants INTEGER NOT NULL DEFAULT 0,
  total_permits INTEGER NOT NULL DEFAULT 0,
  success_ratio VARCHAR(20), -- Stored as "1 in X" format
  success_percentage DECIMAL(5,2), -- Calculated percentage for easier querying
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(year, species, unit_number, hunt_code, bonus_points)
);

-- Create indexes for fast querying
CREATE INDEX idx_utah_odds_species ON utah_draw_odds(species);
CREATE INDEX idx_utah_odds_unit ON utah_draw_odds(unit_number);
CREATE INDEX idx_utah_odds_year ON utah_draw_odds(year);
CREATE INDEX idx_utah_odds_points ON utah_draw_odds(bonus_points);
CREATE INDEX idx_utah_odds_species_unit ON utah_draw_odds(species, unit_number);

-- Enable RLS
ALTER TABLE utah_draw_odds ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read odds data (no need to be logged in)
CREATE POLICY "Anyone can view odds data" ON utah_draw_odds
  FOR SELECT USING (true);

-- Only service role can insert/update
CREATE POLICY "Only service role can modify odds data" ON utah_draw_odds
  FOR ALL USING (auth.role() = 'service_role');

COMMENT ON TABLE utah_draw_odds IS 'Utah big game draw odds by unit, species, and bonus points';
COMMENT ON COLUMN utah_draw_odds.success_ratio IS 'Odds in "1 in X" format as shown in official data';
COMMENT ON COLUMN utah_draw_odds.success_percentage IS 'Success rate as percentage (0-100) for easier calculations';
