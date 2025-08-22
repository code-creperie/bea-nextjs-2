'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Book } from '../../types/book';
import Header from '../components/Header';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch('/api/books');
        if (!res.ok) throw new Error('Failed to fetch books');
        const data = await res.json();
        setBooks(data.books);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      }
    }
    fetchBooks();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <Header subtitle="List of books" />
      <div className="container mx-auto my-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {error && <p className="text-center text-red-600 py-8">Error: {error}</p>}
        {books.map((book) => (
          <div key={book.id} className="p-4 rounded-lg shadow-lg bg-white">
            <div className="flex justify-center text-8xl mb-2">📔</div>
            <div className="text-center">
              <Link
                href={`/books/${book.id}`}
                className="block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                {book.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
