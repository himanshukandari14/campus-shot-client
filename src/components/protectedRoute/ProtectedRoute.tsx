
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.auth.user); // Get the user from Redux state

  return user ? element : <Navigate to="/" replace />; // Redirect to the login page if not authenticated
};

export default ProtectedRoute;
