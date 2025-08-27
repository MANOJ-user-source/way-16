import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function generateNonce(): string {
  const bytes = new Uint8Array(16);
  // Web Crypto in Edge Runtime
  crypto.getRandomValues(bytes);
  let str = '';
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  // btoa is available in the runtime; fallback to hex if not
  try {
    return btoa(str);
  } catch {
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
}

export function middleware(request: NextRequest) {
  const nonce = generateNonce();

  // Make nonce available to the app via request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Core security headers
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'accelerometer=(), camera=(), microphone=(), geolocation=()');

  const isDev = process.env.NODE_ENV !== 'production';

  // In dev, Next.js uses inline styles and eval for HMR; relax CSP accordingly.
  // In prod, use nonce-based script policy and allow inline styles (Next injects some styles).
  const csp = isDev
    ? [
        "default-src 'self'",
        `script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: 'nonce-${nonce}'`,
        `style-src 'self' 'unsafe-inline' blob: 'nonce-${nonce}'`,
        "img-src 'self' data: blob:",
        "font-src 'self' data:",
        "connect-src 'self' ws: wss:",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; ')
    : [
        "default-src 'self'",
        `script-src 'self' 'strict-dynamic' 'nonce-${nonce}'`,
        `style-src 'self' 'unsafe-inline' 'nonce-${nonce}'`,
        "img-src 'self' data:",
        "font-src 'self' data:",
        "connect-src 'self'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; ');

  response.headers.set('x-nonce', nonce);
  response.headers.set('Content-Security-Policy', csp);
  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
