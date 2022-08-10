import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = ({ loggedIn, redirectTo }) => {
  return loggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
  // `Outlet` is treated as `children` in react-router 6
};
