'use server';
 

import { signIn } from '@/auth.config';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
    return 'succes'


  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}



export const loginUser = async(email: string, password: string) => {
    try {
        await signIn('credentials', { email, password })
        
        return {
            ok: true,
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'no se pudo iniciar sesion'
        }
    }
}