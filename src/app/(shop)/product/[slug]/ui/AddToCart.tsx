'use client'


import { QuantitySelector, SizeSelector } from "@/components"
import { Product, Size } from "@/interfaces"
import { useCartStore } from "@/store/cart/cart-stores";
import { useState } from "react";
import type { CartProduct } from '../../../../../interfaces/product.interface';



interface Props {
    product: Product;
}
export const AddToCart = ({ product }: Props) => {

    const addProuctToCart = useCartStore( state => state.addProductToCart);

    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)
    const [posted, setPosted] = useState(false)

    const addToCart = () => {
        setPosted(true)
        
        if(!size ) return

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity,
            size
        }

        addProuctToCart( cartProduct )
        setPosted(false)
        setQuantity(1)
        setSize(undefined)

    }


    return (
        <>
            {
                posted && !size && (
                    <span className="mt-1 text-red-500 fade-in">
                        Debe de seleccionar una talla*
                    </span>
                )
            }
            {/* Selector de Tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setSize}
            />


            {/* Selector de Cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />


            {/* Button */}
            <button  onClick={ addToCart }className="btn-primary my-5">
                Agregar al carrito
            </button>


        </>
    )
}
