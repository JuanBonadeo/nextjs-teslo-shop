'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Gender, Product, Size } from '@prisma/client';
import { z } from 'zod';
import { uploadImages } from '@/utils/uploadImagesToCloudinary';




const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform( val => Number(val.toFixed(2)) ),
  inStock: z.coerce
    .number()
    .min(0)
    .transform( val => Number(val.toFixed(0)) ),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform( val => val.split(',') ),
  tags: z.string(),
  gender: z.nativeEnum(Gender), 
});







export const createUpdateProduct = async( formData: FormData ) => {
  // Validar el formulario
  const data = Object.fromEntries( formData );
  const productParsed = productSchema.safeParse( data );

  if ( !productParsed.success) {
    console.log( productParsed.error );
    return { ok: false }
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, '-' ).trim();

  const { id, ...rest } = product;

  try {
    // Arranco la transacción 
    const prismaTx = await prisma.$transaction( async (tx) => {
  
      let product: Product;
      const tagsArray = rest.tags.split(',').map( tag => tag.trim().toLowerCase() );
  
      if ( id ) {
        // Actualizar
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray
            }
          }
        });
  
      } else {
        // Crear
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray
            }
          }
        })
      }
  
      
      // Cargar imgs en Cloudinary y en la base de datos
      
      if ( formData.getAll('images') ) {
        const images = await uploadImages(formData.getAll('images') as File[]);
        if ( !images ) {
          throw new Error('No se pudo cargar las imágenes, rollingback');
        }
       
        await prisma.productImage.createMany({
          data: images.map( image => ({
            url: image!,
            productId: product.id,
          }))
        });

      }
      
      return {
        product
      }
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${ product.slug }`);
    revalidatePath(`/products/${ product.slug }`);

    return {
      ok: true,
      product: prismaTx.product,
    }
    
  } catch (error) {
    return {
      ok: false,
      message: 'Revisar los logs, no se pudo actualizar/crear'
    }
  }

}
