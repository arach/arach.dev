import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from 'next'
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/lib/theme/site/provider";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemePicker from "@/components/ThemePicker";
import { ConsoleArt } from "@/components/ConsoleArt";
import fs from 'fs';
import path from 'path';

// Read critical CSS at build time
const criticalCSS = fs.readFileSync(
  path.join(process.cwd(), 'app', 'critical.css'),
  'utf8'
);

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
    <html lang="en" className={`h-full ${GeistMono.variable} ${GeistSans.variable}`}>
      <head>
        {/* Inline critical CSS for immediate render */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body className={`${GeistMono.className} font-mono flex flex-col min-h-screen`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow pt-0">
            {children}
          </main>
          <Footer />
          <ThemePicker />
          <ConsoleArt />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}