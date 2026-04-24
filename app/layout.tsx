import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alivio — Compañero de apoyo emocional',
  description:
    'Un espacio cálido para expresar cómo te sientes. Gratis, anónimo, 24/7. IA de apoyo emocional, no sustituye atención profesional.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Alivio',
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF7' },
    { media: '(prefers-color-scheme: dark)', color: '#2B443A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-[100dvh] font-sans">{children}</body>
    </html>
  );
}
