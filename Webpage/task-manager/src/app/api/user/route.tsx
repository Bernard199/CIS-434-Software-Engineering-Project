import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '@/lib/auth';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { action, username, password } = await request.json();

    if (!username || !password || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing username, password, or action' },
        { status: 400 }
      );
    }

    if (action === 'signup') {
      // Check if a user with the same username already exists
      const existingUser = await prisma.users.findFirst({
        where: { username },
      });

      if (existingUser) {
        return NextResponse.json(
          { success: false, error: 'Username already taken' },
          { status: 409 } // 409 Conflict
        );
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const newUser = await prisma.users.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'User created successfully',
        user: { user_id: newUser.user_id, username: newUser.username },
      });
    }

    if (action === 'login') {
      // Use findFirst since username is not unique yet
      const user = await prisma.users.findFirst({
        where: { username },
      });

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Compare hashed password
      const passwordValid = await bcrypt.compare(password, user.password ?? '');
      if (!passwordValid) {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const token = generateToken(user.user_id);
      return NextResponse.json({
        success: true,
        token,
        user: { user_id: user.user_id, username: user.username },
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error during auth:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
