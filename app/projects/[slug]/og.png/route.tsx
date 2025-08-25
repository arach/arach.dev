import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/projects';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    notFound();
  }

  // Get project index for the project number
  const projectIndex = projects.findIndex(p => p.slug === resolvedParams.slug);
  const projectNumber = String(projectIndex + 1).padStart(2, '0');

  // Theme colors matching default theme
  const theme = {
    bg: '#0a0a0a',
    bgGradient: 'linear-gradient(135deg, #0a0a0a 0%, #171717 100%)',
    textColor: '#e5e5e5',
    mutedColor: 'rgba(255, 255, 255, 0.6)',
    lightTextColor: 'rgba(255, 255, 255, 0.08)',
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.bg,
          backgroundImage: theme.bgGradient,
          fontFamily: 'monospace',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* Large project number in background */}
        <div
          style={{
            position: 'absolute',
            left: '60px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '280px',
            fontWeight: '200',
            color: theme.lightTextColor,
            fontFamily: 'monospace',
            lineHeight: 1,
          }}
        >
          {projectNumber}
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '900px',
            position: 'relative',
            zIndex: 1,
            gap: '24px',
          }}
        >
          {/* Project title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: theme.textColor,
              fontFamily: 'monospace',
              letterSpacing: '-1px',
              lineHeight: 1,
            }}
          >
            {project.title}
          </div>

          {/* Project subtitle */}
          <div
            style={{
              fontSize: '28px',
              color: theme.mutedColor,
              fontFamily: 'monospace',
              lineHeight: 1.3,
            }}
          >
            {project.description}
          </div>

          {/* Long description preview */}
          <div
            style={{
              fontSize: '20px',
              color: theme.mutedColor,
              fontFamily: 'monospace',
              lineHeight: 1.5,
              marginTop: '20px',
              opacity: 0.8,
              display: 'flex',
            }}
          >
            {project.longDescription.slice(0, 200)}...
          </div>

          {/* Footer with branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 'auto',
              paddingTop: '40px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                color: theme.mutedColor,
                fontFamily: 'monospace',
                opacity: 0.6,
              }}
            >
              arach.dev
            </div>
            <div
              style={{
                fontSize: '14px',
                color: theme.mutedColor,
                fontFamily: 'monospace',
                opacity: 0.4,
              }}
            >
              /projects/{resolvedParams.slug}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}