import { type NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const width = Number(searchParams.get("width"));
  const height = Number(searchParams.get("height"));

  if (![width, height].every(value => Number.isInteger(value) && value > 0 && value <= 16384)) {
    return NextResponse.json(
      { error: "Width and height must be integers between 1 and 16384" },
      { status: 400 }
    );
  }

  try {
    if (!sql) {
      console.log("[Paths API] No database connection, returning empty");
      return NextResponse.json({ paths: [], cached: false });
    }

    console.log(`[Paths API] Fetching paths for viewport ${width}x${height}`);

    // Find paths that cover the current viewport
    // We want paths where the bounding box is at least as large as our viewport
    // But also ensure we get a good distribution across the screen
    const halfWidth = Math.floor(width / 2);
    const halfHeight = Math.floor(height / 2);
    
    let result = await sql`
      WITH path_coverage AS (
        SELECT 
          path_key, from_hotspot, to_hotspot, variation, points, distance,
          max_x, max_y, min_x, min_y,
          -- Calculate which quadrant the path starts from
          CASE 
            WHEN (points->0->>'x')::int < ${halfWidth} AND (points->0->>'y')::int < ${halfHeight} THEN 'top-left'
            WHEN (points->0->>'x')::int >= ${halfWidth} AND (points->0->>'y')::int < ${halfHeight} THEN 'top-right'
            WHEN (points->0->>'x')::int < ${halfWidth} AND (points->0->>'y')::int >= ${halfHeight} THEN 'bottom-left'
            ELSE 'bottom-right'
          END as quadrant
        FROM background_paths
        WHERE max_x >= ${width - 100} AND max_y >= ${height - 100}
      )
      SELECT path_key, from_hotspot, to_hotspot, variation, points, distance,
             max_x, max_y, min_x, min_y
      FROM (
        -- Get up to 125 paths from each quadrant to ensure distribution
        (SELECT * FROM path_coverage WHERE quadrant = 'top-left' LIMIT 125)
        UNION ALL
        (SELECT * FROM path_coverage WHERE quadrant = 'top-right' LIMIT 125)
        UNION ALL
        (SELECT * FROM path_coverage WHERE quadrant = 'bottom-left' LIMIT 125)
        UNION ALL
        (SELECT * FROM path_coverage WHERE quadrant = 'bottom-right' LIMIT 125)
      ) distributed_paths
      ORDER BY from_hotspot, to_hotspot, variation
      LIMIT 500
    `;

    if (result.length === 0) {
      console.log(`[Paths API] No cached paths that cover ${width}x${height}`);
      
      // Fallback: get any available paths with distribution
      result = await sql`
        WITH all_paths AS (
          SELECT 
            path_key, from_hotspot, to_hotspot, variation, points, distance,
            max_x, max_y, min_x, min_y,
            -- Group by starting position for distribution
            NTILE(4) OVER (ORDER BY (points->0->>'x')::int, (points->0->>'y')::int) as position_group
          FROM background_paths
        )
        SELECT path_key, from_hotspot, to_hotspot, variation, points, distance,
               max_x, max_y, min_x, min_y
        FROM (
          -- Get up to 125 paths from each position group
          (SELECT * FROM all_paths WHERE position_group = 1 LIMIT 125)
          UNION ALL
          (SELECT * FROM all_paths WHERE position_group = 2 LIMIT 125)
          UNION ALL
          (SELECT * FROM all_paths WHERE position_group = 3 LIMIT 125)
          UNION ALL
          (SELECT * FROM all_paths WHERE position_group = 4 LIMIT 125)
        ) distributed
        ORDER BY from_hotspot, to_hotspot, variation
        LIMIT 500
      `;
      
      if (result.length > 0) {
        const bounds = result[0];
        console.log(`[Paths API] Using largest cached paths (${bounds.max_x}x${bounds.max_y}) for viewport ${width}x${height}`);
      }
    } else {
      console.log(`[Paths API] Found ${result.length} cached paths covering viewport`);
    }

    // Transform database records to the format expected by the frontend
    const paths = result.map((record: any) => ({
      id: record.path_key,
      from: record.from_hotspot,
      to: record.to_hotspot,
      variation: record.variation,
      points: record.points,
      distance: record.distance,
    }));

    return NextResponse.json({
      paths,
      cached: true,
      viewport: { width, height },
      count: paths.length,
    });
  } catch (error) {
    console.error("[Paths API] Error fetching paths:", error);
    return NextResponse.json(
      { error: "Failed to fetch paths", cached: false },
      { status: 500 }
    );
  }
}
