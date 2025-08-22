import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./bea.db',
});
const prisma = new PrismaClient({ adapter });

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' }, // Order books by creation date, newest first
    });
    return NextResponse.json({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description } = await req.json();

    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }

    const newBook = await prisma.book.create({
      data: {
        name,
        description,
      },
    });

    // Return the newly created book data
    return NextResponse.json({ book: newBook });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}