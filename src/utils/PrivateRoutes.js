import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = ({ token }) => {
  // TODO: get token from api
  return token ? <Outlet /> : <Navigate to='/sign-in' />;
  // `outlet` is treated as `children` in react-router 6
};
