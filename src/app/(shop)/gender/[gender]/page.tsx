import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import { ProductGrid, Title } from '@/components';
import { Pagintation } from '@/components/ui/pagination/Pagintation';
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';



interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string
  }
}

export const revalidate = 60

export default async function Genders({ params, searchParams }: Props) {

  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender })

  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }




  const labels: Record<string, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }


  return (
    <>
      <Title
        title={`Artículos de ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagintation totalPages={ totalPages } />

    </>
  );
}