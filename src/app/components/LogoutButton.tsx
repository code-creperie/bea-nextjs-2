'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleClick() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="block py-2 px-3 text-gray-900 dark:text-white underline"
    >
      Logout
    </button>
  );
}