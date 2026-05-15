# TASK-001: Cadastro de Usuários

## Objetivo
Implementar CRUD completo de usuários do sistema, permitindo criar, listar, editar e desativar usuários.

## Regras
- RN-01: Apenas ADMIN pode criar/editar/desativar usuários
- RN-02: Email deve ser único
- RN-03: Desativar não afeta vendas existentes
- RN-04: Senha mínima 8 caracteres

## Dependências
- Nenhuma (primeira task do módulo)

## Fluxo
1. ADMIN acessa "Usuários" no menu
2. Visualiza listagem com paginação
3. Clica em "Novo Usuário"
4. Preenche formulário (nome, email, senha, perfil)
5. Sistema valida e salva
6. Listagem é atualizada

## Backend

### Endpoints

| Método | Path | Auth | Perfil | Descrição |
|--------|------|------|--------|-----------|
| POST | `/api/usuarios` | Bearer | ADMIN | Criar usuário |
| GET | `/api/usuarios` | Bearer | ADMIN | Listar usuários (paginado) |
| GET | `/api/usuarios/{id}` | Bearer | ADMIN | Buscar por ID |
| PUT | `/api/usuarios/{id}` | Bearer | ADMIN | Atualizar usuário |
| PATCH | `/api/usuarios/{id}/status` | Bearer | ADMIN | Ativar/desativar |

### Payloads

**POST /api/usuarios — Request**
```json
{
  "nome": "string",
  "email": "string",
  "senha": "string",
  "perfil": "ADMIN | VENDEDOR | GERENTE"
}
```

**POST /api/usuarios — Response (201)**
```json
{
  "id": 1,
  "nome": "string",
  "email": "string",
  "perfil": "VENDEDOR",
  "ativo": true,
  "createdAt": "2026-05-13T10:00:00"
}
```

**PUT /api/usuarios/{id} — Request** (campos opcionais, exceto nome)
```json
{
  "nome": "string",
  "email": "string",
  "senha": "string (opcional)",
  "perfil": "ADMIN | VENDEDOR | GERENTE"
}
```

**PATCH /api/usuarios/{id}/status — Request**
```json
{
  "ativo": false
}
```

**GET /api/usuarios?page=0&size=20 — Response**
```json
{
  "content": [ { "id": 1, "nome": "...", "email": "...", "perfil": "...", "ativo": true } ],
  "totalElements": 1,
  "totalPages": 1
}
```

## Frontend

### Telas
- **/usuarios** — Lista paginada com botão "Novo", colunas (Nome, Email, Perfil, Status) e ações (Editar, Desativar)
- **/usuarios/novo** — Formulário de criação
- **/usuarios/:id/editar** — Formulário de edição

### Estados
| Estado | Comportamento |
|--------|---------------|
| Carregando | Skeleton/spinner na listagem e formulários |
| Vazio | Mensagem "Nenhum usuário encontrado" |
| Erro | Toast com mensagem do erro |
| Sucesso | Toast "Usuário salvo" + redireciona para listagem |
| Validação | Erros inline nos campos (email duplicado, senha curta) |

### Critérios de Aceite
1. [ ] Apenas usuário ADMIN enxerga o menu "Usuários"
2. [ ] Tenta acessar /usuarios sem ser ADMIN → redireciona para dashboard com toast de permissão negada (HTTP 403)
3. [ ] Listagem mostra dados corretos com paginação
4. [ ] Ao desativar, o usuário some da listagem ou fica com badge "Inativo"
5. [ ] Email duplicado retorna erro amigável
6. [ ] Senha com menos de 8 caracteres exibe validação inline
7. [ ] Criação de usuário com sucesso redireciona para listagem

## Fora do Escopo
- Recuperação de senha / "Esqueci minha senha"
- Confirmação de email
- Login social (OAuth2)
