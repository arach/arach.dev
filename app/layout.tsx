import { IBM_Plex_Mono } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from 'next'
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/lib/theme-context";
import Script from "next/script";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${GeistMono.variable}`}>
      <head>
        {/* Optimized font loading - use font-display: optional for non-critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Orbitron:wght@400;600;700&family=Space+Grotesk:wght@400;500;600&family=Outfit:wght@400;500;600&family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@400;500;600&family=Exo+2:wght@400;600&family=Crimson+Text:wght@400;600&family=Lora:wght@400;600&display=optional" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${ibmPlexMono.variable} ${GeistMono.className} font-mono text-gray-300 flex flex-col min-h-screen`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow pt-0">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}