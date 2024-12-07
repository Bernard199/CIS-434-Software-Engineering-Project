import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all roles
export async function GET() {
  try {
    const roles = await prisma.roles.findMany();
    return NextResponse.json(roles);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching roles' }, { status: 500 });
  }
}

// POST: Create a new role
export async function POST(request: Request) {
  try {
    const { role_name } = await request.json();

    const newRole = await prisma.roles.create({
      data: {
        role_id: Math.floor(Math.random() * 10000), // or any logic to generate a unique ID
        role_name,
      },
    });

    return NextResponse.json(newRole);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating role' }, { status: 500 });
  }
}

// DELETE: Delete a role by ID
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    await prisma.roles.delete({
      where: { role_id: id },
    });

    return NextResponse.json({ message: 'Role deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting role' }, { status: 500 });
  }
}
