import { prisma } from '@/src/lib/prisma';
import ProductSearchForm from '@/components/products/ProductSearchForm';
import ProductTable from '@/components/products/ProductsTable';
import Heading from '@/components/ui/Heading';

const searchProducts = async (searchTerm: string) => {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive' // ignora mayusculas y minusculas
      }
    },
    include: {
      category: true
    }
  });
  return products;
};

const SearchPage = async ({
  searchParams
}: {
  searchParams: Promise<{ search: string }>; // puede ser undefined si no viene
}) => {
  const { search } = await searchParams;
  const products = await searchProducts(search);

  return (
    <>
      <Heading>Resultados de Búsqueda: {search}</Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
        <ProductSearchForm />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg">No hay Resultados</p>
      )}
    </>
  );
};

export default SearchPage;
