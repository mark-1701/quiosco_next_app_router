'use client';

import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { updateProduct } from '@/actions/update-product-action';
import { ProductSchema } from '@/src/schema';

const EditProductForm = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const params = useParams();
  const id = +params.id!;

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      price: formData.get('price'),
      categoryId: formData.get('categoryId'),
      image: formData.get('image')
    };

    const result = ProductSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await updateProduct(result.data, id);
    if (response?.errors) {
      response.errors.forEach(issue => {
        toast.error(issue.message);
      });
      return;
    }

    toast.success('Producto Actualizado Correctamente');
    router.push('/admin/products');
  };

  return (
    <div
      className="mx-auto mt-10 max-w-3xl rounded-md bg-white px-5 py-10
        shadow-md"
    >
      <form className="space-y-5" action={handleSubmit}>
        {/* este componente puede ser de servidor */}
        {children}

        <input
          type="submit"
          value="Guardar Cambios"
          className="mt-5 w-full cursor-pointer bg-indigo-600 p-3 font-bold
            text-white uppercase hover:bg-indigo-800"
        />
      </form>
    </div>
  );
};

export default EditProductForm;
