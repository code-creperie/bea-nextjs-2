import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';
import { getCurrentUser } from '../lib/session';
import LogoutButton from './components/LogoutButton';

export const metadata = {
  title: 'Book Exchange Application'
};

type LayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {/* NAVBAR */}
        <nav className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="text-2xl font-semibold dark:text-white">
                📚 Book Exchange Application
              </span>
            </Link>
            <div className="md:block w-auto">
              <ul className="flex flex-col md:flex-row md:space-x-8 font-medium mt-4 md:mt-0 p-4 md:p-0
                  border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-white
                  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 rtl:space-x-reverse items-center">
                <li><Link href="/" className="block py-2 px-3 text-gray-900 md:text-green-700 dark:text-white"> Home </Link></li>
                <li><Link href="/about" className="block py-2 px-3 text-gray-900 dark:text-white"> About </Link></li>
                <li><Link href="/books" className="block py-2 px-3 text-gray-900 dark:text-white"> Books </Link></li>
                <li><Link href="/books/add" className="block py-2 px-3 text-gray-900 dark:text-white"> Add a book </Link></li>
                {currentUser ? (
                  <>
                    <li className="block py-2 px-3 text-gray-500 italic">Hi, {currentUser.name}</li>
                    <li><LogoutButton /></li>
                  </>
                ) : (
                  <li><Link href="/login" className="block py-2 px-3 text-gray-900 dark:text-white"> Login </Link></li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <main className="">{children}</main>
        <footer className="bg-gray-900 text-white py-4 text-center">
          <small>&copy; {new Date().getFullYear()} Book Exchange Application. All rights reserved.</small>
        </footer>
      </body>
    </html>
  );
}
