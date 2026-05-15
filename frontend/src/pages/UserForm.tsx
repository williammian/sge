import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  criarUsuario,
  atualizarUsuario,
  buscarUsuario,
} from "../services/UsuarioService";
import { showToast } from "../components/ui/Toast";

export default function UserForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("VENDEDOR");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (!id) return;
    buscarUsuario(Number(id))
      .then((u) => {
        setNome(u.nome);
        setEmail(u.email);
        setPerfil(u.perfil);
      })
      .catch(() => navigate("/usuarios"))
      .finally(() => setFetching(false));
  }, [id, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);
    try {
      if (isEdit) {
        const payload: Record<string, string> = { nome, email, perfil };
        if (senha) payload.senha = senha;
        await atualizarUsuario(Number(id), payload);
      } else {
        await criarUsuario({ nome, email, senha, perfil });
      }
      showToast("Usuário salvo", "success");
      navigate("/usuarios");
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { error?: string; details?: string[] } } };
      const data = axiosError?.response?.data;
      setError(data?.error ?? "Erro ao salvar usuário");
      if (data?.details) {
        const fieldMap: Record<string, string> = {};
        data.details.forEach((msg: string) => {
          if (msg.includes("nome")) fieldMap.nome = msg;
          if (msg.includes("email")) fieldMap.email = msg;
          if (msg.includes("senha") || msg.includes("8")) fieldMap.senha = msg;
        });
        setFieldErrors(fieldMap);
      }
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="animate-pulse flex flex-col gap-4 max-w-md">
        <div className="h-6 bg-secondary-200 rounded w-40" />
        <div className="h-10 bg-secondary-200 rounded" />
        <div className="h-10 bg-secondary-200 rounded" />
        <div className="h-10 bg-secondary-200 rounded" />
        <div className="h-10 bg-secondary-200 rounded" />
        <div className="h-10 bg-secondary-200 rounded w-24" />
      </div>
    );
  }

  return (
    <div className="max-w-md">
      <h2 className="text-lg font-semibold text-secondary-800 mb-4">
        {isEdit ? "Editar Usuário" : "Novo Usuário"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p className="text-danger-500 text-sm bg-danger-50 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <div>
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="border border-secondary-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
          />
          {fieldErrors.nome && (
            <p className="text-danger-500 text-xs mt-1">{fieldErrors.nome}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-secondary-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
          />
          {fieldErrors.email && (
            <p className="text-danger-500 text-xs mt-1">{fieldErrors.email}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder={isEdit ? "Nova senha (deixar vazio para manter)" : "Senha"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required={!isEdit}
            minLength={8}
            className="border border-secondary-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
          />
          {fieldErrors.senha && (
            <p className="text-danger-500 text-xs mt-1">{fieldErrors.senha}</p>
          )}
        </div>
        <select
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
          className="border border-secondary-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="ADMIN">Admin</option>
          <option value="VENDEDOR">Vendedor</option>
          <option value="GERENTE">Gerente</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-4 py-2 rounded text-sm hover:bg-primary-500 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/usuarios")}
            className="bg-secondary-200 text-secondary-700 px-4 py-2 rounded text-sm hover:bg-secondary-300 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
