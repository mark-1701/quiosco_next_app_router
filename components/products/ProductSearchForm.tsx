'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { SearchSchema } from '@/src/schema';

const ProductSearchForm = () => {
  // ? Este hook nos permite navegar desde el cliente
  const router = useRouter();

  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get('search')
    };

    const result = SearchSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message);
      });
      return;
    }

    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form className="flex items-center" action={handleSearchForm}>
      <input
        type="text"
        name="search"
        id=""
        placeholder="Buscar Product"
        className="w-full p-2 placeholder-gray-400"
      />

      <input
        type="submit"
        value="Buscar"
        className="cursor-pointer bg-indigo-600 p-2 text-white uppercase"
      />
    </form>
  );
};

export default ProductSearchForm;
