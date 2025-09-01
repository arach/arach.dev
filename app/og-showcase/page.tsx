import Link from 'next/link';

export default function OgShowcasePage() {
  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '1400px', 
      margin: '0 auto',
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      color: '#e5e5e5',
      fontFamily: 'monospace',
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '40px' }}>
        OG Image Showcase
      </h1>
      
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#60a5fa' }}>
          Main Site OG (Terminal Style)
        </h2>
        <p style={{ fontSize: '12px', marginBottom: '20px', color: '#999' }}>
          Used for the homepage and general pages. Features ASCII art banner in a terminal window.
        </p>
        <div style={{ 
          border: '2px solid #333',
          borderRadius: '8px',
          overflow: 'hidden',
          width: '1200px',
          marginBottom: '10px',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/api/og"
            alt="Main site OG image"
            width={1200}
            height={630}
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </div>
        <code style={{ fontSize: '11px', color: '#666' }}>/api/og</code>
      </section>

      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#60a5fa' }}>
          Project OG (Large Number Style)
        </h2>
        <p style={{ fontSize: '12px', marginBottom: '20px', color: '#999' }}>
          Used for individual project pages. Features large project numbers and clean typography.
        </p>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
        }}>
          <div>
            <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>01. Scout</h3>
            <div style={{ 
              border: '2px solid #333',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
                src="/projects/scout/og.png"
                alt="Scout project OG"
                width={600}
                height={315}
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </div>
            <code style={{ fontSize: '10px', color: '#666', display: 'block', marginTop: '5px' }}>
              /projects/scout/og.png
            </code>
          </div>
          
          <div>
            <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>02. Blink</h3>
            <div style={{ 
              border: '2px solid #333',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
                src="/projects/blink/og.png"
                alt="Blink project OG"
                width={600}
                height={315}
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </div>
            <code style={{ fontSize: '10px', color: '#666', display: 'block', marginTop: '5px' }}>
              /projects/blink/og.png
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#60a5fa' }}>
          Preview Links
        </h2>
        <ul style={{ fontSize: '14px', lineHeight: '2' }}>
          <li>
            <a href="/og-preview" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
              Main OG Preview (with params) →
            </a>
          </li>
          <li>
            <Link href="/projects/og-previews" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
              All Project OG Images →
            </Link>
          </li>
          <li>
            <Link href="/projects/scout/og-preview" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
              Individual Project Preview (Scout) →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}