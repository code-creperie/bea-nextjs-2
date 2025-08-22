import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../../../lib/session';
import Header from '../../../components/Header';
import EditBookForm from './EditBookForm';

export default async function EditBookPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <Header subtitle="Edit book" />
      <div className="container mx-auto my-8 px-4">
        <EditBookForm />
      </div>
    </>
  );
}
