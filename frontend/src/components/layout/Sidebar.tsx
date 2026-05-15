import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/usuarios", label: "Usuários", adminOnly: true },
  { to: "/clientes", label: "Clientes" },
  { to: "/itens", label: "Itens" },
  { to: "/vendas", label: "Vendas" },
  { to: "/perfil", label: "Meu Perfil" },
];

export default function Sidebar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const visibleLinks = links.filter(
    (l) => !l.adminOnly || user?.perfil === "ADMIN",
  );

  return (
    <>
      <button
        className="md:hidden fixed top-3 left-3 z-50 bg-primary-700 text-white p-2 rounded cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </button>

      <aside
        className={`bg-secondary-800 text-white w-60 shrink-0 pt-16 md:pt-4 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-40`}
      >
        <nav className="flex flex-col gap-1 p-4">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded text-sm ${
                  isActive
                    ? "bg-primary-600 text-white"
                    : "text-secondary-300 hover:bg-secondary-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
