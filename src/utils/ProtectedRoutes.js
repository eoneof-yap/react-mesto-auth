import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export const ProtectedRoutes = ({ redirectTo }) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
  // `Outlet` is treated as `children` in react-router 6
};
