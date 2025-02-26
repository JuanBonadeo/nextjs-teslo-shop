export const revalidate = 0



import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { UsersTable } from './ui/usersTable';
import { getPaginatedUsers } from '@/actions/users/get-paginated-users';


export default async function Users() {

  const { ok, users = [] } = await getPaginatedUsers()

  if (!ok) {
    redirect('/auth/login')
  }


  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={ users } />
      </div>
    </>
  );
}