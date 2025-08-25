import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { OgComponent } from '../../../components/og/OgComponent';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get custom parameters from query params or use defaults
    const title = searchParams.get('title') || '[ARACH.DEV]';
    const subtitle = searchParams.get('subtitle') || 'my dev projects and notes';
    const path = searchParams.get('path') || '/';
    const mode = (searchParams.get('mode') as 'dark' | 'light') || 'dark';
    const format = searchParams.get('format') || 'standard'; // 'standard' (1200x630) or 'square' (1200x1200)
    const projectNumber = searchParams.get('projectNumber') || '';
    const longDescription = searchParams.get('longDescription') || '';
    
    const isSquare = format === 'square';
    const dimensions = {
      width: 1200,
      height: isSquare ? 1200 : 630,
    };
    
    return new ImageResponse(
        (
            <OgComponent
                title={title}
                subtitle={subtitle}
                path={path}
                mode={mode}
                format={format as 'standard' | 'square'}
                projectNumber={projectNumber}
                longDescription={longDescription}
            />
        ),
        dimensions
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}