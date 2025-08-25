import React from 'react';

type OgComponentProps = {
    title: string;
    subtitle: string;
    path: string;
    mode?: 'dark' | 'light';
    format?: 'standard' | 'square';
};

export function OgComponent({ title, subtitle, path, mode = 'dark', format = 'standard' }: OgComponentProps) {
    const isDark = mode === 'dark';
    const isSquare = format === 'square';
    
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
    };
    
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
                src={isDark ? "http://localhost:3002/assets/arach-ascii.png" : "http://localhost:3002/assets/arach-ascii-light.png"}
                alt="ARACH.DEV ASCII Art"
                width={580}
                height={148}
                style={{
                  width: isSquare ? '500px' : '580px',
                  height: isSquare ? '127px' : '148px',
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
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      fontSize: '14px',
                      color: theme.accentColor,
                      opacity: 0.7,
                    }}
                  >
                    <span>{'═══'}</span>
                    <span>{'◆'}</span>
                    <span>{'═══'}</span>
                  </div>
                </div>
              )}

              {/* Decorative line with subtitle */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  color: theme.accentColor,
                  opacity: 0.5,
                  fontSize: '20px',
                  fontFamily: 'monospace',
                }}
              >
                <span>{'//='}</span>
                <span>{'['}</span>
                <span style={{ color: theme.accentColor, fontSize: '24px' }}>{'==='}</span>
                <span>{'['}</span>
                <span style={{ color: theme.textColor, fontSize: '18px', letterSpacing: '2px' }}>{subtitle}</span>
                <span>{']'}</span>
                <span style={{ color: theme.accentColor, fontSize: '24px' }}>{'==='}</span>
                <span>{']'}</span>
                <span>{'=//'}</span>
              </div>

              {/* Simple status line */}
              <div
                style={{
                  display: 'flex',
                  gap: '30px',
                  fontSize: '16px',
                  color: theme.mutedColor,
                  fontFamily: 'monospace',
                }}
              >
                <span>{'<'} Full Stack {'>'}</span>
                <span>{'{'} TypeScript {'}'}</span>
                <span>{'['} React {']'}</span>
              </div>
            </div>
          </div>
        </div>
    );
}
