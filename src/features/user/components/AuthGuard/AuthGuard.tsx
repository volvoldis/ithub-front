import { useState, useEffect, type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useAppSelector } from 'store/hooks';
import { selectIsAuthorized, selectGetProfileIsLoading } from '../../userSlice';

type AuthGuardProps = {
  children: ReactElement;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const [mounted, setMounted] = useState(false);

  const loading = useAppSelector(selectGetProfileIsLoading);
  const isAuthorized = useAppSelector(selectIsAuthorized);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    if (isAuthorized) return <Navigate to={ROUTES.profile} />;

    if (!isAuthorized && !loading) return children;
  }

  return null;
}
