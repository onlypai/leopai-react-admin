import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const index = memo(() => {
  return (
    <main className="overflow-y-auto mx-auto w-full p-4">
      <Outlet />
    </main>
  );
});

export default index;
