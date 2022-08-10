import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Preloader from './Preloader.js';

export const ProtectedRoutes = (props) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  if (isLoggedIn === null) {
    // hide login screen on first page load
    return <Preloader preloaderIsVisible={props.preloaderIsVisible} />;
  } else if (isLoggedIn === false) {
    return <Navigate to={props.redirectTo} />;
  }

  return <Outlet />;
  // Outlet = children
};
