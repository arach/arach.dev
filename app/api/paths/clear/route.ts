import { type NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export async function POST(request: NextRequest) {
  try {
    if (!sql) {
      return NextResponse.json(
        { error: "Database connection not available" },
        { status: 503 }
      );
    }

    // Get optional viewport from request to clear specific size
    const body = await request.json().catch(() => ({}));
    const { viewport } = body;

    if (viewport?.width && viewport?.height) {
      // Clear paths for specific viewport bounds
      console.log(`[Paths API] Clearing paths for bounds covering ${viewport.width}x${viewport.height}`);
      
      const result = await sql`
        DELETE FROM background_paths
        WHERE max_x >= ${viewport.width - 100} 
          AND max_x <= ${viewport.width + 100}
          AND max_y >= ${viewport.height - 100}
          AND max_y <= ${viewport.height + 100}
      `;
      
      console.log(`[Paths API] Cleared ${result.count} paths for viewport area`);
      
      return NextResponse.json({
        success: true,
        cleared: result.count,
        message: `Cleared paths for viewport ${viewport.width}x${viewport.height}`
      });
    } else {
      // Clear all paths
      console.log(`[Paths API] Clearing all cached paths`);
      
      const result = await sql`DELETE FROM background_paths`;
      
      console.log(`[Paths API] Cleared ${result.count} paths`);
      
      return NextResponse.json({
        success: true,
        cleared: result.count,
        message: "Cleared all cached paths"
      });
    }
  } catch (error) {
    console.error("[Paths API] Error clearing paths:", error);
    return NextResponse.json(
      { error: "Failed to clear paths" },
      { status: 500 }
    );
  }
}