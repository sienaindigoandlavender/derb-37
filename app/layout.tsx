import './globals.css';
import type { Metadata } from 'next';
import { EB_Garamond, Cormorant_Garamond, Cormorant_SC } from 'next/font/google';
import Masthead from '@/components/Masthead';
import PrimaryNav from '@/components/PrimaryNav';
import Footer from '@/components/Footer';
import { getSettings } from '@/lib/content';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const cormorantSC = Cormorant_SC({
  subsets: ['latin'],
  variable: '--font-sc',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://derb37.com'),
  title: {
    default: 'Derb 37 — a journal from a house in the medina',
    template: '%s · Derb 37',
  },
  description:
    'A first-person journal from a 300-year-old house in the Marrakech medina. Letters about the kitchen, Morocco, and travel.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Derb 37',
    title: 'Derb 37',
    description: 'A first-person journal from a 300-year-old house in the Marrakech medina.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <html lang="en" className={`${ebGaramond.variable} ${cormorant.variable} ${cormorantSC.variable}`}>
      <head>
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <Masthead settings={settings} />
        <PrimaryNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
