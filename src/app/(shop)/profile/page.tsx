import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";


export default async function ProfilePage() {
  //para sacar la session en el server side se usa auth()
  const session = await auth()
  if (!session?.user) {
    redirect('/')
  }
  return (
    <div className="h-[700px] my-auto p-5">
      <Title title="Perfil" />
      <h3 className="text-2xl mb-5">{session.user.name}</h3>
      <h4 className="text-xl mb-5">{session.user.email}</h4>
      <h3 className="text-xl mb-10">Rol: {session.user.role}</h3>
    </div>
  );
}