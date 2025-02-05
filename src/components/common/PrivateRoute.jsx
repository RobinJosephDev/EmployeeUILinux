// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = Boolean(localStorage.getItem('token')); // Adjust based on your auth method

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
