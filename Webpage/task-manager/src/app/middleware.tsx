import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

dotenv.config();

// Load and sanitize environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
      .map((origin) => origin.trim())
      .filter((origin) => origin !== '') // Remove empty entries
  : [];

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');

  // Handle CORS for allowed origins
  if (origin && allowedOrigins.includes(origin)) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    // Handle preflight OPTIONS requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers: response.headers });
    }

    return response;
  }

  // Reject requests from disallowed origins with a generic response
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse('CORS origin not allowed', { status: 403 });
  }

  // Handle requests without an Origin header (e.g., server-to-server requests)
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // Apply to all API routes
};
