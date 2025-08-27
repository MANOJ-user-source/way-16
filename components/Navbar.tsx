'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-gold font-serif text-2xl">
          16 WAYS
        </Link>
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-md px-4 py-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-white hover:text-gold"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}