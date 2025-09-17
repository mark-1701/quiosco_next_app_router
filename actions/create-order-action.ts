'use server';

import { prisma } from '@/src/lib/prisma';
import { OrderSchema } from '@/src/schema';

// los actions siempre se deben de ejecutar en un compoente de tipo servidor

export async function createOrder(data: unknown) {
  // zod funciona tanto en el cliente como en el servidor
  const result = OrderSchema.safeParse(data);

  if (!result.success) {
    /*
      se retorna el error porque el servidor no es capaz de renderizar
      componentes del tostify
    */
    return {
      errors: result.error.issues
    };
  }

  try {
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        // inyecta automaticamente los registros a OrderProducts,
        // solo se le pasa el productId y quantity porque son datos importantes
        // orderId lo inyecta automaticamente
        orderProducts: {
          create: result.data.order.map(product => ({
            productId: product.id,
            quantity: product.quantity
          }))
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
