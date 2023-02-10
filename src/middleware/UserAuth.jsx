import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const UserAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/customers/login" replace />;
  }

  return <>{children}</>;
};
