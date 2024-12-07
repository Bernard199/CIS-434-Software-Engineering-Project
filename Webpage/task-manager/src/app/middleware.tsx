import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

dotenv.config();

// Load environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : [];

// Middleware function
export function middleware(request: NextRequest) {
  console.log('--- Incoming Request ---');
  console.log('Method:', request.method);
  console.log('Origin:', request.headers.get('origin'));
  console.log('Path:', request.nextUrl.pathname);

  const response = NextResponse.next();
  const origin = request.headers.get('origin');

  // Check if the origin is in the allowedOrigins list
  if (origin) {
    if (allowedOrigins.includes(origin)) {
      console.log(`Origin "${origin}" is allowed.`);
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    } else {
      console.warn(`Origin "${origin}" is not allowed.`);
      return new NextResponse('CORS origin not allowed', { status: 403 });
    }
  } else {
    console.warn('No Origin header found in the request.');
  }

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    console.log('Handling preflight OPTIONS request.');
    const preflightResponse = new NextResponse(null, { status: 200 });
    if (origin && allowedOrigins.includes(origin)) {
      console.log(`Setting CORS headers for preflight from origin "${origin}".`);
      preflightResponse.headers.set('Access-Control-Allow-Origin', origin);
      preflightResponse.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      preflightResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      preflightResponse.headers.set('Access-Control-Allow-Credentials', 'true');
    }
    return preflightResponse;
  }

  console.log('Request passed through middleware.');
  return response;
}

export const config = {
  matcher: '/api/:path*', // Apply to all API routes
};
