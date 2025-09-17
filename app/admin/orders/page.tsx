'use client';

// es necesario que al usar swr usemos un componente de tipo cliente

import useSWR from 'swr';
import { OrderWithProducts } from '@/src/types';
import OrderCard from '@/components/order/OrderCard';
import Heading from '@/components/ui/Heading';

const OrdersPage = () => {
  const url = `/admin/orders/api`;
  const fetcher = () =>
    fetch(url)
      .then(res => res.json())
      .then(data => data);

  const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    // vuelve a consultar cada x tiempo
    // 1000 para cada segundo
    // 60000 para cada minuto
    refreshInterval: 60000,
    // revalida cuando estamos encima
    revalidateOnFocus: false
  });

  if (isLoading) return <p>Cargando...</p>;

  if (data)
    return (
      <>
        <Heading>Administrar Ordenes</Heading>

        {data.length ? (
          <div
            className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2
              2xl:grid-cols-3"
          >
            {data.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center">No hay Ordenes Pendientes</p>
        )}
      </>
    );
};

export default OrdersPage;
