import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAgentBySlug, getAllAgents } from '@/lib/agents';
import { remark } from 'remark';
import html from 'remark-html';
import '../agents.css';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  
  if (!agent) {
    return {
      title: 'Agent Not Found',
    };
  }

  return {
    title: `${agent.name} - Agent Registry`,
    description: agent.description,
  };
}

export async function generateStaticParams() {
  const agents = await getAllAgents();
  return agents.map((agent) => ({
    slug: agent.id,
  }));
}

export default async function AgentPage({ params }: Props) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  
  if (!agent) {
    notFound();
  }

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(agent.content);
  
  const htmlContent = processedContent.toString();

  return (
    <div className="agents-registry">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link 
            href="/agents" 
            className="nav-link text-sm transition-colors font-mono hover:text-[var(--theme-accent-color)]"
          >
            ← Back to Agent Registry
          </Link>
        </nav>
        
        <article className="overview-card rounded-lg p-8">
          <div 
            className="prose prose-sm max-w-none
                     prose-headings:font-medium
                     prose-p:leading-relaxed
                     prose-strong:font-medium
                     prose-code:font-mono prose-code:text-sm
                     prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                     prose-pre:font-mono prose-pre:border prose-pre:rounded-lg prose-pre:p-4
                     prose-a:no-underline hover:prose-a:underline
                     prose-h1:text-2xl prose-h1:mb-6 prose-h1:mt-0
                     prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:pb-2
                     prose-h3:text-lg prose-h3:mb-3 prose-h3:mt-6"
            style={{
              '--tw-prose-headings': 'var(--theme-heading-color)',
              '--tw-prose-body': 'var(--theme-text-color)',
              '--tw-prose-bold': 'var(--theme-text-color)',
              '--tw-prose-links': 'var(--theme-accent-color)',
              '--tw-prose-code': 'var(--theme-accent-color)',
              '--tw-prose-pre-bg': 'var(--theme-bg-color)',
              '--tw-prose-pre-border': 'var(--theme-border-color)'
            } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>
    </div>
  );
}