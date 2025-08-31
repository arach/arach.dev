import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/lib/theme-provider-v2";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemePicker from "@/components/ThemePicker";
import "./globals.css";
import "./styles/themes.css"; // Import all theme CSS

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arach Tchoupani",
  description: "Software Engineer & Designer",
  openGraph: {
    title: "Arach Tchoupani",
    description: "Software Engineer & Designer - Building thoughtful digital experiences",
    url: "https://arach.dev",
    siteName: "arach.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${GeistMono.variable} no-transitions`}>
      <body className={`${ibmPlexMono.variable} ${GeistMono.className} font-mono flex flex-col min-h-screen`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow pt-0">
            {children}
          </main>
          <Footer />
          <ThemePicker />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}