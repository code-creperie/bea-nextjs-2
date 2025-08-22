import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./bea.db',
});
const prisma = new PrismaClient({ adapter });

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookId = parseInt(params.id);
    if (isNaN(bookId)) {
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        comments: { // Eager load comments related to this book
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookId = parseInt(params.id);
    if (isNaN(bookId)) {
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
    }

    const { name, description } = await request.json();

    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }

    // Confirm the book exists before attempting to update it
    const existing = await prisma.book.findUnique({ where: { id: bookId } });
    if (!existing) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    const updated = await prisma.book.update({
      where: { id: bookId },
      data: { name, description },
    });

    return NextResponse.json({ book: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}
