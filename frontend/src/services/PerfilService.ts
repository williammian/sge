import api from "./api";
import type { Usuario } from "../types";

export async function atualizarPerfil(payload: {
  nome?: string;
  email?: string;
}): Promise<Usuario> {
  const { data } = await api.put("/api/auth/me", payload);
  return data;
}

export async function alterarSenha(payload: {
  senhaAtual: string;
  novaSenha: string;
}): Promise<void> {
  await api.put("/api/auth/me/senha", payload);
}
