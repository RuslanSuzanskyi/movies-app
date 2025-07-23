import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

export default function PrivateRoute() {
  const token = useAppSelector(state => state.auth.token);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
