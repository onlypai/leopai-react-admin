import { memo } from 'react';

import type { FallbackProps } from 'react-error-boundary';
const index = memo(({ error, resetErrorBoundary }: FallbackProps) => {
  console.log(resetErrorBoundary);

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
});

export default index;
