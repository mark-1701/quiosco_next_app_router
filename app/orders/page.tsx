'use client';

import useSWR from 'swr';
import { OrderWithProducts } from '@/src/types';
import LatestOrderItem from '@/components/order/LatestOrderItem';
import Logo from '@/components/ui/Logo';

const OrdersPage = () => {
  const url = `/orders/api`;
  const fetcher = () =>
    fetch(url)
      .then(res => res.json())
      .then(data => data);

  const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false
  });

  if (isLoading) return <p>Cargando...</p>;

  if (data)
    return (
      <>
        <h1 className="mt-20 text-center text-6xl font-black">
          Ordenes Listas
        </h1>

        <Logo />

        {data.length ? (
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-5">
            {data.map(order => (
              <LatestOrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="my-10 text-center">No hay ordenes listas</p>
        )}
      </>
    );
};

export default OrdersPage;
