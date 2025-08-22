'use client';
import { SubmitEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book } from '../../../../types/book';

export default function EditBookForm() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [book, setBook] = useState<Book | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error('Failed to fetch book');
        const data = await res.json();
        setBook(data);
        setName(data.name);
        setDescription(data.description);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred while fetching the book.');
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !description.trim()) {
      setError('Please fill in both the name and the description.');
      return;
    }

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update book');

      router.push(`/books/${id}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  }

  if (loading) return null;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 shadow-lg rounded-lg">
      {error && <p className="text-center text-red-600 py-4">{error}</p>}
      <h2 className="text-center text-xl font-semibold mb-4">
        {book ? `Edit: ${book.name}` : 'Edit book'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            id="description"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-yellow-700 transition-colors"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}