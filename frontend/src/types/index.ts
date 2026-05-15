export type Perfil = "ADMIN" | "VENDEDOR" | "GERENTE";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil;
  ativo?: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  tipo: string;
  expiraEm: number;
  usuario: Usuario;
}

export interface Cliente {
  id: number;
  nome: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  endereco: string;
  createdAt: string;
}

export interface Item {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  ativo: boolean;
  createdAt: string;
}

export interface Venda {
  id: number;
  cliente: { id: number; nome: string };
  vendedor: { id: number; nome: string };
  dataHora: string;
  valorTotal: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
}

export interface Paginavel<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}
