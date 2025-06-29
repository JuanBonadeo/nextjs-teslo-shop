'use client';

import Link from 'next/link';
import { IoSearchOutline, IoCartOutline, IoLogInOutline } from 'react-icons/io5';

import { titleFont } from '@/config/fonts';
import { useUIStore } from '@/store';
import { useCartStore } from '@/store/cart/cart-stores';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';


export const TopMenu = () => {

  const openSideMenu = useUIStore(state => state.openSideMenu);
  const totalItemsInCart = useCartStore(state => state.getTotalItems())

  // para menjar la rehidratacion de la pagina
  const [loaded, setLoaded] = useState(false)

  const { data: session } = useSession()

  const isAuthenticated = !!session?.user



  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <nav className="flex px-5 py-5 justify-between items-center w-full">

      {/* Logo */}
      <div>
        <Link
          href="/">
          <span className={`${titleFont.className} antialiased font-bold`} >Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">

        <Link className="m-2 p-2 rounded-md transition-all hover:scale-110" href="/gender/men">Hombres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:scale-110" href="/gender/women">Mujeres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:scale-110" href="/gender/kid">Niños</Link>

      </div>


      {/* Search, Cart, Menu */}
      {isAuthenticated ?
        <div className="flex items-center">

          <Link
            href={((totalItemsInCart === 0) && loaded) ? '/empty' : '/cart'}
            className="mx-2">
            <div className="relative">

              {
                (loaded && totalItemsInCart > 0) && (
                  <span className=" fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                    {totalItemsInCart}
                  </span>
                )
              }

              <IoCartOutline className="w-5 h-5" />
            </div>
          </Link>

          <button
            onClick={openSideMenu}
            className="m-2 p-2 rounded-md transition-all hover:scale-110">
            Menú
          </button>

        </div>
        : <Link
          href="/auth/login"
          className="flex items-center  p-2 hover:scale-110 rounded transition-all"
        >
          <IoLogInOutline size={30} />
          <span className="ml-3 text-xl">Ingresar</span>
        </Link>
      }


    </nav>
  );
};