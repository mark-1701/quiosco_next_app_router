'use client';

import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { createOrder } from '@/actions/create-order-action';
import { useStore } from '@/src/store';
import { OrderSchema } from '@/src/schema';
import { formatCurrency } from '@/src/utils';
import ProductDetails from './ProductDetails';

const OrderSummary = () => {
  const order = useStore(state => state.order);
  const clearOrder = useStore(state => state.clearOrder);
  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    };

    // ? Validación de zod en el cliente
    const result = OrderSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message);
      });

      return;
    }

    const response = await createOrder(data);

    // ? Mostra toast de error si el servidor encuentra errores
    if (response?.errors) {
      response.errors.forEach(issue => {
        toast.error(issue.message);
      });
    }

    toast.success('Pedido Realizado Correctamente');
    clearOrder();
  };

  return (
    <aside className="p-5 md:w-64 lg:h-screen lg:w-96 lg:overflow-y-scroll">
      <h1 className="text-center text-4xl font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="my-10 text-center">Mi pedido esta vacío</p>
      ) : (
        <div className="mt-5">
          {order.map(item => (
            <ProductDetails key={item.id} item={item} />
          ))}
        </div>
      )}

      <p className="mt-20 text-center text-2xl">
        Total a pagar: {''}
        <span className="font-bold">{formatCurrency(total)}</span>
      </p>

      <form className="mt-10 w-full space-y-5" action={handleCreateOrder}>
        <input
          type="text"
          name="name"
          id=""
          placeholder="Tu Nombre"
          className="w-full border border-gray-100 bg-white p-2"
        />
        <input
          type="submit"
          className="w-full cursor-pointer rounded bg-black py-2 text-center
            text-white uppercase"
          value="Confirmar Pedido"
        />
      </form>
    </aside>
  );
};

export default OrderSummary;
