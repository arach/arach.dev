import type { Metadata } from 'next'
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/lib/theme/site/provider";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemePicker } from "@/components/ThemePicker";
import { ConsoleArt } from "@/components/ConsoleArt";
import { IBM_Plex_Mono } from "next/font/google";
import { GeistMono, GeistSans } from "geist/font";

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
    <html lang="en" className={`h-full ${GeistMono.variable} ${GeistSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          id="theme-font-preload"
          dangerouslySetInnerHTML={{ __html: `
            (function(){
              try {
                var saved = localStorage.getItem('site-theme') || 'default';
                var urls = {
                  dark: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap',
                  ocean: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=DM+Sans:wght@400;600&display=swap',
                  cyberpunk: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Exo+2:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap',
                  paper: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Crimson+Text:wght@400;600;700&family=Courier+Prime:wght@400;700&display=swap',
                  sunset: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lora:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap'
                };
                var href = urls[saved];
                if (!href) return;
                var exists = document.querySelector('link[rel="stylesheet"][href="'+href+'"]');
                if (exists) return;
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.setAttribute('data-theme-fonts', 'true');
                document.head.appendChild(link);
              } catch(_){}
            })();
          ` }}
        />
      </head>
      <body className={`${ibmPlexMono.variable} ${GeistMono.className} font-mono flex flex-col min-h-screen`}>
        <ThemeProvider>
          <div hidden>
            <ConsoleArt />
          </div>
          
          <Header />
          
          <main className="flex-grow pt-0">
            {children}
          </main>
          
          <Footer />
          
          <ThemePicker />
          
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `}
          </Script>
          
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
