import './globals.css';
import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Inter, Playfair_Display } from 'next/font/google';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: '700', variable: '--font-playfair' });

export const metadata = {
  title: '16 WAYS — Luxury Auto Parts',
  description: 'Premium import-export auto parts supplier',
};

// Ensure Node.js runtime for server components using fs/path
export const runtime = 'nodejs';

export default function RootLayout({ children }: { children: ReactNode }) {
  // Access CSP nonce set in middleware if needed in Script tags
  const nonce = headers().get('x-nonce') || undefined;
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head suppressHydrationWarning>
        {nonce ? <meta property="csp-nonce" content={nonce} /> : null}
        <meta name="theme-color" content="#111111" />
      </head>
      <body className="bg-onyx text-white">
        <Navbar />
        {/* Full-bleed content: no top padding so content/images can extend under navbar */}
        <main className="min-h-[100svh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
