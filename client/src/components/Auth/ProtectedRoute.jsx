import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Simple protected route based on localStorage flag
// Replace with proper context/token based authentication check
const useAuth = () => {
  const isAdmin = localStorage.getItem('isAdminAuthenticated') === 'true';
  // In a real app, you'd check a token, context state, etc.
  return { isAdmin }; 
};

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // Redirect them to the /admin/login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/admin/login" replace />;
  }

  return children ? children : <Outlet />; // Render children or Outlet for nested routes
};

export default ProtectedRoute;
