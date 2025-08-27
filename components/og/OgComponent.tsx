import React from 'react';

type OgComponentProps = {
    title: string;
    subtitle: string;
    path: string;
    mode?: 'dark' | 'light';
    format?: 'standard' | 'square';
    projectNumber?: string;
    longDescription?: string;
    metadata?: {
        tags?: string[];
        stats?: { label: string; value: string | number }[];
        date?: string;
        author?: string;
    };
};

export function OgComponent({ 
    title, 
    subtitle, 
    path, 
    mode = 'dark', 
    format = 'standard', 
    projectNumber,
    longDescription,
    metadata 
}: OgComponentProps) {
    const isDark = mode === 'dark';
    const isSquare = format === 'square';
    const isProjectPage = path.startsWith('/projects/') && projectNumber;
    
    // Determine the base URL for images
    const getImageUrl = (imageName: string) => {
        if (process.env.NODE_ENV === 'production' || process.env.VERCEL_URL) {
            return `https://arach.dev/assets/${imageName}`;
        }
        const port = process.env.PORT || '3000';
        return `http://localhost:${port}/assets/${imageName}`;
    };
    
    // Theme colors based on midnight/light themes
    const theme = {
        bg: isDark ? '#0a0a0a' : '#fafafa',
        bgGradient: isDark 
            ? 'linear-gradient(135deg, #0a0a0a 0%, #171717 100%)' 
            : 'linear-gradient(135deg, #fafafa 0%, #f3f4f6 100%)',
        terminalBg: isDark ? 'rgba(17, 17, 17, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        terminalHeader: isDark ? 'rgba(30, 30, 30, 0.95)' : 'rgba(243, 244, 246, 0.95)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        pathColor: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
        accentColor: isDark ? '#60a5fa' : '#3b82f6',
        textColor: isDark ? '#e5e5e5' : '#111827',
        mutedColor: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
        lightTextColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    };
    
    // Project page design
    if (isProjectPage) {
        return (
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
                  {title}
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
                  {subtitle}
                </div>

                {/* Long description preview */}
                {longDescription && (
                  <div
                    style={{
                      fontSize: '20px',
                      color: theme.mutedColor,
                      fontFamily: 'monospace',
                      lineHeight: 1.5,
                      marginTop: '20px',
                      opacity: 0.8,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {longDescription}
                  </div>
                )}

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
                    {path}
                  </div>
                </div>
              </div>
            </div>
        );
    }
    
    // Default design for non-project pages
    return (
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
              height: isSquare ? '70%' : '85%',
              maxWidth: isSquare ? '800px' : '1000px',
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
                <span>{`~/dev/arach.dev${path !== '/' ? path : ''}`}</span>
              </div>
            </div>
            
            {/* Terminal content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: isSquare ? '60px 40px' : '30px 40px',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: isSquare ? '40px' : '25px',
              }}
            >
              {/* ASCII Art Image */}
              <img
                src={getImageUrl(isDark ? 'arach-ascii.png' : 'arach-ascii-light.png')}
                alt="ARACH.DEV ASCII Art"
                width={600}
                height={150}
                style={{
                  width: isSquare ? '460px' : '600px',
                  height: isSquare ? '103px' : '150px',
                  objectFit: 'contain',
                }}
              />

              {/* Prominent Title */}
              {title && title !== '[ARACH.DEV]' && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '-10px',
                    marginBottom: '10px',
                  }}
                >
                  <div
                    style={{
                      fontSize: isSquare ? '48px' : '42px',
                      fontWeight: 'bold',
                      color: theme.textColor,
                      fontFamily: 'monospace',
                      textAlign: 'center',
                      letterSpacing: '1px',
                    }}
                  >
                    {title}
                  </div>
                </div>
              )}

              {/* Subtitle */}
              <div
                style={{
                  fontSize: '20px',
                  color: theme.mutedColor,
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  textAlign: 'center',
                  maxWidth: '600px',
                }}
              >
                {subtitle}
              </div>

              {/* Metadata Section */}
              {metadata && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    alignItems: 'center',
                    marginTop: '10px',
                  }}
                >
                  {/* Tags */}
                  {metadata.tags && metadata.tags.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                      }}
                    >
                      {metadata.tags.slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '4px 12px',
                            backgroundColor: isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                            color: theme.accentColor,
                            borderRadius: '16px',
                            fontSize: '14px',
                            fontFamily: 'monospace',
                            border: `1px solid ${isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  {metadata.stats && metadata.stats.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        gap: '30px',
                        alignItems: 'center',
                      }}
                    >
                      {metadata.stats.slice(0, 3).map((stat, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '24px',
                              fontWeight: 'bold',
                              color: theme.accentColor,
                              fontFamily: 'monospace',
                            }}
                          >
                            {stat.value}
                          </span>
                          <span
                            style={{
                              fontSize: '12px',
                              color: theme.mutedColor,
                              fontFamily: 'monospace',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                            }}
                          >
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
    );
}