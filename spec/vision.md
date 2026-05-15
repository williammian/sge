# SGE — Sistema de Gerenciamento Empresarial

## Visão do Produto
Plataforma unificada e modular para gestão empresarial de pequenas e médias empresas, iniciando pelos módulos de autenticação e vendas, com expansão futura para compras, estoque e financeiro. O sistema oferece cadastro centralizado de usuários, clientes e itens, além do fluxo completo de vendas com controle de permissões.

## Objetivo
Eliminar planilhas paralelas e processos manuais, centralizando as operações do negócio em um único sistema web com APIs REST, interface responsiva e dados consistentes.

## Usuários

| Perfil | Descrição |
|--------|-----------|
| **Admin** | Acesso total: gerencia usuários, visualiza todas as vendas, cancela vendas, configura o sistema |
| **Vendedor** | Cadastra clientes e itens, cria e consulta vendas próprias |
| **Gerente** | Visualiza relatórios e vendas de todos os vendedores |

## Problemas que Resolve

1. Dados espalhados em planilhas, papéis ou sistemas isolados
2. Dificuldade de rastrear vendas por vendedor, cliente ou período
3. Ausência de controle de permissões (qualquer um acessa tudo)
4. Retrabalho por falta de registro histórico de vendas e cadastros
5. Dificuldade de integração futura com outros módulos de gestão

## Métricas de Sucesso

- **Adoção**: 100% das vendas registradas no sistema em até 30 dias
- **Tempo de venda**: Redução de 40% no tempo médio para registrar uma venda
- **Erros**: Zero vendas com dados inconsistentes (cliente/item inexistente)
- **Disponibilidade**: API com uptime ≥ 99,5%

## Contexto

Sistema monolítico modular, REST API, backend Java com Spring Boot, frontend React SPA, banco PostgreSQL. Observabilidade via Spring Boot Actuator com métricas exportadas para Prometheus e dashboards no Grafana. Testes unitários com JUnit 5 e Mockito, testes de integração com Spring Boot Test. Desenvolvimento orientado a especificações (Spec Driven Development): primeiro a especificação, depois a implementação.

## Fluxo Principal (Versão Inicial)

```
[Login] → [Dashboard] → [Cadastros: Clientes, Itens, Usuários] → [Vendas] → [Consulta Vendas]
```

## Integrações Futuras

| Módulo | Descrição |
|--------|-----------|
| **Compras** | Cadastro de fornecedores, pedidos de compra, recebimento de mercadorias |
| **Estoque** | Controle de entrada/saída, inventário, alerta de estoque mínimo |
| **Financeiro** | Contas a pagar/receber, fluxo de caixa, conciliação |
| **Relatórios** | Dashboard gerencial com gráficos e exportação de dados |
