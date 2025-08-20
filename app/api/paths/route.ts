import { type NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

interface PathRecord {
  id: number;
  path_key: string;
  from_hotspot: string;
  to_hotspot: string;
  variation: number;
  points: { x: number; y: number }[];
  distance: number;
  viewport_width: number;
  viewport_height: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const width = parseInt(searchParams.get("width") || "0");
  const height = parseInt(searchParams.get("height") || "0");

  if (!width || !height) {
    return NextResponse.json(
      { error: "Width and height are required" },
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
    let result = await sql`
      SELECT path_key, from_hotspot, to_hotspot, variation, points, distance,
             max_x, max_y, min_x, min_y
      FROM background_paths
      WHERE max_x >= ${width} AND max_y >= ${height}
      ORDER BY 
        -- Prefer paths that are closest to our viewport size (not too oversized)
        (max_x - ${width}) + (max_y - ${height}) ASC,
        from_hotspot, to_hotspot, variation
      LIMIT 500
    `;

    if (result.length === 0) {
      console.log(`[Paths API] No cached paths that cover ${width}x${height}`);
      
      // Fallback: get the largest available paths
      result = await sql`
        SELECT path_key, from_hotspot, to_hotspot, variation, points, distance,
               max_x, max_y, min_x, min_y
        FROM background_paths
        ORDER BY max_x DESC, max_y DESC
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

export async function POST(request: NextRequest) {
  try {
    if (!sql) {
      return NextResponse.json(
        { error: "Database connection not available" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { paths, viewport } = body;

    if (!paths || !viewport || !viewport.width || !viewport.height) {
      return NextResponse.json(
        { error: "Paths and viewport dimensions are required" },
        { status: 400 }
      );
    }

    console.log(`[Paths API] Storing ${paths.length} paths`);

    // Calculate the bounding box for all paths
    let globalMaxX = 0;
    let globalMaxY = 0;
    let globalMinX = Infinity;
    let globalMinY = Infinity;

    // First pass: calculate global bounds
    for (const path of paths) {
      for (const point of path.points) {
        globalMaxX = Math.max(globalMaxX, point.x);
        globalMaxY = Math.max(globalMaxY, point.y);
        globalMinX = Math.min(globalMinX, point.x);
        globalMinY = Math.min(globalMinY, point.y);
      }
    }

    console.log(`[Paths API] Bounding box: (${globalMinX},${globalMinY}) to (${globalMaxX},${globalMaxY})`);

    // Delete existing paths with smaller bounds
    await sql`
      DELETE FROM background_paths
      WHERE max_x <= ${globalMaxX} AND max_y <= ${globalMaxY}
    `;

    // Insert new paths with bounding box info
    let insertedCount = 0;
    for (const path of paths) {
      const pathKey = `${path.from}_to_${path.to}_v${path.variation || 0}_${globalMaxX}x${globalMaxY}`;
      
      // Calculate bounds for this specific path
      let pathMaxX = 0;
      let pathMaxY = 0;
      let pathMinX = Infinity;
      let pathMinY = Infinity;
      
      for (const point of path.points) {
        pathMaxX = Math.max(pathMaxX, point.x);
        pathMaxY = Math.max(pathMaxY, point.y);
        pathMinX = Math.min(pathMinX, point.x);
        pathMinY = Math.min(pathMinY, point.y);
      }
      
      try {
        await sql`
          INSERT INTO background_paths (
            path_key, from_hotspot, to_hotspot, variation, 
            points, distance, viewport_width, viewport_height,
            max_x, max_y, min_x, min_y
          ) VALUES (
            ${pathKey}, ${path.from}, ${path.to}, ${path.variation || 0},
            ${JSON.stringify(path.points)}, ${path.distance},
            ${viewport.width}, ${viewport.height},
            ${pathMaxX}, ${pathMaxY}, ${pathMinX}, ${pathMinY}
          )
          ON CONFLICT (path_key) 
          DO UPDATE SET 
            points = EXCLUDED.points,
            distance = EXCLUDED.distance,
            max_x = EXCLUDED.max_x,
            max_y = EXCLUDED.max_y,
            min_x = EXCLUDED.min_x,
            min_y = EXCLUDED.min_y,
            updated_at = NOW()
        `;
        insertedCount++;
      } catch (err) {
        console.error(`[Paths API] Error inserting path ${pathKey}:`, err);
      }
    }

    // Clean up old viewport sizes
    const cleanupResult = await sql`SELECT cleanup_old_viewport_paths() as deleted_count`;
    const deletedCount = cleanupResult[0]?.deleted_count || 0;

    console.log(`[Paths API] Stored ${insertedCount} paths, cleaned up ${deletedCount} old paths`);

    return NextResponse.json({
      success: true,
      stored: insertedCount,
      cleaned: deletedCount,
      viewport,
    });
  } catch (error) {
    console.error("[Paths API] Error storing paths:", error);
    return NextResponse.json(
      { error: "Failed to store paths" },
      { status: 500 }
    );
  }
}