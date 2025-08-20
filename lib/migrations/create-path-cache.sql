-- Create table for storing pre-calculated background paths
CREATE TABLE IF NOT EXISTS background_paths (
  id SERIAL PRIMARY KEY,
  path_key VARCHAR(255) UNIQUE NOT NULL, -- e.g., "h-6-6_to_h-12-12_v0"
  from_hotspot VARCHAR(100) NOT NULL,    -- e.g., "h-6-6"
  to_hotspot VARCHAR(100) NOT NULL,      -- e.g., "h-12-12"
  variation INT NOT NULL DEFAULT 0,       -- variation number (0-4)
  points JSONB NOT NULL,                  -- array of {x, y} coordinates
  distance FLOAT NOT NULL,                -- path distance for filtering
  viewport_width INT NOT NULL,            -- viewport width when generated
  viewport_height INT NOT NULL,           -- viewport height when generated
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_background_paths_viewport 
  ON background_paths(viewport_width, viewport_height);

CREATE INDEX IF NOT EXISTS idx_background_paths_from 
  ON background_paths(from_hotspot);

CREATE INDEX IF NOT EXISTS idx_background_paths_to 
  ON background_paths(to_hotspot);

CREATE INDEX IF NOT EXISTS idx_background_paths_distance 
  ON background_paths(distance);

-- Create a function to clean up old paths for different viewport sizes
CREATE OR REPLACE FUNCTION cleanup_old_viewport_paths()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM background_paths
  WHERE (viewport_width, viewport_height) NOT IN (
    SELECT DISTINCT viewport_width, viewport_height
    FROM background_paths
    ORDER BY created_at DESC
    LIMIT 5  -- Keep only the 5 most recent viewport sizes
  );
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;