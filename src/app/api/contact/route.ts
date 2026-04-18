import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const inquiry = await prisma.contactInquiry.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        message: data.message,
      }
    });
    return NextResponse.json(inquiry, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}
