import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-lg font-semibold text-secondary-800 mb-2">
        Dashboard
      </h2>
      <p className="text-secondary-500 text-sm">
        Bem-vindo, <span className="font-medium">{user?.nome}</span>. Selecione
        um módulo no menu ao lado.
      </p>
    </div>
  );
}
