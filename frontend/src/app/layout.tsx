import type { Metadata, Viewport } from 'next';
import { GeistMono } from 'geist/font/mono';
import { Marcellus, Jost } from 'next/font/google';
import './globals.css';

/**
 * The Falcon Trails pairing, as on falcontrails.in. Marcellus only on display
 * headings (dashboard greeting, hero numbers); Jost for body copy, tables and
 * forms. Geist Mono stays for figures and codes.
 */
const marcellus = Marcellus({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-marcellus',
});

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: 'Falcon Trails',
  description: 'Lead, quotation and booking desk',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f7f5f0',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jost.variable} ${GeistMono.variable} ${marcellus.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
