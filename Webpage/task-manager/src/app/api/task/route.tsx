import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    console.log('Authorization header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid Authorization header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const user_id = verifyToken(token);
    console.log('Decoded user_id from token:', user_id);

    if (!user_id) {
      console.log('Invalid or expired token');
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const body = await request.json();
    console.log('Request body:', body);

    const { title, description, role, priority, deadline, status, category } = body;

    // Validate required fields
    if (!title) {
      console.log('Missing title');
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Check if the user from the token exists
    const existingUser = await prisma.users.findUnique({
      where: { user_id },
    });
    console.log('Found user in DB:', existingUser);

    if (!existingUser) {
      console.log('User not found in DB');
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const newTask = await prisma.tasks.create({
      data: {
        title,
        description: description || null,
        role: role || null,
        priority: priority || 1,
        deadline: deadline ? new Date(deadline) : null,
        status: status || 'Pending',
        user_id: user_id,
        category: category || null,
      },
    });

    console.log('Task created successfully:', newTask);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error: any) {
    console.error('POST Error:', error.message);
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
