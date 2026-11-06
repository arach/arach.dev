import type { Metadata } from "next";

import { IdeasPage } from "@/components/ideas/ideas-page";
import { getAllIdeas } from "@/lib/ideas";

export const metadata: Metadata = {
  title: "Notes | arach.dev",
  description: "Technical notes on systems, tools, and code structure.",
  alternates: { canonical: "/ideas" },
  openGraph: {
    title: "Notes | arach.dev",
    description: "Technical notes on systems, tools, and code structure.",
    url: "/ideas",
    siteName: "arach.dev",
    images: [
      {
        url: "/api/og?title=NOTES&subtitle=technical+notes+on+systems%2C+tools%2C+and+code+structure&path=%2Fideas",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes | arach.dev",
    description: "Technical notes on systems, tools, and code structure.",
    images: ["/api/og?title=NOTES&subtitle=technical+notes+on+systems%2C+tools%2C+and+code+structure&path=%2Fideas"],
  },
};

export default function IdeasRoute() {
  const ideas = getAllIdeas();
  return <IdeasPage ideas={ideas} />;
}
