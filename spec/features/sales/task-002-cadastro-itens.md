# TASK-002: Cadastro de Itens

## Objetivo
Implementar CRUD completo de itens (produtos/serviços).

## Regras
- RN-07: Preço > 0
- RN-08: Item inativo não entra em venda
- RN-09: Nome obrigatório e único

## Dependências
- TASK-002 de auth (autenticação)

## Fluxo
1. Usuário acessa "Itens" no menu
2. Visualiza listagem com paginação
3. Clica em "Novo Item"
4. Preenche formulário (nome, descrição, preço)
5. Sistema valida e salva
6. Listagem é atualizada

## Backend

### Endpoints

| Método | Path | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/api/itens` | Bearer | Criar item |
| GET | `/api/itens` | Bearer | Listar (paginado, filtrar apenas ativos) |
| GET | `/api/itens/{id}` | Bearer | Buscar por ID |
| PUT | `/api/itens/{id}` | Bearer | Atualizar item |
| PATCH | `/api/itens/{id}/status` | Bearer | Ativar/desativar |

### Payloads

**POST /api/itens — Request**
```json
{
  "nome": "string",
  "descricao": "string",
  "preco": 99.90
}
```

**GET /api/itens?page=0&size=20&apenasAtivos=true — Response**
```json
{
  "content": [ { "id": 1, "nome": "...", "descricao": "...", "preco": 99.90, "ativo": true } ],
  "totalElements": 1,
  "totalPages": 1
}
```

## Frontend

### Telas
- **/itens** — Lista paginada com filtro "Apenas Ativos", busca por nome
- **/itens/novo** — Formulário de criação
- **/itens/:id/editar** — Formulário de edição

### Estados
| Estado | Comportamento |
|--------|---------------|
| Carregando | Skeleton |
| Vazio | "Nenhum item encontrado" |
| Erro | Toast com erro |
| Validação | Erro inline (preço inválido, nome duplicado) |

### Critérios de Aceite
1. [ ] Nome do item é obrigatório e único
2. [ ] Preço deve ser maior que zero
3. [ ] Apenas itens ativos aparecem no seletor de itens na venda
4. [ ] Desativar item não afeta vendas existentes (fotografia do preço)
5. [ ] Filtro "Apenas Ativos" na listagem

## Fora do Escopo
- Controle de estoque
- Categoria de itens
- Imagem do item
- Código de barras / SKU
