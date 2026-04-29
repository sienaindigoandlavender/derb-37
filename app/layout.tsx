import './globals.css';
import type { Metadata, Viewport } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE_NAME, SITE_URL, siteJsonLd } from '@/lib/seo';

const DEFAULT_DESCRIPTION =
  'Short notes and recipes from a 300-year-old riad in the Marrakech medina, by Jacqueline Ng. Kitchen, Morocco, travel.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Derb 37 — notes from the Marrakech medina',
    template: '%s · Derb 37',
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: '/' },
  applicationName: SITE_NAME,
  authors: [{ name: 'Jacqueline Ng', url: `${SITE_URL}/about` }],
  creator: 'Jacqueline Ng',
  publisher: SITE_NAME,
  keywords: [
    'Marrakech',
    'medina',
    'Morocco',
    'food notes',
    'Moroccan recipes',
    'riad',
    'Jacqueline Ng',
    'Derb 37',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Derb 37 — notes from the Marrakech medina',
    description: DEFAULT_DESCRIPTION,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Derb 37' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Derb 37',
    description: DEFAULT_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
