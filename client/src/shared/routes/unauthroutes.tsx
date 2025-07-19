import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@modules/auth/hooks/use-auth";
import { routePath } from "@shared/constants/route";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={routePath.getLogin()} replace />
  );
};

export const PublicRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? (
    <Navigate to={routePath.getMain()} replace />
  ) : (
    <Outlet />
  );
};
