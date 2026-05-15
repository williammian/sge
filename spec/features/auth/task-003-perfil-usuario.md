# TASK-003: Perfil do Usuário Logado

## Objetivo
Permitir que o usuário logado visualize e edite seu próprio perfil (nome e email) e altere sua senha.

## Regras
- RN-04: Senha deve ter no mínimo 8 caracteres
- Usuário só pode alterar o próprio perfil

## Dependências
- TASK-002 (autenticação)

## Fluxo
1. Usuário acessa "Meu Perfil" no menu
2. Visualiza dados cadastrados (nome, email, perfil)
3. Edita nome e/ou email
4. Altera senha (informa senha atual + nova senha)
5. Salva

## Backend

### Endpoints

| Método | Path | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/api/auth/me` | Bearer | Dados do usuário logado |
| PUT | `/api/auth/me` | Bearer | Atualizar nome/email |
| PUT | `/api/auth/me/senha` | Bearer | Alterar senha |

### Payloads

**GET /api/auth/me — Response (200)**
```json
{
  "id": 1,
  "nome": "Admin",
  "email": "admin@sge.com",
  "perfil": "ADMIN"
}
```

**PUT /api/auth/me — Request**
```json
{
  "nome": "Novo Nome",
  "email": "novo@email.com"
}
```

**PUT /api/auth/me/senha — Request**
```json
{
  "senhaAtual": "string",
  "novaSenha": "string"
}
```

## Frontend

### Telas
- **/perfil** — Formulário com dados do usuário e opção de alterar senha (seção separada)

### Estados
| Estado | Comportamento |
|--------|---------------|
| Carregando | Skeleton no formulário |
| Erro | Toast com erro |
| Sucesso | Toast "Perfil atualizado" |
| Senha incorreta | Toast "Senha atual inválida" |

### Critérios de Aceite
1. [ ] Visualiza nome, email e perfil (perfil é somente leitura)
2. [ ] Altera nome e email com sucesso
3. [ ] Altera senha informando senha atual correta e nova senha ≥ 8 caracteres
4. [ ] Senha atual incorreta → mensagem de erro específica
5. [ ] Após alterar senha, permanece logado

## Fora do Escopo
- Foto de perfil
- Preferências de notificação
