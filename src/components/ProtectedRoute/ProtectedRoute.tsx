import { Navigate } from "react-router";

import useAuth from "../../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authState } = useAuth();
  if (!authState.isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
