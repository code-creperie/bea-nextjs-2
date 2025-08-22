import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../../lib/session';
import Header from '../../components/Header';
import AddBookForm from './AddBookForm';

export default async function AddBookPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <Header subtitle="Add a Book" />
      <div className="container mx-auto my-8 px-4">
        <AddBookForm />
      </div>
    </>
  );
}
