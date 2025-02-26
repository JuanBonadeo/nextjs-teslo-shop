import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getCategories } from "@/actions/categories/get-categories";

interface Props {
  params: {
    slug: string
  }
}




export default async function ProductAdminPage({ params }: Props) {

  const { slug } = params

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])

  if (!product && slug !== 'new') {
    redirect('/admin/products')
  }
  const title = (slug === 'new') ? 'Nuevo Producto' : 'Editar producto'
  return (
    <div>
      <Title title={title} />

      <ProductForm product={product ?? {} } categories={categories} />
    </div>
  );
}