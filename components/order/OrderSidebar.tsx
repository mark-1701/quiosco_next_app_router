import { prisma } from '@/src/lib/prisma';
import { Category } from '@/app/generated/prisma';
import CategoryIcon from '../ui/CategoryIcon';
import Logo from '../ui/Logo';

async function getCategories() {
  return await prisma.category.findMany();
}

const OrderSidebar = async () => {
  // Nueva versión de Next.js permite hacer esto
  const categories: Category[] = await getCategories();

  return (
    <aside className="bg-white md:h-screen md:w-72">
      <Logo />
      <nav className="mt-10">
        {categories.map(category => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
};

export default OrderSidebar;
