'use client'

import { useForm, SubmitHandler   } from "react-hook-form";
import Link from 'next/link'
import clsx from "clsx";
import { registerUser } from '../../../../actions/auth/register';
import { useState } from "react";
import { loginUser } from "@/actions/auth/login";


interface FormInputs {
    name: string,
    email: string,
    password: string
}


export const RegisterForm = () => {


    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { name, email, password} = data
        console.log(data)
        
        // server action
        const resp = await registerUser(name, email, password);
        if( !resp.ok) {
            setErrorMessage( resp.message )
        }
        
        await loginUser(email.toLowerCase(), password)
        window.location.replace('/')
    };



    return (
        <form className='flex flex-col'  onSubmit={ handleSubmit( onSubmit )}>

            <label htmlFor="email">Nombre completo</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {'border-red-500': errors.name}
                    )
                }
                type="text" 
                { ...register('name', { required: true })}
                />


            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {'border-red-500': errors.email}
                    )
                }
                type="email" 
                { ...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
                />


            <label htmlFor="email">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {'border-red-500': errors.password}
                    )
                }
                type="password"
                { ...register('password', { required: true, minLength: 6 })}
                />
            {
                errorMessage && (
                    <span className="text-red-500"> * {errorMessage}</span>
                )
            }



            <button

                className="btn-primary">
                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form>
    )
}
