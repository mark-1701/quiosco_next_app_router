import Link from 'next/link';
import Heading from '@/components/ui/Heading';

const NotFound = () => {
  return (
    <div className="text-center">
      <Heading>Producto No Encontrado</Heading>
      <Link
        href={'/admin/products'}
        className="w-full cursor-pointer bg-amber-400 px-10 py-3 text-center
          text-xl font-bold text-black lg:w-auto"
      >
        Ir a Productos
      </Link>
    </div>
  );
};

export default NotFound;
