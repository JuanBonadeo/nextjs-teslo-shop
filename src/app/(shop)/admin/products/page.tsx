export const revalidate = 0

import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import { Title } from '@/components';
import { ProductImage } from '@/components/product/prduct-image/ProductImage';
import { Pagintation } from '@/components/ui/pagination/Pagintation';
import { currencyFormat } from '@/utils/currencyFormat';
import Image from 'next/image';

import Link from 'next/link';



interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Products({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({ page })




  return (
    <>
      <Title title="mantenimiento de productos" />
      <div className="flex justify-end mb-5">
        <Link href='/admin/product/new' className='btn-primary'>
          Nuevo Producto
        </Link>
      </div>
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Titulo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Genero
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Inventario
              </th><th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>


            {
              products.map(product => (
                <tr
                  key={product.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  

                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/product/${product.slug}`}>
                      <ProductImage
                        src={product.ProductImage[0]?.url}
                        alt={product.title}
                        height={80}
                        width={80}
                        className='w-20 h-20 object-cover rounded'
                      />
                    </Link>
                  </td>

                  <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/admin/product/${product.slug}`} className='hover:underline'>
                      {product.title}
                    </Link>
                  </td>

                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap ">
                    { currencyFormat(product.price) }
                  </td>

                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap ">
                    { product.gender }
                  </td>

                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap ">
                    { product.inStock }
                  </td>

                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap ">
                    { product.sizes.join(',') }
                  </td>

                </tr>
              ))
            }


          </tbody>
        </table>
        <Pagintation totalPages={ totalPages } />
      </div>
    </>
  );
}