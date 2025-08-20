-- Update the background_paths table to use bounding box instead of viewport
-- Add new columns for bounding box
ALTER TABLE background_paths 
  ADD COLUMN IF NOT EXISTS max_x INT,
  ADD COLUMN IF NOT EXISTS max_y INT,
  ADD COLUMN IF NOT EXISTS min_x INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS min_y INT DEFAULT 0;

-- Update existing records to set bounding box from viewport (temporary migration)
UPDATE background_paths 
SET 
  max_x = viewport_width,
  max_y = viewport_height,
  min_x = 0,
  min_y = 0
WHERE max_x IS NULL;

-- Create new indexes for bounding box queries
CREATE INDEX IF NOT EXISTS idx_background_paths_bounds 
  ON background_paths(max_x, max_y);

-- We'll keep viewport columns for backwards compatibility but won't use them