import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { showToast } from "../ui/Toast";

export default function AdminRoute() {
  const { user } = useAuth();

  if (user?.perfil !== "ADMIN") {
    showToast("Acesso negado. Apenas administradores.", "error");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
