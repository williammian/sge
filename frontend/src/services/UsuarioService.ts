import api from "./api";
import type { Usuario, Paginavel } from "../types";

export async function listarUsuarios(page = 0, size = 20): Promise<Paginavel<Usuario>> {
  const { data } = await api.get("/api/usuarios", { params: { page, size } });
  return data;
}

export async function buscarUsuario(id: number): Promise<Usuario> {
  const { data } = await api.get(`/api/usuarios/${id}`);
  return data;
}

export async function criarUsuario(payload: {
  nome: string;
  email: string;
  senha: string;
  perfil: string;
}): Promise<Usuario> {
  const { data } = await api.post("/api/usuarios", payload);
  return data;
}

export async function atualizarUsuario(
  id: number,
  payload: { nome?: string; email?: string; senha?: string; perfil?: string },
): Promise<Usuario> {
  const { data } = await api.put(`/api/usuarios/${id}`, payload);
  return data;
}

export async function alterarStatusUsuario(
  id: number,
  ativo: boolean,
): Promise<Usuario> {
  const { data } = await api.patch(`/api/usuarios/${id}/status`, { ativo });
  return data;
}
