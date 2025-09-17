import Image from 'next/image';

const Logo = () => {
  return (
    <div className="mt-5 flex justify-center">
      <div className="relative h-40 w-40">
        <Image fill alt="Logotipo Fresh Coffe" src="/logo.svg" />
      </div>
    </div>
  );
};

export default Logo;
