import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { memo } from "react";

const ProtectedRoute = memo(() => {
  const user = useSelector((state) => state.auth.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
});

export default ProtectedRoute;
