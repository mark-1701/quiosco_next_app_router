import { prisma } from '@/src/lib/prisma';

// API que devuelve las ordenes
export async function GET() {
  const orders = await prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  });

  return Response.json(orders);
}
