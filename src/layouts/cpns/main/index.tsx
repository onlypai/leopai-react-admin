import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const index = memo(() => {
  return (
    <div>
      <Outlet />
    </div>
  );
});

export default index;
