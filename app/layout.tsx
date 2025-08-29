import { IBM_Plex_Mono } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from 'next'
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/lib/theme-context";
import Script from "next/script";
import FontLoader from "@/components/FontLoader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemePicker from "@/components/ThemePicker";
// Critical CSS will be loaded inline
const criticalCSS = `/* Critical CSS - Inline this for immediate render */

/* Theme variables defaults - MUST be defined first */
:root {
  --theme-bg-color: #ffffff;
  --theme-text-color: #111827;
  --theme-ascii-color: #000000;
  --theme-border-color: #e5e7eb;
  --theme-muted-text: #6b7280;
  --theme-header-bg: rgba(0, 0, 0, 1);
  --theme-header-text: #ffffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  background: var(--theme-bg-color);
  color: var(--theme-text-color);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

/* Critical layout styles */
.max-w-4xl {
  max-width: 56rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

/* Hero ASCII immediate render */
.hero-ascii {
  font-size: 4px;
  font-family: Monaco, Consolas, "Courier New", monospace;
  margin: 0 0 0.5rem 0;
  line-height: 1;
  white-space: pre;
  overflow: hidden;
  text-align: center;
  opacity: 1;
  color: var(--theme-ascii-color, #000);
}

@media (min-width: 640px) {
  .hero-ascii { 
    font-size: 8px;
    text-align: left;
  }
}

/* Prevent layout shift */
main {
  flex-grow: 1;
  padding-top: 0;
}

header {
  background: var(--theme-header-bg);
  color: var(--theme-header-text);
}`;

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ["latin"], 
  weight: ['400'], // Only load essential weight
  variable: "--font-ibm-plex-mono",
  display: 'optional', // Don't block render for this font
  preload: false, // Don't preload to reduce initial load
});

export const metadata: Metadata = {
  title: "arach.dev",
  description: "my dev projects and notes",
  metadataBase: new URL('https://arach.dev'),
  openGraph: {
    title: 'arach.dev',
    description: 'my dev projects and notes',
    url: 'https://arach.dev',
    siteName: 'arach.dev',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'arach.dev - my dev projects and notes',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'arach.dev',
    description: 'my dev projects and notes',
    images: ['/api/og'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${GeistMono.variable}`}>
      <head>
        {/* Inline critical CSS for immediate render */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body className={`${ibmPlexMono.variable} ${GeistMono.className} font-mono flex flex-col min-h-screen`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow pt-0">
            {children}
          </main>
          <Footer />
          <FontLoader />
          <ThemePicker />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}