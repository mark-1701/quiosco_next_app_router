import AdminSidebar from '@/components/admin/AdminSidebar';
import ToastNotification from '@/components/ui/ToastNotification';

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="md:flex">
        <aside className="bg-white md:h-screen md:w-72">
          <AdminSidebar />
        </aside>

        <main
          className="bg-gray-100 p-5 md:h-screen md:flex-1 md:overflow-y-scroll"
        >
          {children}
        </main>
      </div>

      <ToastNotification />
    </>
  );
}
