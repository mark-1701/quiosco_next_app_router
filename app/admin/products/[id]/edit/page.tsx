import { prisma } from '@/src/lib/prisma';
import { notFound } from 'next/navigation';
import EditProductForm from '@/components/products/EditProductForm';
import ProductForm from '@/components/products/ProductForm';
import GoBackButton from '@/components/ui/GoBackButton';
import Heading from '@/components/ui/Heading';

const getProductById = async (id: number) => {
  // solo trae un registro, el primero
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  });

  if (!product) {
    // va a invocar al archivo not-found de este segmento
    notFound();
  }

  return product;
};

const EditProductsPage = async ({ params }: { params: { id: string } }) => {
  const product = await getProductById(+params.id);

  return (
    <>
      <Heading>Editar Producto: {product.name}</Heading>

      <GoBackButton />

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
};

export default EditProductsPage;
