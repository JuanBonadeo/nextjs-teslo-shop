export const revalidate = 604800  // 7 dias

import { notFound } from 'next/navigation';
import { titleFont } from '@/config/fonts';
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from '@/components';
import { getProductBySlug } from '@/actions/products/get-product-by-slug';
import { StockLabel } from '@/components/product/stock-label/StockLabel';
import { Metadata, ResolvingMetadata } from 'next';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug

  // fetch data
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${ product?.images[1] }`],
    },
  }
}


export default async function Product({ params }: Props) {

  const { slug } = params;
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound();
  }


  return (
    <div className="mt-5 mb-20 grid grid-cols-1 lg:grid-cols-3 gap-3">

      {/* Slideshow */}
      <div className="col-span-1 lg:col-span-2 ">

        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block lg:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden lg:block "
        />


      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5 lg:mt-20" >

        <StockLabel slug={product.slug} />

        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>


        <p className="text-lg mb-5">${product.price}</p>
        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          {product.description}
        </p>

      </div>

    </div>
  );
}