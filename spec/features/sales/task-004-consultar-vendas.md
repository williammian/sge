# TASK-004: Consultar Vendas

## Objetivo
Implementar listagem e consulta de vendas com filtros e detalhamento.

## Regras
- RN-15: Vendedor vê apenas suas vendas; ADMIN e GERENTE veem todas
- Paginação padrão

## Dependências
- TASK-003 de sales (criação de venda)

## Fluxo
1. Usuário acessa "Vendas" no menu
2. Visualiza listagem paginada com filtros
3. Clica em uma venda para ver detalhes
4. (ADMIN) Vê botão "Cancelar" se status for PENDING

## Backend

### Endpoints

| Método | Path | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/api/vendas` | Bearer | Listar vendas (paginado, com filtros) |
| GET | `/api/vendas/{id}` | Bearer | Buscar venda por ID |

### Parâmetros de Filtro (GET /api/vendas)

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| page | Integer | Número da página |
| size | Integer | Tamanho da página |
| clienteId | Long | Filtrar por cliente |
| status | String | PENDING, COMPLETED, CANCELLED |
| dataInicio | String (ISO) | Data inicial |
| dataFim | String (ISO) | Data final |

### Payloads

**GET /api/vendas — Response**
```json
{
  "content": [
    {
      "id": 1,
      "cliente": { "id": 1, "nome": "Cliente X" },
      "vendedor": { "id": 1, "nome": "Vendedor Y" },
      "dataHora": "2026-05-13T10:00:00",
      "valorTotal": 299.70,
      "status": "COMPLETED"
    }
  ],
  "totalElements": 1,
  "totalPages": 1
}
```

**GET /api/vendas/{id} — Response**
```json
{
  "id": 1,
  "cliente": { "id": 1, "nome": "Cliente X", "cpfCnpj": "123..." },
  "vendedor": { "id": 1, "nome": "Vendedor Y", "email": "vendedor@sge.com" },
  "dataHora": "2026-05-13T10:00:00",
  "valorTotal": 299.70,
  "status": "COMPLETED",
  "observacao": "string",
  "itens": [
    { "itemId": 1, "nome": "Item A", "quantidade": 2, "precoUnitario": 99.90, "subtotal": 199.80 }
  ]
}
```

## Frontend

### Telas
- **/vendas** — Lista paginada com filtros (cliente, status, período) e colunas (ID, Cliente, Vendedor, Data, Total, Status)
- **/vendas/:id** — Detalhamento completo da venda com itens, valores e ações (cancelar, se aplicável)

### Estados
| Estado | Comportamento |
|--------|---------------|
| Carregando | Skeleton na tabela |
| Vazio | "Nenhuma venda encontrada" |
| Erro | Toast com erro |
| Filtros | Filtros aplicados via query params; recarregam listagem |

### Critérios de Aceite
1. [ ] Vendedor vê apenas suas vendas na listagem; ADMIN/GERENTE veem todas
2. [ ] Filtros combinados funcionam corretamente
3. [ ] Status exibido como badge colorido (verde=COMPLETED, amarelo=PENDING, vermelho=CANCELLED)
4. [ ] Detalhes mostram todos os itens com preços e subtotais
5. [ ] Na listagem, ADMIN vê coluna "Vendedor"; VENDEDOR não vê (só as próprias)
6. [ ] Paginação funcional
7. [ ] A partir do detalhe, ADMIN pode ir para o cancelamento

## Fora do Escopo
- Exportação (CSV/PDF)
- Gráficos
- Impressão do cupom
