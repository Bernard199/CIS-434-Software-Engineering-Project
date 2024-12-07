import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
      .map((origin) => origin.trim())
      .filter((origin) => origin !== '') // Remove empty entries
  : [];

function isAllowedOrigin(origin: string): boolean {
  return allowedOrigins.some((allowedOrigin) => {
    if (allowedOrigin.includes('*')) {
      const regex = new RegExp(`^${allowedOrigin.replace('*', '.*')}$`);
      return regex.test(origin);
    }
    return allowedOrigin === origin;
  });
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  console.log('Allowed Origins:', allowedOrigins);
  console.log('Request Origin:', origin);

  // Handle preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*'); // Replace '*' with specific origins
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    headers.set('Access-Control-Allow-Credentials', 'true');
    return new Response(null, { headers, status: 204 });
  }

  // Handle CORS for allowed origins
  if (origin && isAllowedOrigin(origin)) {
    console.log(`CORS allowed for origin: ${origin}`);
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
  }

  // Reject requests from disallowed origins
  if (origin && !isAllowedOrigin(origin)) {
    console.warn(`CORS denied for origin: ${origin}`);
    return new NextResponse('CORS origin not allowed', { status: 403 });
  }

  // Handle requests without an Origin header
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // Apply to all API routes
};
