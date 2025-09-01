import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/projects';
import Image from 'next/image';

export default async function ProjectOgPreviewPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    notFound();
  }

  // Get project index for the project number
  const projectIndex = projects.findIndex(p => p.slug === resolvedParams.slug);
  const projectNumber = String(projectIndex + 1).padStart(2, '0');

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '1400px', 
      margin: '0 auto',
      fontFamily: 'monospace',
    }}>
      <h1 style={{ 
        fontSize: '24px', 
        marginBottom: '10px',
        color: '#e5e5e5',
      }}>
        OG Image Preview
      </h1>
      
      <h2 style={{ 
        fontSize: '18px', 
        marginBottom: '20px',
        color: '#999',
      }}>
        {projectNumber}. {project.title}
      </h2>

      <div style={{ 
        border: '2px solid #333',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '1200px',
        height: '630px',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={`/projects/${resolvedParams.slug}/og.png`}
          alt={`OG image for ${project.title}`}
          width={1200}
          height={630}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      <div style={{ 
        marginTop: '20px',
        fontSize: '14px',
        color: '#666',
      }}>
        <p>Direct image URL: <code>/projects/{resolvedParams.slug}/og.png</code></p>
        <p style={{ marginTop: '10px' }}>
          This image will be used when sharing this project on social media.
        </p>
      </div>
    </div>
  );
}