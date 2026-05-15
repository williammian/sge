# TASK-005: Cancelar Venda

## Objetivo
Permitir que ADMIN cancele vendas com status PENDING.

## Regras
- RN-11: Apenas ADMIN pode cancelar
- RN-12: Venda deve estar PENDING

## Dependências
- TASK-004 de sales (consulta de vendas)

## Fluxo
1. ADMIN acessa detalhe da venda (PENDING)
2. Clica em "Cancelar Venda"
3. Modal de confirmação é exibido
4. ADMIN confirma (opcional: motivo)
5. Venda é alterada para CANCELLED
6. Tela de detalhes atualizada

## Backend

### Endpoints

| Método | Path | Auth | Perfil | Descrição |
|--------|------|------|--------|-----------|
| PATCH | `/api/vendas/{id}/cancelar` | Bearer | ADMIN | Cancelar venda |

### Payloads

**PATCH /api/vendas/{id}/cancelar — Request**
```json
{
  "motivo": "string (opcional)"
}
```

**PATCH /api/vendas/{id}/cancelar — Response (200)**
```json
{
  "id": 1,
  "status": "CANCELLED",
  "motivoCancelamento": "string"
}
```

### Erros
| Situação | HTTP | Mensagem |
|----------|------|----------|
| Venda não encontrada | 404 | "Venda não encontrada" |
| Não é ADMIN | 403 | "Apenas administradores podem cancelar vendas" |
| Venda não está PENDING | 400 | "Venda não pode ser cancelada. Status atual: COMPLETED" |

## Frontend

### Telas
- Modal de confirmação no detalhe da venda (`/vendas/:id`)

### Estados
| Estado | Comportamento |
|--------|---------------|
| Botão visível | Apenas ADMIN + venda PENDING |
| Modal | "Tem certeza que deseja cancelar esta venda?" + campo opcional "Motivo" |
| Sucesso | Venda atualizada para CANCELLED + toast |
| Erro | Toast com mensagem de erro |

### Critérios de Aceite
1. [ ] Botão "Cancelar" aparece apenas para ADMIN e apenas em vendas PENDING
2. [ ] Modal de confirmação com motivo opcional
3. [ ] Após cancelar, badge de status muda para CANCELLED
4. [ ] Botão "Cancelar" some após venda cancelada
5. [ ] Venda COMPLETED não exibe botão de cancelar
6. [ ] Não-ADMIN tenta chamar endpoint → 403 tratado no frontend

## Fora do Escopo
- Estorno financeiro
- Reativação de venda cancelada
- Notificação ao vendedor
