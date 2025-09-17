import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/src/lib/prisma';
import Heading from '@/components/ui/Heading';
import ProductSearchForm from '@/components/products/ProductSearchForm';
import ProductsPagination from '@/components/products/ProductsPagination';
import ProductTable from '@/components/products/ProductsTable';

const productCount = async () => {
  return await prisma.product.count();
};

const getProducts = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  });

  return products;
};

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

type ProductsPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const pageParam = searchParams?.page;
  const page = pageParam
    ? parseInt(Array.isArray(pageParam) ? pageParam[0] : pageParam, 10)
    : 1;

  const pageSize = 10;

  if (page < 0) redirect('/admin/products');

  const [products, totalProducts] = await Promise.all([
    getProducts(page, pageSize),
    productCount()
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
