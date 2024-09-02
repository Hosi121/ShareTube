import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  
  if (!currentUser) {
    // ログインしていない場合はログインページにリダイレクト
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default PrivateRoute;
