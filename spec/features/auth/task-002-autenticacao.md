# TASK-002: Autenticação (Login JWT)

## Objetivo
Implementar login com geração de token JWT e proteção das rotas da API. O frontend deve armazenar o token e enviá-lo em todas as requisições autenticadas.

## Regras
- RG-01: Header `Authorization: Bearer <token>` obrigatório
- RG-02: Token expirado (24h) → HTTP 401
- RG-09: Frontend redireciona para `/login` ao receber 401

## Dependências
- TASK-001 (cadastro de usuários deve existir para haver login)

## Fluxo
1. Usuário acessa `/login`
2. Informa email e senha
3. Backend valida credenciais
4. Sucesso → retorna JWT + dados do usuário
5. Frontend armazena token (localStorage/sessionStorage) e dados do usuário em contexto
6. Redireciona para dashboard (`/`)
7. Falha → exibe "Email ou senha inválidos"

## Backend

### Endpoints

| Método | Path | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/api/auth/login` | Público | Autenticar e obter JWT |

### Payloads

**POST /api/auth/login — Request**
```json
{
  "email": "string",
  "senha": "string"
}
```

**POST /api/auth/login — Response (200)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "tipo": "Bearer",
  "expiraEm": 86400,
  "usuario": {
    "id": 1,
    "nome": "Admin",
    "email": "admin@sge.com",
    "perfil": "ADMIN"
  }
}
```

### Regras de Implementação
- Token JWT com claims: `sub` (userId), `email`, `perfil`
- Validade: 24 horas
- Secret via `application.yml` (variável de ambiente)
- Endpoint público **não** exige autenticação
- Usuário inativo (`ativo = false`) **não** pode logar (HTTP 401)

## Frontend

### Telas
- **/login** — Tela de login com formulário email + senha

### Estados
| Estado | Comportamento |
|--------|---------------|
| Carregando | Botão "Entrar" desabilitado com spinner |
| Erro | Toast/mensagem "Email ou senha inválidos" |
| Sucesso | Redireciona para `/` |
| Token expirado | Interceptor Axios captura 401 → limpa storage → redireciona `/login` |

### Critérios de Aceite
1. [ ] Login com credenciais válidas redireciona para dashboard
2. [ ] Login com credenciais inválidas exibe mensagem de erro (não revela qual campo está errado)
3. [ ] Usuário inativo recebe mensagem "Usuário desativado. Contate o administrador."
4. [ ] Token expirado na primeira requisição → redireciona para `/login`
5. [ ] Sem token → redireciona para `/login`
6. [ ] Dados do usuário ficam disponíveis em um contexto React (`useAuth()`)
7. [ ] Botão "Sair" limpa token e redireciona para `/login`
8. [ ] Ao fechar o navegador e reabrir, sessão persiste (se salvou em localStorage)

## Fora do Escopo
- Refresh token
- "Lembrar-me"
- 2FA
- Login com Google/GitHub
