'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundFX() {
  const blobRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const blob = blobRef.current!;
    let rafId: number | null = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;

    const onMove = (e: PointerEvent | TouchEvent | MouseEvent) => {
      // @ts-ignore
      const pt = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : (e as PointerEvent | MouseEvent);
      const clientX = (pt as any).clientX as number;
      const clientY = (pt as any).clientY as number;
      targetX = clientX;
      targetY = clientY;
      const px = (clientX / window.innerWidth) * 100;
      const py = (clientY / window.innerHeight) * 100;
      root.style.setProperty('--x', px.toFixed(2) + '%');
      root.style.setProperty('--y', py.toFixed(2) + '%');
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const tick = () => {
      const k = 0.15; // easing factor
      x += (targetX - x) * k;
      y += (targetY - y) * k;
      if (blob) blob.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      const dist = Math.hypot(targetX - x, targetY - y);
      if (dist < 0.5) {
        rafId = null;
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('pointermove', onMove as any, { passive: true } as any);
    window.addEventListener('touchmove', onMove as any, { passive: true } as any);
    onMove({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 } as any);

    return () => {
      window.removeEventListener('pointermove', onMove as any);
      window.removeEventListener('touchmove', onMove as any);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="blob" ref={blobRef} aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
    </>
  );
}

