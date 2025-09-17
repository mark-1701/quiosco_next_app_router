'use client';

import { Product } from '@prisma/client';
import { useStore } from '@/src/store';

type AddProductButtonProps = {
  product: Product;
};

const AddProductButton = ({ product }: AddProductButtonProps) => {
  const addToOrder = useStore(state => state.addToOrder);

  return (
    <button
      type="button"
      className="mt-5 w-full cursor-pointer bg-indigo-600 p-3 font-bold
        text-white uppercase hover:bg-indigo-800"
      onClick={() => addToOrder(product)}
    >
      Agregar
    </button>
  );
};

export default AddProductButton;
