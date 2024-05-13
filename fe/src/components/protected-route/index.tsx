import { getAuth } from '@/lib/utils';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const { isLoggedIn } = getAuth();

  if (!isLoggedIn) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return <Outlet />;
}
