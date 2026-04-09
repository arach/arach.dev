import type { Metadata } from "next";

import { IdeasPage } from "@/components/ideas/ideas-page";
import { getAllIdeas } from "@/lib/ideas";

export const metadata: Metadata = {
  title: "Ideas | arach.dev",
  description: "Writing on systems, tools, code structure, and product architecture.",
  openGraph: {
    title: "Ideas | arach.dev",
    description: "Writing on systems, tools, code structure, and product architecture.",
    url: "https://arach.dev/ideas",
    siteName: "arach.dev",
    images: [
      {
        url: "/api/og?title=IDEAS&subtitle=writing+on+systems%2C+tools%2C+and+product+shape&path=%2Fideas",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideas | arach.dev",
    description: "Writing on systems, tools, code structure, and product architecture.",
    images: ["/api/og?title=IDEAS&subtitle=writing+on+systems%2C+tools%2C+and+product+shape&path=%2Fideas"],
  },
};

export default function IdeasRoute() {
  const ideas = getAllIdeas();
  return <IdeasPage ideas={ideas} />;
}
