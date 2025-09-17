'use client';

import { useRouter } from 'next/navigation';

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="w-full cursor-pointer bg-amber-400 px-10 py-3 text-center
        text-xl font-bold lg:w-auto"
    >
      Volver
    </button>
  );
};

export default GoBackButton;
