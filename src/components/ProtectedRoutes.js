import { useContext } from 'react';
import { Navigate, Outlet, Routes, Route } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export function ProtectedRoutes(props) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return isLoggedIn ? <Outlet /> : <Navigate to={props.redirectTo} />;
}

export function UserProtectedRoutes(props) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return isLoggedIn ? <Outlet /> : <Navigate to={props.redirectTo} />;
}
