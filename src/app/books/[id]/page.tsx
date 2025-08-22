'use client';
import { SubmitEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { BookWithComments } from '../../../types/book';

import Header from '../../components/Header';
import { use } from 'react'; // Import React's use function

type BookDetailProps = {
  params: Promise<{ id: string }>;
};

export default function BookDetailPage({ params }: BookDetailProps) {
  const { id } = use(params);
  const [book, setBook] = useState<BookWithComments | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [subtitle, setSubtitle] = useState<string>("Book Information");

  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error('Failed to fetch book');
        const data = await res.json();
        setSubtitle(`${data.name} - Book Information`);
        setBook(data);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred while fetching book details.');
      }
    }
    fetchBook();
  }, [id]);

  const handleCommentSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/books/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: commentAuthor, commentText: commentText }),
      });
      if (!res.ok) throw new Error('Failed to submit comment');
      const newComment = await res.json();

      // Add the new comment to the existing list of comments locally
      if (book && newComment.comment) {
        setBook({
          ...book,
          comments: [...book.comments, newComment.comment],
        });
      }

      // Clear form
      setCommentAuthor('');
      setCommentText('');

    } catch (error) {
      console.error(error || 'Failed to submit comment.');
    }
  };

  return (
    <>
      <Header subtitle={subtitle} />
      {error && <p className="text-center text-red-600 py-8">Error: {error}</p>}
      
      {/* Book Details */}
      <div className="flex flex-col md:flex-row bg-white m-4 shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/3 flex justify-center text-8xl p-6">📔</div>
        <div className="md:w-2/3 p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{book?.name}</h2>
          <p className="text-gray-600 mb-4">{book?.description}</p>
          {book && (
            <Link
              href={`/books/${book.id}/edit`}
              className="inline-block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Edit this book
            </Link>
          )}
        </div>
      </div>

      {/* Add Comment Form */}
      <div className="bg-gray-100 p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add Your Comment</h3>
        <form onSubmit={handleCommentSubmit}>
          <div className="mb-4">
            <label htmlFor="commentAuthor" className="block text-gray-700 font-medium mb-1">Your Name:</label>
            <input
              type="text"
              id="commentAuthor"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="commentText" className="block text-gray-700 font-medium mb-1">Your Comment:</label>
            <textarea
              id="commentText"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 disabled:bg-gray-400 transition-colors"
          >
            Post
          </button>
        </form>
      </div>

      {/* Comments Section */}
      <div className="bg-white p-6 mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>
        {book && book.comments.length > 0 ? (
          <ul className="space-y-4">
            {book.comments.map((comment) => (
              <li key={comment.id} className="border-b border-gray-200 pb-4">
                <p className="font-semibold text-gray-700">{comment.author}</p>
                <p className="text-gray-600 whitespace-pre-wrap">{comment.commentText}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet for this book.</p>
        )}
      </div>
    </>
  );
}
