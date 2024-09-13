import { memo } from 'react';

import type { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
const index = memo(({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();
  const goHome = () => {
    resetErrorBoundary();
    navigate('/');
  };
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button className="rounded-md p-4" onClick={goHome}>
        Go to Home
      </button>
    </div>
  );
});

export default index;
