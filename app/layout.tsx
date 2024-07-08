import { IBM_Plex_Mono } from "next/font/google";
import type { Metadata } from 'next'
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ['300', '400', '500', '600'], variable: "--font-ibm-plex-mono" });

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
    <html lang="en" className="h-full">
      <body className={`${ibmPlexMono.variable} font-mono text-gray-300 flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}