import { useEffect, useState, type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useAppSelector } from 'store/hooks';
import { selectIsAuthorized, selectGetProfileIsLoading } from '../../userSlice';

type GuestGuardProps = {
  children: ReactElement;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const [mounted, setMounted] = useState(false);

  const loading = useAppSelector(selectGetProfileIsLoading);
  const isAuthorized = useAppSelector(selectIsAuthorized);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    if (!isAuthorized && !loading) return <Navigate to={ROUTES.signin} />;
    if (isAuthorized && !loading) return children;
  }

  return null;
}
