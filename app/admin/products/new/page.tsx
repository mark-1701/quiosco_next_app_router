import AddProductForm from '@/components/products/AddProductForm';
import ProductForm from '@/components/products/ProductForm';
import Heading from '@/components/ui/Heading';

const CreateProductPage = () => {
  return (
    <>
      <Heading>Nuevo Producto</Heading>
      {/* Composición de componentes cliente-servidor */}

      {/* componente cliente */}
      <AddProductForm>
        {/* componente servidor */}
        <ProductForm />
      </AddProductForm>
    </>
  );
};

export default CreateProductPage;
