import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Derb 37',
    template: '%s — Derb 37',
  },
  description: 'A food and life journal from inside a 300-year-old house in the Marrakech medina.',
  metadataBase: new URL('https://derb37.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Derb 37',
    title: 'Derb 37',
    description: 'A food and life journal from inside a 300-year-old house in the Marrakech medina.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://derb37.com',
    name: 'Derb 37',
    url: 'https://derb37.com',
    description: 'A food and life journal from inside a 300-year-old house in the Marrakech medina.',
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: 'Jacqueline Ng',
      url: 'https://derb37.com/about',
      knowsAbout: ['Moroccan cuisine', 'Marrakech medina', 'cross-cultural cooking', 'riad life'],
      address: { '@type': 'PostalAddress', addressLocality: 'Marrakech', addressCountry: 'MA' },
    },
    about: [
      { '@type': 'Thing', name: 'Moroccan cuisine' },
      { '@type': 'Thing', name: 'Marrakech medina life' },
      { '@type': 'Thing', name: 'Cross-cultural cooking' },
      { '@type': 'Thing', name: 'Ramadan food traditions' },
    ],
    potentialAction: {
      '@type': 'ReadAction',
      target: 'https://derb37.com',
    },
  };

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
        <link rel="alternate" type="application/json" href="/api/knowledge/entries" title="Derb 37 Knowledge API" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q0WDER0PS9" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-Q0WDER0PS9');`,
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
