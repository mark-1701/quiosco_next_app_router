import { prisma } from '@/src/lib/prisma';
import { Product } from '@/app/generated/prisma';
import ProductCard from '@/components/products/ProductCard';
import Heading from '@/components/ui/Heading';

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

const OrderPage = async ({ params }: { params: { category: string } }) => {
  const products: Product[] = await getProducts(params.category);

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
