'use client';

// De aquí en adelante, todo es cliente
// Los componentes hijos serán componentes de cliente
import Enlace from './Enlace';

const Sidebar = () => {
  console.log('desde el sidebar');

  return (
    <div>
      Sidebar
      <Enlace />
    </div>
  );
};

export default Sidebar;
