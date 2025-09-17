import { useMemo } from 'react';
import { XCircleIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { OrderItem } from '@/src/types';
import { useStore } from '@/src/store';
import { formatCurrency } from '@/src/utils';

type ProductDetailsProps = {
  item: OrderItem;
};

const MIN_ITEMS = 1;
const MAX_ITEMS = 10;

const ProductDetails = ({ item }: ProductDetailsProps) => {
  const increaseQuantity = useStore(state => state.increaseQuantity);
  const removeItem = useStore(state => state.removeItem);
  const decreaseQuantity = useStore(state => state.decreaseQuantity);
  const disableDecreaseButton = useMemo(
    () => item.quantity === MIN_ITEMS,
    [item]
  );
  const disableIncreaseButton = useMemo(
    () => item.quantity === MAX_ITEMS,
    [item]
  );

  return (
    <div className="space-y-1 border-t border-gray-200 bg-white p-4 shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => removeItem(item.id)}>
            <XCircleIcon className="h-8 w-8 text-red-600" />
          </button>
        </div>
        <p className="text-2xl font-black text-amber-500">
          {formatCurrency(item.price)}
        </p>
        <div className="flex w-fit gap-5 rounded-lg bg-gray-100 px-10 py-2">
          <button
            type="button"
            disabled={disableDecreaseButton}
            className="disabled:opacity-20"
            onClick={() => decreaseQuantity(item.id)}
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black">{item.quantity}</p>

          <button
            type="button"
            disabled={disableIncreaseButton}
            className="disabled:opacity-20"
            onClick={() => increaseQuantity(item.id)}
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {''}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
