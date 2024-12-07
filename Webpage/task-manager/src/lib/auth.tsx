import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // Default fallback for development

// Generate a token for a given user_id
export function generateToken(user_id: number): string {
  return jwt.sign({ user_id }, SECRET_KEY, { expiresIn: '1h' });
}

// Verify a token and extract the user_id
export function verifyToken(token: string): number | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { user_id: number };
    return decoded.user_id;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Invalid token:', error.message);
    } else {
      console.error('Invalid token:', error);
    }
    return null;
  }
}
console.log('Loaded JWT_SECRET:', process.env.JWT_SECRET);