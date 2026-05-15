import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AdminRoute from "./components/layout/AdminRoute";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import Perfil from "./pages/Perfil";
import Toast from "./components/ui/Toast";

export default function App() {
  return (
    <AuthProvider>
      <Toast />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route element={<AdminRoute />}>
              <Route path="/usuarios" element={<UserList />} />
              <Route path="/usuarios/novo" element={<UserForm />} />
              <Route path="/usuarios/:id/editar" element={<UserForm />} />
            </Route>
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
