import { prisma } from '@/src/lib/prisma';
import ProductCard from '@/components/products/ProductCard';
import Heading from '@/components/ui/Heading';
import { Product } from '@prisma/client';

async function getProducts(category: string) {
  // selecciona todos ls productos que pertenecen a esa categoría
  // es una forma especial para no hacer innerjoins
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  });

  return products;
}

/*
  Params solo esta disponible en los siguientes archivos:
  - layout.tsx
  - page.tsx
  - route.tsx
  - gerateMetadata
*/

const OrderPage = async ({
  params
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const products: Product[] = await getProducts(category);

  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuación</Heading>

      <div
        className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2
          xl:grid-cols-3 2xl:grid-cols-4"
      >
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default OrderPage;
