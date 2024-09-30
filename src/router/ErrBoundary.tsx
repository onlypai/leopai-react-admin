import { memo, Suspense, useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux';

import ErrBoundaryFallback from '@/views/error/ErrBoundaryFallback';
import Loading from '@/components/Loading';
import { shallowEqual } from 'react-redux';

type Props = {
  children: React.ReactNode;
};
const ErrBoundary = memo(({ children }: Props) => {
  const { token } = useAppSelector((state) => state.user, shallowEqual);
  const navigate = useNavigate();

  const redirect = useCallback(() => {
    if (!token.accessToken) {
      navigate('/login', { replace: true });
    }
  }, [token.accessToken, navigate]);

  //鉴权
  useEffect(() => {
    redirect();
  }, [redirect]);

  return (
    <ErrorBoundary FallbackComponent={ErrBoundaryFallback}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
});

export default ErrBoundary;
