'use server'

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender
}


// Función para obtener productos paginados con imágenes, y con opcion de filtrar por género

export const getPaginatedProductsWithImages = async ( {page = 1, take = 12, gender}: PaginationOptions) => {
    // Validar los parámetros de paginación
    if (isNaN(+page) || page < 1) page = 1
    if (isNaN(+take) || take < 1) take = 12

    try {
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            // por genero
            where: {
                gender: gender
            }
        })
        //obtener total de pags
        const totalCount = await prisma.product.count({
            where: {
                gender: gender
            }
        })
        const totalPages = Math.ceil(totalCount / take) // redondear hacia arriba

        return {
            currentPage: page,
            totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        }

    } catch (error) {
        throw new Error('No se pudo cargar los productos')
    }
}
