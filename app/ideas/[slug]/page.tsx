import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { IdeaLayout } from "@/components/ideas/idea-layout";
import { ideaMdxComponents } from "@/components/ideas/mdx/mdx-components";
import { getAllIdeaSlugs, getIdeaBySlug } from "@/lib/ideas";

type IdeaPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllIdeaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: IdeaPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const idea = getIdeaBySlug(slug);
  if (!idea) {
    return {};
  }

  const ogUrl = `/api/og?title=${encodeURIComponent(idea.title)}&subtitle=${encodeURIComponent(idea.description)}&path=${encodeURIComponent(`/ideas/${slug}`)}`;

  return {
    title: `${idea.title} | arach.dev`,
    description: idea.description,
    openGraph: {
      title: `${idea.title} | arach.dev`,
      description: idea.description,
      url: `https://arach.dev/ideas/${slug}`,
      siteName: "arach.dev",
      images: [{ url: ogUrl, width: 1200, height: 630 }],
      locale: "en_US",
      type: "article",
      publishedTime: idea.date,
      tags: idea.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${idea.title} | arach.dev`,
      description: idea.description,
      images: [ogUrl],
    },
  };
}

export default async function IdeaPostPage({ params }: IdeaPostPageProps) {
  const { slug } = await params;
  const idea = getIdeaBySlug(slug);
  if (!idea || idea.draft) {
    notFound();
  }

  return (
    <IdeaLayout
      title={idea.title}
      description={idea.description}
      date={idea.date}
      tags={idea.tags}
      entryType={idea.entryType}
      status={idea.status}
    >
      <MDXRemote
        source={idea.content}
        components={ideaMdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </IdeaLayout>
  );
}
