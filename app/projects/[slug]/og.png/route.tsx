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

  // Determine the base URL for images
  const getImageUrl = (imageName: string) => {
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL_URL) {
      return `https://arach.dev/assets/${imageName}`;
    }
    const port = process.env.PORT || '3000';
    return `http://localhost:${port}/assets/${imageName}`;
  };

  // Theme colors matching default dark theme
  const theme = {
    bg: '#000000',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #0f0f0f 100%)',
    terminalBg: 'rgba(10, 10, 10, 0.95)',
    terminalHeader: 'rgba(20, 20, 20, 0.95)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    pathColor: 'rgba(255, 255, 255, 0.5)',
    textColor: '#e5e5e5',
    mutedColor: 'rgba(255, 255, 255, 0.6)',
    lightTextColor: 'rgba(255, 255, 255, 0.06)',
    accentColor: '#60a5fa',
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
        }}
      >
        {/* Terminal window */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            height: '85%',
            maxWidth: '1000px',
            backgroundColor: theme.terminalBg,
            borderRadius: '12px',
            border: `1px solid ${theme.borderColor}`,
            overflow: 'hidden',
          }}
        >
          {/* Terminal header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 10px',
              backgroundColor: theme.terminalHeader,
              borderBottom: `1px solid ${theme.borderColor}`,
            }}
          >
            {/* Traffic lights */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#ff5f56',
                }}
              />
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#ffbd2e',
                }}
              />
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#27c93f',
                }}
              />
            </div>
            {/* Path */}
            <div
              style={{
                display: 'flex',
                fontSize: '12px',
                color: theme.pathColor,
                fontFamily: 'monospace',
              }}
            >
              <span>{`~/dev/arach.dev/projects/${resolvedParams.slug}`}</span>
            </div>
          </div>
          
          {/* Terminal content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '30px 40px',
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '20px',
              position: 'relative',
            }}
          >
            {/* ASCII Art Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl('arach-ascii.png')}
              alt="ARACH.DEV ASCII Art"
              width={600}
              height={150}
              style={{
                width: '600px',
                height: '150px',
                objectFit: 'contain',
                marginBottom: '10px',
              }}
            />

            {/* Project content with large number */}
            <div
              style={{
                display: 'flex',
                width: '100%',
                position: 'relative',
                alignItems: 'flex-start',
                gap: '40px',
              }}
            >
              {/* Large project number - left side */}
              <div
                style={{
                  display: 'flex',
                  fontSize: '180px',
                  fontWeight: '200',
                  color: theme.lightTextColor,
                  fontFamily: 'monospace',
                  lineHeight: 1,
                  marginTop: '-30px',
                  flexShrink: 0,
                }}
              >
                <span>{projectNumber}</span>
              </div>

              {/* Project details - right side with no overlap */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  gap: '16px',
                  paddingTop: '0px',
                }}
              >
                {/* Project title */}
                <div
                  style={{
                    display: 'flex',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: theme.textColor,
                    fontFamily: 'monospace',
                    letterSpacing: '-0.5px',
                    lineHeight: 1,
                  }}
                >
                  <span>{project.title}</span>
                </div>

                {/* Project subtitle */}
                <div
                  style={{
                    display: 'flex',
                    fontSize: '20px',
                    color: theme.accentColor,
                    fontFamily: 'monospace',
                    lineHeight: 1.3,
                  }}
                >
                  <span>{project.description}</span>
                </div>

                {/* Long description preview */}
                <div
                  style={{
                    display: 'flex',
                    fontSize: '16px',
                    color: theme.mutedColor,
                    fontFamily: 'monospace',
                    lineHeight: 1.5,
                    marginTop: '8px',
                    opacity: 0.8,
                  }}
                >
                  <span>{project.longDescription.slice(0, 150)}...</span>
                </div>

                {/* Tech tags */}
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  {project.tech.slice(0, 4).map((tech) => (
                    <div
                      key={tech}
                      style={{
                        display: 'flex',
                        padding: '4px 12px',
                        backgroundColor: 'rgba(96, 165, 250, 0.1)',
                        color: theme.accentColor,
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        border: `1px solid rgba(96, 165, 250, 0.2)`,
                      }}
                    >
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
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