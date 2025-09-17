import { Order, OrderProducts, Product } from '@prisma/client';
import z from 'zod';

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
  quantity: number;
  subtotal: number;
};

export type OrderWithProducts = Order & {
  orderProducts: (OrderProducts & {
    product: Product;
  })[];
};

export const OrderIdSchema = z.object({
  // convertir de string a número
  // si la validación de refine da false, se va a lanzar un error
  orderId: z
    .string()
    .transform(value => parseInt(value))
    .refine(value => value > 0, { message: 'Hay errores' })
});
