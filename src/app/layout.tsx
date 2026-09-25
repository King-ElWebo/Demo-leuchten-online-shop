import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google';

import './globals.css';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { ShopProvider } from '@/lib/domain/context';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | LUMENWERK Studio',
    default: 'LUMENWERK Studio — Architektonische Leuchten',
  },
  description:
    'Präzisionsgefertigte architektonische Leuchten aus Messing, Rohstahl und mundgeblasenem Opalglas mit tageslichtechtem CRI 98+. Atelier Wien & Berlin.',
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-[#F7F5F0] text-[#1E1D1B] font-sans antialiased selection:bg-[#D97724] selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-sm focus:bg-[#D97724] focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-white focus:shadow-lg focus:outline-none"
        >
          Direkt zum Hauptinhalt springen
        </a>
        <ShopProvider>
          <Header />
          <main
            id="main-content"
            className="flex-1 focus:outline-none"
            tabIndex={-1}
          >
            {children}
          </main>
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
