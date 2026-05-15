# TASK-003: Criar Venda

## Objetivo
Implementar o fluxo de criação de venda com seleção de cliente, adição de itens e finalização.

## Regras
- RN-10: Mínimo 1 item por venda
- RN-13: Valor total calculado pelo backend
- RN-14: Preço copiado no momento da venda (fotografia do preço)
- RN-16: Ao concluir, status = `COMPLETED`

## Dependências
- TASK-001 de sales (clientes)
- TASK-002 de sales (itens)

## Fluxo
1. Usuário acessa "Nova Venda"
2. Seleciona cliente (autocomplete/busca)
3. Adiciona itens: busca item, informa quantidade
4. Visualiza resumo com itens, quantidades, subtotais e total
5. Opcional: adiciona observação
6. Confirma venda
7. Sistema calcula total, salva com status `PENDING`
8. Exibe resumo da venda criada com opção "Concluir"
9. Ao concluir, status muda para `COMPLETED`

## Backend

### Endpoints

| Método | Path | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/api/vendas` | Bearer | Criar venda (PENDING) |
| PATCH | `/api/vendas/{id}/concluir` | Bearer | Concluir venda (→ COMPLETED) |

### Payloads

**POST /api/vendas — Request**
```json
{
  "clienteId": 1,
  "observacao": "string (opcional)",
  "itens": [
    { "itemId": 1, "quantidade": 2 },
    { "itemId": 2, "quantidade": 1 }
  ]
}
```

**POST /api/vendas — Response (201)**
```json
{
  "id": 1,
  "cliente": { "id": 1, "nome": "Cliente X" },
  "vendedor": { "id": 1, "nome": "Vendedor Y" },
  "dataHora": "2026-05-13T10:00:00",
  "valorTotal": 299.70,
  "status": "PENDING",
  "observacao": "string",
  "itens": [
    { "itemId": 1, "nome": "Item A", "quantidade": 2, "precoUnitario": 99.90, "subtotal": 199.80 },
    { "itemId": 2, "nome": "Item B", "quantidade": 1, "precoUnitario": 99.90, "subtotal": 99.90 }
  ]
}
```

**PATCH /api/vendas/{id}/concluir — Response (200)**
```json
{
  "id": 1,
  "status": "COMPLETED",
  "valorTotal": 299.70
}
```

## Frontend

### Telas
- **/vendas/nova** — Tela de criação de venda com:
  1. Seletor de cliente (autocomplete com busca)
  2. Adição de itens (busca + quantidade)
  3. Tabela resumo dos itens adicionados (com botão remover)
  4. Campo de observação
  5. Total calculado em tempo real (frontend calcula visual, backend persiste)
  6. Botão "Salvar Rascunho" (PENDING) e "Concluir Venda" (COMPLETED)

### Estados
| Estado | Comportamento |
|--------|---------------|
| Carregando | Skeleton |
| Vazio (cliente) | "Nenhum cliente encontrado" no autocomplete |
| Vazio (itens) | "Nenhum item encontrado" no autocomplete |
| Sem itens | Botão concluir desabilitado |
| Erro | Toast com erro |
| Sucesso | Tela de resumo da venda criada |

### Critérios de Aceite
1. [ ] Autocomplete de cliente busca por nome ou CPF
2. [ ] Autocomplete de itens busca por nome (apenas ativos)
3. [ ] quantidade deve ser ≥ 1
4. [ ] Não permite adicionar o mesmo item duplicado (exibe aviso)
5. [ ] Remove item da lista antes de salvar
6. [ ] "Salvar Rascunho" cria venda como PENDING
7. [ ] "Concluir Venda" cria como PENDING e já conclui (COMPLETED)
8. [ ] Total é atualizado visualmente ao adicionar/remover itens
9. [ ] Ao salvar com sucesso, exibe resumo e botão "Nova Venda"
10. [ ] Vendedor é associado automaticamente (usuário logado)

## Fora do Escopo
- Edição de venda após criada (será possível apenas cancelar)
- Desconto / acréscimo na venda
- Forma de pagamento
- Parcelamento
- Nota fiscal
