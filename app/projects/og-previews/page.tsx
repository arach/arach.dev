'use client';

import { projects } from '@/lib/projects';
import Link from 'next/link';

export default function AllProjectOgPreviewsPage() {
  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '1400px', 
      margin: '0 auto',
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
    }}>
      <h1 style={{ 
        fontSize: '24px', 
        marginBottom: '30px', 
        fontFamily: 'monospace',
        color: '#e5e5e5',
      }}>
        All Project OG Images
      </h1>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(600px, 1fr))',
        gap: '40px',
      }}>
        {projects.map((project, index) => {
          const projectNumber = String(index + 1).padStart(2, '0');
          
          return (
            <div key={project.slug}>
              <h2 style={{ 
                fontSize: '14px', 
                marginBottom: '10px', 
                fontFamily: 'monospace',
                color: '#999',
              }}>
                {projectNumber}. {project.title}
              </h2>
              
              <Link href={`/projects/${project.slug}/og-preview`}>
                <div style={{ 
                  border: '2px solid #333',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  position: 'relative',
                  backgroundColor: '#111',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#555';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#333';
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={`/projects/${project.slug}/og.png`}
                    alt={`OG image for ${project.title}`}
                    width={600}
                    height={315}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                </div>
              </Link>
              
              <div style={{ 
                marginTop: '10px',
                fontSize: '11px',
                color: '#666',
                fontFamily: 'monospace',
              }}>
                <code>/projects/{project.slug}/og.png</code>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}