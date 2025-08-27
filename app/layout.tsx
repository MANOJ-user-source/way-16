import './globals.css';
import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: '700', variable: '--font-playfair' });

export const metadata = {
  title: '16 WAYS – Luxury Auto Parts',
  description: 'Premium import-export auto parts supplier',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-onyx text-white">
        <Navbar />
        {/* Add padding top to account for fixed navbar height */}
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}