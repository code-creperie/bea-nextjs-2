'use client';
import { SubmitEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBookForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add book');

      router.push('/books');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 shadow-lg rounded-lg">
      {error && <p className="text-center text-red-600 py-8">Error: {error}</p>}
      <h2 className="text-center text-xl font-semibold">Add book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter name"
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
            placeholder="Enter description"
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
          Send
        </button>
      </form>
    </div>
  );
}
