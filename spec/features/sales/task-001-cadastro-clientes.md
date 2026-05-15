# TASK-001: Cadastro de Clientes

## Objetivo
Implementar CRUD completo de clientes.

## Regras
- RN-05: CPF/CNPJ único
- RN-06: Qualquer perfil autenticado pode cadastrar clientes

## Dependências
- TASK-002 de auth (autenticação)

## Fluxo
1. Usuário acessa "Clientes" no menu
2. Visualiza listagem com paginação
3. Clica em "Novo Cliente"
4. Preenche formulário (nome, CPF/CNPJ, telefone, email, endereço)
5. Sistema valida e salva
6. Listagem é atualizada

## Backend

### Endpoints

| Método | Path | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/api/clientes` | Bearer | Criar cliente |
| GET | `/api/clientes` | Bearer | Listar (paginado) |
| GET | `/api/clientes/{id}` | Bearer | Buscar por ID |
| PUT | `/api/clientes/{id}` | Bearer | Atualizar cliente |

### Payloads

**POST /api/clientes — Request**
```json
{
  "nome": "string",
  "cpfCnpj": "string",
  "telefone": "string",
  "email": "string",
  "endereco": "string"
}
```

**POST /api/clientes — Response (201)**
```json
{
  "id": 1,
  "nome": "string",
  "cpfCnpj": "string",
  "telefone": "string",
  "email": "string",
  "endereco": "string",
  "createdAt": "2026-05-13T10:00:00"
}
```

## Frontend

### Telas
- **/clientes** — Lista paginada com busca por nome/CPF
- **/clientes/novo** — Formulário de criação
- **/clientes/:id/editar** — Formulário de edição

### Estados
| Estado | Comportamento |
|--------|---------------|
| Carregando | Skeleton |
| Vazio | "Nenhum cliente encontrado" |
| Erro | Toast com erro |
| Validação | Erro inline CPF/CNPJ duplicado, formato inválido |

### Critérios de Aceite
1. [ ] CRUD completo acessível por qualquer perfil autenticado
2. [ ] CPF/CNPJ duplicado retorna erro amigável
3. [ ] Busca por nome ou CPF na listagem
4. [ ] Cliente pode ser vinculado a uma venda (autocomplete/busca na tela de venda)

## Fora do Escopo
- Validação de CPF/CNPJ (apenas uniqueness)
- Importação em lote
