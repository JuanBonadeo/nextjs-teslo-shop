'use client'

import { useAddressStore } from '@/store/address/address-store'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface FormInputs {
    firstName: string,
    lastName: string,
    address: string,
    postalCode: string,
    city: string,
    phone: string,
    rememberAddress: boolean
}


export const AdressForm = () => {
    const router = useRouter();
    const { handleSubmit, register, formState: { isValid }, reset} = useForm<FormInputs>({
        defaultValues: {
            //TODO LLER DE LA BASE DE DATOS
        }
    })
    const { address, setAddress} = useAddressStore(state => state)

    const onSubmit = ( data: FormInputs) => {
        const {rememberAddress, ...restAddress} = data
        setAddress( restAddress )
        router.push('/checkout')
    }

    useEffect(() => {
      if( address.firstName) {
        reset(address)
      }
    }, [address, reset])
    


    return (

        <form onSubmit={ handleSubmit( onSubmit ) }
        className="grid grid-cols-1 gap-2 sm:px-10 lg:gap-5 lg:grid-cols-2">


            <div className="flex flex-col mb-2">
                <span>Nombres</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-300"
                    { ...register('firstName', { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Apellidos</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-300"
                    { ...register('lastName', { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Dirección</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-300"
                    { ...register('address', { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Código postal</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-300"
                    { ...register('postalCode', { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Ciudad</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-300"
                    { ...register('city', { required: true })}
                />
            </div>


            <div className="flex flex-col mb-2">
                <span>Teléfono</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-300"
                    { ...register('phone', { required: true })}
                />
            </div>

                <button
                    // href='/checkout'
                    type='submit'
                    //className=
                    className={
                        clsx("btn-primary flex w-full sm:w-1/2 justify-center mt-3",
                            {
                            'btn-primary': isValid,
                            'btn-disabled': !isValid,
                        })
                    }
                    disabled={ !isValid }
                    >
                    Siguiente
                </button>
            


        </form>

    )
}
