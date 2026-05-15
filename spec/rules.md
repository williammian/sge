# Regras

## Regras Gerais do Sistema

| # | Regra |
|---|-------|
| RG-01 | Toda requisição autenticada deve conter o header `Authorization: Bearer <token>` |
| RG-02 | Tokens JWT expirados (24h) devem ser rejeitados com HTTP 401 |
| RG-03 | Respostas de erro seguem o formato `{ "error": "mensagem", "status": 400 }` |
| RG-04 | A API expõe documentação interativa via Swagger UI em `/swagger-ui.html` |
| RG-05 | Paginação utiliza `?page=0&size=20` com resposta contendo `content`, `totalElements`, `totalPages` |
| RG-06 | Nenhuma senha é armazenada em texto plano; usar bcrypt |
| RG-07 | Soft delete não é utilizado; registros inativos têm flag `ativo = false` |
| RG-08 | Todas as operações de escrita registram `createdAt` e `updatedAt` |
| RG-09 | O frontend redireciona para `/login` quando recebe HTTP 401 |
| RG-10 | CORS habilitado apenas para a origem do frontend (ex: `http://localhost:5173`) |
| RG-11 | O Actuator expõe os endpoints `/actuator/health` e `/actuator/metrics` para monitoramento |
| RG-12 | Toda service deve ter testes unitários com JUnit 5 e Mockito |
| RG-13 | Todo endpoint REST deve ter teste de integração validando status e corpo da resposta |
| RG-14 | O frontend deve ser responsivo e funcionar integralmente em dispositivos desktop e mobile (breakpoints: ≥ 1024px desktop, < 1024px tablet/mobile) |
| RG-15 | O layout do frontend deve se adaptar sem perda de funcionalidade, mantendo legibilidade, usabilidade e todos os fluxos operacionais em qualquer tamanho de tela |
| RG-16 | Componentes de formulário, tabelas e modais devem ser scrolláveis ou colapsados em mobile para evitar overflow horizontal |

## Regras de Negócio

### Usuários

| # | Regra |
|---|-------|
| RN-01 | Apenas usuários com perfil **ADMIN** podem criar, editar ou desativar usuários |
| RN-02 | Email de usuário deve ser único |
| RN-03 | Ao desativar um usuário, vendas existentes não são afetadas |
| RN-04 | A senha deve ter no mínimo 8 caracteres |

### Clientes

| # | Regra |
|---|-------|
| RN-05 | CPF/CNPJ deve ser único no sistema |
| RN-06 | Qualquer usuário autenticado (VENDEDOR, GERENTE, ADMIN) pode cadastrar clientes |

### Itens

| # | Regra |
|---|-------|
| RN-07 | Preço do item deve ser > 0 |
| RN-08 | Item inativo (`ativo = false`) não pode ser adicionado a uma venda |
| RN-09 | Nome do item é obrigatório e único |

### Vendas

| # | Regra |
|---|-------|
| RN-10 | Uma venda deve conter no mínimo 1 item |
| RN-11 | Apenas **ADMIN** pode cancelar vendas |
| RN-12 | Uma venda só pode ser cancelada se estiver com status `PENDING` |
| RN-13 | O valor total da venda é calculado automaticamente pelo backend (soma dos subtotais) |
| RN-14 | O preço unitário de cada item na venda é copiado do item no momento da criação ("fotografia do preço") |
| RN-15 | Vendedor visualiza apenas suas próprias vendas; ADMIN e GERENTE visualizam todas |
| RN-16 | Ao concluir uma venda, o status muda para `COMPLETED` e não pode mais ser alterado |
