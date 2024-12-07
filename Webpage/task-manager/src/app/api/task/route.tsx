import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

function setCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', 'https://project.corpustemp.com/'); 
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

// Handle preflight OPTIONS requests
export async function OPTIONS(request: Request) {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', 'https://project.corpustemp.com/'); 
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  headers.set('Access-Control-Allow-Credentials', 'true');
  return new Response(null, { headers, status: 204 });
}

export async function GET(request: Request) {
  let response;
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

    const userTasks = await prisma.tasks.findMany({ where: { user_id } });
    const transformedTasks = userTasks.map((task) => ({
      taskId: task.task_id,
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
      deadline: task.deadline ? task.deadline.toISOString().split('T')[0] : null,
      status: task.status,
    }));

    response = NextResponse.json(transformedTasks, { status: 200 });
  } catch (error: any) {
    console.error('GET Error:', error.message);
    response = NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }

  return setCorsHeaders(response);
}

export async function POST(request: Request) {
  let response;
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
    const { title, description, role, priority, deadline, status, category } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
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

    response = NextResponse.json(
      {
        taskId: newTask.task_id,
        title: newTask.title,
        description: newTask.description,
        category: newTask.category,
        priority: newTask.priority,
        deadline: newTask.deadline ? newTask.deadline.toISOString().split('T')[0] : null,
        status: newTask.status,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST Error:', error.message);
    response = NextResponse.json({ error: 'Error creating task' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }

  return setCorsHeaders(response);
}
