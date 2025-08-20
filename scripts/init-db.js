// Run database migrations
import { neon } from "@neondatabase/serverless";
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const sql = neon(process.env.DATABASE_URL);

async function runMigrations() {
  try {
    console.log('Running database migrations...');
    
    // Create tables and indexes
    await sql`
      CREATE TABLE IF NOT EXISTS background_paths (
        id SERIAL PRIMARY KEY,
        path_key VARCHAR(255) UNIQUE NOT NULL,
        from_hotspot VARCHAR(100) NOT NULL,
        to_hotspot VARCHAR(100) NOT NULL,
        variation INT NOT NULL DEFAULT 0,
        points JSONB NOT NULL,
        distance FLOAT NOT NULL,
        viewport_width INT NOT NULL,
        viewport_height INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_background_paths_viewport 
      ON background_paths(viewport_width, viewport_height)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_background_paths_from 
      ON background_paths(from_hotspot)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_background_paths_to 
      ON background_paths(to_hotspot)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_background_paths_distance 
      ON background_paths(distance)
    `;
    
    // Add bounding box columns
    await sql`
      ALTER TABLE background_paths 
      ADD COLUMN IF NOT EXISTS max_x INT,
      ADD COLUMN IF NOT EXISTS max_y INT,
      ADD COLUMN IF NOT EXISTS min_x INT DEFAULT 0,
      ADD COLUMN IF NOT EXISTS min_y INT DEFAULT 0
    `;
    
    // Update existing records (if any)
    await sql`
      UPDATE background_paths 
      SET 
        max_x = viewport_width,
        max_y = viewport_height,
        min_x = 0,
        min_y = 0
      WHERE max_x IS NULL
    `;
    
    // Create bounding box index
    await sql`
      CREATE INDEX IF NOT EXISTS idx_background_paths_bounds 
      ON background_paths(max_x, max_y)
    `;
    
    console.log('✅ Migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();