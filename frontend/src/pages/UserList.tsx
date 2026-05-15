import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listarUsuarios, alterarStatusUsuario } from "../services/UsuarioService";
import { showToast } from "../components/ui/Toast";
import type { Usuario } from "../types";

export default function UserList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function carregar(p: number) {
    setLoading(true);
    listarUsuarios(p)
      .then((res) => {
        setUsuarios(res.content);
        setPage(p);
        setTotalPages(res.totalPages);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => carregar(0), []);

  async function toggleStatus(user: Usuario) {
    const confirmado = window.confirm(
      `${user.ativo ? "Desativar" : "Ativar"} usuário ${user.nome}?`,
    );
    if (!confirmado) return;
    try {
      await alterarStatusUsuario(user.id, !user.ativo);
      showToast(
        `Usuário ${user.ativo ? "desativado" : "ativado"} com sucesso`,
        "success",
      );
      carregar(page);
    } catch {
      showToast("Erro ao alterar status", "error");
    }
  }

  const perfilBadge: Record<string, string> = {
    ADMIN: "bg-danger-100 text-danger-700",
    VENDEDOR: "bg-info-100 text-info-700",
    GERENTE: "bg-warning-100 text-warning-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-secondary-800">Usuários</h2>
        <Link
          to="/usuarios/novo"
          className="bg-primary-600 text-white px-4 py-2 rounded text-sm hover:bg-primary-500"
        >
          Novo Usuário
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-4 bg-secondary-200 rounded w-1/4" />
              <div className="h-4 bg-secondary-200 rounded w-1/3" />
              <div className="h-4 bg-secondary-200 rounded w-1/6" />
              <div className="h-4 bg-secondary-200 rounded w-1/6" />
            </div>
          ))}
        </div>
      ) : usuarios.length === 0 ? (
        <p className="text-secondary-500">Nenhum usuário encontrado</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary-100 text-secondary-600 text-left">
                  <th className="px-4 py-2">Nome</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Perfil</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} className="border-t border-secondary-200">
                    <td className="px-4 py-2">{u.nome}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          perfilBadge[u.perfil] || ""
                        }`}
                      >
                        {u.perfil}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          u.ativo
                            ? "bg-success-100 text-success-700"
                            : "bg-secondary-200 text-secondary-600"
                        }`}
                      >
                        {u.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => navigate(`/usuarios/${u.id}/editar`)}
                        className="text-primary-600 hover:underline text-xs cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => toggleStatus(u)}
                        className={`hover:underline text-xs cursor-pointer ${
                          u.ativo ? "text-danger-600" : "text-success-600"
                        }`}
                      >
                        {u.ativo ? "Desativar" : "Ativar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              disabled={page === 0}
              onClick={() => carregar(page - 1)}
              className="px-3 py-1 rounded text-sm bg-secondary-200 disabled:opacity-40 cursor-pointer"
            >
              Anterior
            </button>
            <span className="text-sm text-secondary-500">
              {page + 1} de {totalPages}
            </span>
            <button
              disabled={page + 1 >= totalPages}
              onClick={() => carregar(page + 1)}
              className="px-3 py-1 rounded text-sm bg-secondary-200 disabled:opacity-40 cursor-pointer"
            >
              Próximo
            </button>
          </div>
        </>
      )}
    </div>
  );
}
