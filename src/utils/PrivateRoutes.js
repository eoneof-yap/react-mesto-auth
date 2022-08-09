import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = (props) => {
  return props.loggedIn ? <Outlet /> : <Navigate to={props.redirectTo} />;
  // `Outlet` is treated as `children` in react-router 6
};
