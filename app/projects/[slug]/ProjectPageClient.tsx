import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { ProjectPreviewFrame } from '@/components/ProjectPreview';
import type { Project } from '@/lib/projects';

interface ProjectPageClientProps {
  project: Project;
  projectNumber: string;
}

const STATUS_LABEL: Record<Project['status'], string> = {
  active: 'Active',
  maintained: 'Maintained',
  archived: 'Archived',
};

const rowBorder: React.CSSProperties = { borderColor: 'var(--theme-border-color)' };

function SectionHead({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-head">
      <h2 className="fig" style={{ color: 'var(--theme-text-color)' }}>
        ( {index} ) {children}
      </h2>
    </div>
  );
}

export default function ProjectPageClient({ project, projectNumber }: ProjectPageClientProps) {
  const liveUrl = project.links.website || project.links.demo;
  const facts: { label: string; value: React.ReactNode }[] = [
    { label: 'Status', value: STATUS_LABEL[project.status] },
    ...(liveUrl
      ? [{ label: 'Live', value: <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="link-quiet">{liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗</a> }]
      : []),
    ...(project.links.github
      ? [{ label: 'Source', value: <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="link-quiet">{project.links.github.replace(/^https?:\/\/(www\.)?/, '')} ↗</a> }]
      : []),
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
      <header className="relative pb-12 pt-10 sm:pb-14">
        <div aria-hidden className="bp-grid pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2" />
        <Link href="/" className="fig link-quiet inline-flex items-center gap-2">
          <ArrowLeft className="h-3.5 w-3.5" />
          All work
        </Link>

        <div className="fig mt-10 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="tabular-nums" style={{ color: 'var(--theme-faint-color)' }}>{projectNumber}</span>
          {project.tags.map((tag) => (
            <span key={tag} className="contents">
              <span style={{ color: 'var(--theme-faint-color)' }}>/</span>
              <span>{tag}</span>
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          {project.logo ? (
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center border"
              style={{ borderColor: 'var(--theme-border-color)', background: 'var(--theme-card-bg)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.logo} alt="" className="h-[70%] w-[70%] object-contain" />
            </div>
          ) : null}
          <h1 className="text-[40px] font-bold leading-[1.02] tracking-[-0.035em] sm:text-[56px]">
            {project.title}
          </h1>
        </div>

        <p className="mt-5 max-w-[56ch] text-[18px] font-normal leading-[1.6]" style={{ color: 'var(--theme-muted-color)' }}>
          {project.description}
        </p>
      </header>

      <ProjectPreviewFrame project={project} label={`Fig. ${projectNumber}`} priority className="mb-16" />

      <div className="grid gap-x-12 gap-y-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <div className="min-w-0">
          <section className="mb-16">
            <SectionHead index="01">Overview</SectionHead>
            <p className="max-w-[62ch] text-[17px] font-normal leading-[1.7]">{project.longDescription}</p>
          </section>

          {project.features && project.features.length > 0 ? (
            <section>
              <SectionHead index="02">Features</SectionHead>
              <ol className="border-t" style={rowBorder}>
                {project.features.map((feature, i) => (
                  <li key={feature} className="flex gap-4 border-b py-3 text-[15px] font-normal leading-[1.6]" style={rowBorder}>
                    <span className="fig shrink-0 pt-0.5 tabular-nums" style={{ color: 'var(--theme-faint-color)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>

        <aside className="min-w-0">
          <SectionHead index="—">Details</SectionHead>
          <dl className="border-t" style={rowBorder}>
            {facts.map(({ label, value }) => (
              <div key={label} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-b py-3" style={rowBorder}>
                <dt className="fig pt-0.5">{label}</dt>
                <dd className="min-w-0 truncate font-mono text-[13px]">{value}</dd>
              </div>
            ))}
            {project.tech && project.tech.length > 0 ? (
              <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-b py-3" style={rowBorder}>
                <dt className="fig pt-0.5">Built with</dt>
                <dd className="font-mono text-[13px] leading-[1.7]">
                  {project.tech.map((tech, i) => (
                    <span key={tech}>
                      {i > 0 ? <span style={{ color: 'var(--theme-faint-color)' }}>{' / '}</span> : null}
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </aside>
      </div>
    </div>
  );
}
