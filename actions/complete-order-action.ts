/*
  Actions

  aunque sea un componente de tipo servidor, siempre tenemos que usar la 
  directiva de 'use server'. si el action este directamente en el componente, 
  la directiva la colocamos en la primera línea de nuestra función 
*/

'use server';

import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';
import { OrderIdSchema } from '@/src/types';

export const completeOrder = async (formData: FormData) => {
  // si estuviera directamente en el componente, colocamos aquí la directiva
  // 'use server'

  const data = {
    orderId: formData.get('order_id')
  };

  const result = OrderIdSchema.safeParse(data);

  if (result.success) {
    try {
      await prisma.order.update({
        where: {
          id: result.data.orderId
        },
        data: {
          status: true,
          orderReadyAT: new Date(Date.now())
        }
      });

      // revalida el path, vuelve a cargar todos los elementos en cache
      // también existe diferentes formas de revalidar, incluso con temporizador 
      // refetch
      revalidatePath('/admin/orders');
    } catch (error) {
      console.log(error);
    }
  }
};
