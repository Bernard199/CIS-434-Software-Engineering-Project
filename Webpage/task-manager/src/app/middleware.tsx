import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Load environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const origin = request.headers.get('origin');

  // Check if the origin is in the allowedOrigins list
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    // Create a new response for preflight
    const preflightResponse = new NextResponse(null, { status: 200 });
    if (origin && allowedOrigins.includes(origin)) {
      preflightResponse.headers.set('Access-Control-Allow-Origin', origin);
      preflightResponse.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      preflightResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      preflightResponse.headers.set('Access-Control-Allow-Credentials', 'true');
    }
    return preflightResponse;
  }

  return response;
}

export const config = {
  matcher: '/api/:path*', // Apply to all API routes
};
