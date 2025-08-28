'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const nav = navRef.current!;
    const threshold = Math.max(120, window.innerHeight * 0.25);
    let hideTimer: number | null = null;

    const showAndScheduleHide = () => {
      nav.classList.remove('nav-hidden');
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        nav.classList.add('nav-hidden');
      }, 2500);
    };

    const updateDock = () => {
      if (window.scrollY > threshold) nav.classList.add('dock-right');
      else nav.classList.remove('dock-right');
    };
    const onNavPointer = (e: any) => {
      const pt = e.touches ? e.touches[0] : e;
      const rect = nav.getBoundingClientRect();
      const nx = ((pt.clientX - rect.left) / rect.width) * 100;
      const ny = ((pt.clientY - rect.top) / rect.height) * 100;
      nav.style.setProperty('--nx', Math.max(0, Math.min(100, nx)).toFixed(2) + '%');
      nav.style.setProperty('--ny', Math.max(0, Math.min(100, ny)).toFixed(2) + '%');
    };
    document.addEventListener('scroll', updateDock, { passive: true } as any);
    window.addEventListener('resize', updateDock);
    ['pointermove', 'touchmove', 'pointerenter'].forEach((ev) =>
      nav.addEventListener(ev as any, onNavPointer, { passive: true } as any)
    );
    updateDock();

    // Auto-hide after scroll idle (2.5s)
    const onScroll = () => showAndScheduleHide();
    window.addEventListener('scroll', onScroll, { passive: true } as any);
    // Also reappear on global pointer movement (mouse/touch)
    window.addEventListener('pointermove', showAndScheduleHide, { passive: true } as any);
    window.addEventListener('touchstart', showAndScheduleHide as any, { passive: true } as any);

    // Ensure visible on mount and when user interacts with navbar
    const onInteractShow = () => nav.classList.remove('nav-hidden');
    ['mouseenter', 'focusin'].forEach((ev) => nav.addEventListener(ev, onInteractShow));

    // Gentle rotation of sheen
    let sheen = 0;
    let sheenRaf: number | null = null;
    const spinSheen = () => {
      sheen = (sheen + 0.5) % 360;
      nav.style.setProperty('--sheen', sheen + 'deg');
      sheenRaf = requestAnimationFrame(spinSheen);
    };
    spinSheen();

    return () => {
      document.removeEventListener('scroll', updateDock as any);
      window.removeEventListener('resize', updateDock);
      ['pointermove', 'touchmove', 'pointerenter'].forEach((ev) =>
        nav.removeEventListener(ev as any, onNavPointer as any)
      );
      window.removeEventListener('scroll', onScroll as any);
      window.removeEventListener('pointermove', showAndScheduleHide as any);
      window.removeEventListener('touchstart', showAndScheduleHide as any);
      ['mouseenter', 'focusin'].forEach((ev) => nav.removeEventListener(ev, onInteractShow));
      if (sheenRaf) cancelAnimationFrame(sheenRaf);
    };
  }, []);

  return (
    <nav className="nav" ref={navRef} aria-label="Primary">
      <div className="brand">16WAYS</div>
      <div className="links">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
