import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from 'next'
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/lib/theme/site/provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { themesCSS, themeBootScript } from "@/lib/theme/site/themes";
import { ConsoleArt } from "@/components/ConsoleArt";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import Script from "next/script";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import fs from 'fs';
import path from 'path';

// Read critical CSS at build time (re-read on edit; v2)
const criticalCSS = fs.readFileSync(
  path.join(process.cwd(), 'app', 'critical.css'),
  'utf8'
);

export const metadata: Metadata = {
  title: "arach.dev",
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'arach.dev',
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: 'arach.dev',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'arach.dev',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'arach.dev',
    description: SITE_DESCRIPTION,
    images: ['/api/og'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="default" suppressHydrationWarning className={`h-full ${GeistMono.variable} ${GeistSans.variable}`}>
      <head>
        {/* Inline critical CSS for immediate render */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <style dangerouslySetInnerHTML={{ __html: themesCSS }} />
        <Script id="theme-boot" strategy="beforeInteractive">{themeBootScript}</Script>
      </head>
      <body className={`${GeistSans.className} antialiased flex flex-col min-h-screen`}>
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="flex-grow pt-0 focus:outline-none">
            {children}
          </main>
          <Footer />
          <ConsoleArt />
          <GoogleAnalytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}