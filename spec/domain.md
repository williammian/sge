# Modelagem de Domínio

## Entidades

### Usuário (`User`)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long (PK) | Identificador único |
| nome | String | Nome completo |
| email | String (unique) | Email de login |
| senha | String | Hash bcrypt |
| perfil | Enum(ADMIN, VENDEDOR, GERENTE) | Perfil de acesso |
| ativo | Boolean | Se o usuário está ativo |
| createdAt | LocalDateTime | Data de criação |
| updatedAt | LocalDateTime | Data de atualização |

### Cliente (`Client`)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long (PK) | Identificador único |
| nome | String | Nome ou razão social |
| cpfCnpj | String (unique) | CPF ou CNPJ |
| telefone | String | Telefone de contato |
| email | String | Email |
| endereco | String | Endereço completo |
| createdAt | LocalDateTime | Data de criação |
| updatedAt | LocalDateTime | Data de atualização |

### Item / Produto (`Item`)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long (PK) | Identificador único |
| nome | String | Nome do item |
| descricao | String | Descrição detalhada |
| preco | BigDecimal | Preço unitário de venda |
| ativo | Boolean | Se o item está disponível |
| createdAt | LocalDateTime | Data de criação |
| updatedAt | LocalDateTime | Data de atualização |

### Venda (`Sale`)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long (PK) | Identificador único |
| cliente | ManyToOne (Client) | Cliente da venda |
| vendedor | ManyToOne (User) | Usuário que criou a venda |
| dataHora | LocalDateTime | Data/hora da venda |
| valorTotal | BigDecimal | Soma dos itens |
| status | Enum(PENDING, COMPLETED, CANCELLED) | Estado da venda |
| observacao | String | Observação opcional |
| createdAt | LocalDateTime | Data de criação |
| updatedAt | LocalDateTime | Data de atualização |

### Item da Venda (`SaleItem`)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Long (PK) | Identificador único |
| venda | ManyToOne (Sale) | Venda associada |
| item | ManyToOne (Item) | Item vendido |
| quantidade | Integer | Quantidade |
| precoUnitario | BigDecimal | Preço no momento da venda |
| subtotal | BigDecimal | quantidade × precoUnitario |

## Linguagem do Negócio (Ubiquitous Language)

| Termo | Significado |
|-------|-------------|
| **Venda** | Transação comercial onde itens são vendidos a um cliente |
| **Item** | Produto ou serviço comercializável |
| **Cliente** | Pessoa física ou jurídica compradora |
| **Vendedor** | Usuário que realizou a venda |
| **Cancelamento** | Ação de desfazer uma venda, mantendo o registro histórico |
| **Perfil** | Conjunto de permissões atribuído a um usuário |

## Estados

### Venda (Sale)
```
[PENDING] → [COMPLETED]
[PENDING] → [CANCELLED]
[COMPLETED] → (terminal, não transiciona)
[CANCELLED] → (terminal, não transiciona)
```

### Usuário (User)
```
[ACTIVE] → [INACTIVE]
[INACTIVE] → [ACTIVE]
```

## Eventos de Domínio (Futuro)

- `SaleCompletedEvent` — venda finalizada (gatilho para baixa de estoque no futuro)
- `SaleCancelledEvent` — venda cancelada (gatilho para estorno de estoque no futuro)
- `UserInactivatedEvent` — usuário desativado
