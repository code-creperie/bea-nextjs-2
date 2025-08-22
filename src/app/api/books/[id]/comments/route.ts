import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./bea.db',
});
const prisma = new PrismaClient({ adapter });

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const bookId = parseInt(params.id, 10);

        if (isNaN(bookId)) {
            return NextResponse.json({ error: 'Invalid book ID format' }, { status: 400 });
        }

        // Check if the book exists
        const book = await prisma.book.findUnique({ where: { id: bookId } });
        if (!book) {
            return NextResponse.json({ error: 'Book not found to add comment to' }, { status: 404 });
        }

        const body = await req.json();
        const { author, commentText } = body;

        if (!author || !commentText) {
            return NextResponse.json(
                { error: 'Author and comment text are required and cannot be empty' },
                { status: 400 }
            );
        }

        const newComment = await prisma.comment.create({
            data: {
                author,
                commentText,
                bookId: bookId, // Link the comment to the book
            },
        });

        return NextResponse.json({ message: 'Comment added successfully', comment: newComment }, { status: 201 });
    } catch (error) {
        console.error(`Error adding comment to book ID ${params.id}:`, error);
        return NextResponse.json(
            { error: 'Failed to add comment' },
            { status: 500 }
        );
    }
}
