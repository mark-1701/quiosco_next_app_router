import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/src/lib/prisma';
import Heading from '@/components/ui/Heading';
import ProductSearchForm from '@/components/products/ProductSearchForm';
import ProductsPagination from '@/components/products/ProductsPagination';
import ProductTable from '@/components/products/ProductsTable';

const productCount = async () => {
  // retorna e el número de productos de la base de datos
  return await prisma.product.count();
};

const getProducts = async (page: number, pageSize: number) => {
  // número de registro en donde empieza el salto
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize, // pagina 10 registros
    skip, // skip: 30; empieza del registro 31 hasta el 40
    include: {
      category: true
    }
  });
  return products;
};

// infiere el dato que retorna getProducts
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

// nextjs inyecta los parametros
const ProductsPage = async ({
  searchParams
}: {
  searchParams: { page: string };
}) => {
  const page = +searchParams.page || 1;

  const pageSize = 10;

  // Redireccionar al inicio si es un número negativo
  if (page < 0) redirect('/admin/products');

  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();

  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData
  ]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={'/admin/products/new'}
          className="w-full cursor-pointer bg-amber-400 px-10 py-3 text-center
            text-xl font-bold lg:w-auto"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable products={products} />
      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  );
};

export default ProductsPage;
