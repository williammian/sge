import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-primary-700 text-white px-6 py-3 flex items-center justify-between">
      <h1 className="text-xl font-bold">SGE</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">{user?.nome}</span>
        <button
          onClick={signOut}
          className="text-sm bg-primary-600 hover:bg-primary-500 px-3 py-1 rounded cursor-pointer"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
