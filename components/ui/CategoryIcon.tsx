'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@prisma/client';
import { useParams } from 'next/navigation';

type CategoryIconProps = {
  category: Category;
};

const CategoryIcon = ({ category }: CategoryIconProps) => {
  // hook de nextjs para obtener los parametros
  // solo puede ser utilizado por componentes de tipo cliente
  const params = useParams<{ category: string }>();

  return (
    <div
      className={` ${category.slug === params.category ? 'bg-amber-400' : ''}
        flex w-full items-center gap-4 border-t border-gray-200 p-3
        last-of-type:border-b`}
    >
      <div
        // necesario posición relativa para que la imagen absoluta se anche
        className="relative h-16 w-16"
      >
        {/* componente de Next.js para optimizar imágenes */}
        <Image
          // llena todo el espacio posible
          fill
          src={`/icon_${category.slug}.svg`}
          alt="Imagen Categoria"
        />
      </div>

      <Link className="text-xl font-bold" href={`/order/${category.slug}`}>
        {category.name}
      </Link>
    </div>
  );
};

export default CategoryIcon;
