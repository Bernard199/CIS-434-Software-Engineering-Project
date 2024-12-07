import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const user_id = verifyToken(token);
    if (!user_id) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { user_id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // Fetch user's tasks
    const userTasks = await prisma.tasks.findMany({
      where: { user_id },
    });

    const transformedTasks = userTasks.map((task) => ({
      taskId: task.task_id,
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
      deadline: task.deadline ? task.deadline.toISOString().split('T')[0] : null,
      status: task.status,
    }));

    return NextResponse.json(transformedTasks, { status: 200 });
  } catch (error: any) {
    console.error('GET Error:', error.message);
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

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
    return NextResponse.json({
      taskId: newTask.task_id,
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      priority: newTask.priority,
      deadline: newTask.deadline ? newTask.deadline.toISOString().split('T')[0] : null,
      status: newTask.status,
    }, { status: 201 });
  } catch (error: any) {
    console.error('POST Error:', error.message);
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const user_id = verifyToken(token);
    if (!user_id) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const body = await request.json();
    const { taskId, title, description, category, priority, deadline, status } = body;

    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Check if the user exists
    const existingUser = await prisma.users.findUnique({ where: { user_id } });
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // Check if the task belongs to this user
    const existingTask = await prisma.tasks.findUnique({
      where: { task_id: taskId },
    });

    if (!existingTask || existingTask.user_id !== user_id) {
      return NextResponse.json({ error: 'Task not found or not owned by user' }, { status: 404 });
    }

    const updatedTask = await prisma.tasks.update({
      where: { task_id: taskId },
      data: {
        title,
        description: description || null,
        category: category || null,
        priority: priority || 1,
        deadline: deadline ? new Date(deadline) : null,
        status: status || 'Pending',
      },
    });

    return NextResponse.json({
      taskId: updatedTask.task_id,
      title: updatedTask.title,
      description: updatedTask.description,
      category: updatedTask.category,
      priority: updatedTask.priority,
      deadline: updatedTask.deadline ? updatedTask.deadline.toISOString().split('T')[0] : null,
      status: updatedTask.status,
    }, { status: 200 });

  } catch (error: any) {
    console.error('PUT Error:', error.message);
    return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const user_id = verifyToken(token);

    if (!user_id) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const body = await request.json();
    const { task_id } = body;

    if (!task_id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    // Check if the task belongs to this user
    const existingTask = await prisma.tasks.findUnique({
      where: { task_id },
    });

    if (!existingTask || existingTask.user_id !== user_id) {
      return NextResponse.json({ error: 'Task not found or not owned by user' }, { status: 404 });
    }

    await prisma.tasks.delete({
      where: { task_id },
    });

    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('DELETE Error:', error.message);
    return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
