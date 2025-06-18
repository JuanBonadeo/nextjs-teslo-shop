import { titleFont } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccount() {
  return (
    <div className="flex flex-col min-h-screen pt-15 sm:pt-32">

      <h1 className="text-3xl font-bold mb-5">Nueva cuenta</h1>

      

        <RegisterForm/>

     
    </div>
  );
}