"use client";

import { useEffect } from 'react';
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";


import { IoInformationOutline } from "react-icons/io5";
import clsx from 'clsx';
import { authenticate } from '@/actions/auth/login';
import { time } from 'console';


export const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticate, undefined);
  

  useEffect(() => {
    if ( state === 'Success' ) {
      setTimeout(() => {
        // Redirigir al usuario a la página de inicio después de 1 segundo
        window.location.replace('/');
      }, 2000);
      
    }

  },[state]);



  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-300 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-300 rounded mb-5"
        type="password"
        name="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <div className="flex flex-row mb-2 justify-center items-center">
            <IoInformationOutline className="h-10 w-10 text-red-500" />
            <p className="text-sm text-red-500">
              Credenciales no son correctas
            </p>
          </div>
        )}
        
        {state === "Success" && (
          <div className="flex flex-row mb-2 justify-center items-center">
            <IoInformationOutline className="h-10 w-10 text-green-500" />
            <p className="text-md text-green-500">Ingreso exitoso</p>
          </div>
        )}
      </div>

        <LoginButton />
     
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      className={ clsx({
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
      disabled={ pending }
      >
      Ingresar
    </button>
  );
}