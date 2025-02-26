import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[]

    getTotalItems: () => number
    getSummaryInfo: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsIn: number;
    }
    addProductToCart: (product: CartProduct) => void
    updateProductQuantity: (product: CartProduct, quantity: number) => void
    removeProduct: (product: CartProduct) => void
    clearCart: () => void

}


export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            // methods

            getTotalItems: () => {
                const { cart } = get()
                return cart.reduce((total, item) => total + item.quantity, 0)
            },


            getSummaryInfo: () => {
                const { cart } = get()
                const subTotal = cart.reduce(
                    (subTotal, product) => (product.quantity * product.price) + subTotal, 0)

                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemsIn = cart.reduce((total, item) => total + item.quantity, 0)
                return {
                    subTotal,
                    tax,
                    total,
                    itemsIn
                }
            },


            addProductToCart: (product: CartProduct) => {
                const { cart } = get()

                // revisar si el producto existe en el carrito con su size
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                )
                if (!productInCart) {
                    set({ cart: [...cart, product] })
                    return
                }
                // incremento la quantity del producto

                const updatedCart = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }

                    return item
                })
                set({ cart: updatedCart })
            },



            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get()

                const updatedCart = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity }
                    }
                    return item
                })
                set({ cart: updatedCart })
            },


            removeProduct: (product: CartProduct) => {
                const { cart } = get()

                const updatedCart = cart.filter(item => item.id !== product.id || item.size !== product.size)
                set({ cart: updatedCart })
            },
            clearCart: () => {
                set({ cart: [] });
              },


        })
        , {
            name: 'shopping-cart',
        }
    )

);