import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { atualizarPerfil, alterarSenha } from "../services/PerfilService";
import { showToast } from "../components/ui/Toast";

export default function Perfil() {
  const { user } = useAuth();

  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePerfil(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await atualizarPerfil({ nome, email });
      localStorage.setItem("@sge:user", JSON.stringify(updated));
      showToast("Perfil atualizado", "success");
    } catch {
      showToast("Erro ao atualizar perfil", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleSenha(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await alterarSenha({ senhaAtual, novaSenha });
      showToast("Senha alterada com sucesso", "success");
      setSenhaAtual("");
      setNovaSenha("");
    } catch (err: unknown) {
      const serverError =
        err && typeof err === "object" && "response" in err
          ? (err as { response: { data: { error: string } } }).response.data
              .error
          : "Senha atual inválida";
      showToast(serverError, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md flex flex-col gap-8">
      <section>
        <h2 className="text-lg font-semibold text-secondary-800 mb-4">
          Meu Perfil
        </h2>

        <form onSubmit={handlePerfil} className="flex flex-col gap-4">
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="border border-secondary-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-secondary-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p className="text-xs text-secondary-500">
            Perfil: <strong>{user?.perfil}</strong> (somente leitura)
          </p>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-4 py-2 rounded text-sm hover:bg-primary-500 disabled:opacity-50 cursor-pointer self-start"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </section>

      <section>
        <h3 className="text-md font-semibold text-secondary-800 mb-4">
          Alterar Senha
        </h3>
        <form onSubmit={handleSenha} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Senha atual"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            required
            className="border border-secondary-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="password"
            placeholder="Nova senha (mín. 8 caracteres)"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
            minLength={8}
            className="border border-secondary-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-4 py-2 rounded text-sm hover:bg-primary-500 disabled:opacity-50 cursor-pointer self-start"
          >
            {loading ? "Alterando..." : "Alterar Senha"}
          </button>
        </form>
      </section>
    </div>
  );
}
