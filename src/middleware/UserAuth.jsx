import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const UserAuth = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token');
  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  });

  return <>{children}</>;
};
