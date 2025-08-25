import { projects } from '@/lib/projects';
import Link from 'next/link';

export default function ProjectOgPreviewsPage() {
    return (
        <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'monospace' }}>
                Project OG Image Previews
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {projects.map((project, index) => {
                    const projectNumber = String(index + 1).padStart(2, '0');
                    const ogUrl = `/og-preview?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.description)}&path=/projects/${project.slug}&projectNumber=${projectNumber}&longDescription=${encodeURIComponent(project.longDescription.slice(0, 200))}`;
                    
                    return (
                        <div key={project.slug} style={{ borderBottom: '1px solid #333', paddingBottom: '40px' }}>
                            <h2 style={{ fontSize: '18px', marginBottom: '10px', fontFamily: 'monospace' }}>
                                {projectNumber}. {project.title}
                            </h2>
                            <Link 
                                href={ogUrl}
                                target="_blank"
                                style={{ 
                                    color: '#3b82f6', 
                                    textDecoration: 'underline',
                                    fontSize: '12px',
                                    fontFamily: 'monospace',
                                    display: 'block',
                                    marginBottom: '20px'
                                }}
                            >
                                View OG Preview →
                            </Link>
                            <iframe
                                src={ogUrl}
                                style={{
                                    width: '1200px',
                                    height: '630px',
                                    border: '2px solid #333',
                                    borderRadius: '8px',
                                    transform: 'scale(0.5)',
                                    transformOrigin: 'top left',
                                    marginBottom: '-315px'
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}