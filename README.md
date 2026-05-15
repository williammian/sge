# SGE — Sistema de Gerenciamento Empresarial

Plataforma unificada e modular para gestão empresarial de pequenas e médias empresas. Inicia com os módulos de **autenticação** e **vendas**, com expansão futura para compras, estoque e financeiro.

- [Visão do Produto](spec/vision.md)
- [Tech Stack](spec/tech-stack.md)
- [Regras do Sistema](spec/rules.md)
- [Modelagem de Domínio](spec/domain.md)

## Módulos

### Autenticação ✅

| Task | Status |
|------|--------|
| Cadastro de Usuários (CRUD) | Done |
| Autenticação (Login JWT) | Done |
| Perfil do Usuário Logado | Done |

[Especificação](spec/features/auth/tasks.md)

### Vendas 🚧

| Task | Status |
|------|--------|
| Cadastro de Clientes (CRUD) | TODO |
| Cadastro de Itens (CRUD) | TODO |
| Criar Venda | TODO |
| Consultar Vendas | TODO |
| Cancelar Venda | TODO |

[Especificação](spec/features/sales/tasks.md)

## Arquitetura

Monólito modular com REST API (backend Java/Spring Boot) + SPA React (frontend). Separação clara entre domínios, autenticação stateless via JWT.

```
backend/   → Java 21 + Spring Boot 3.4+
frontend/  → React 18 + TypeScript + Tailwind CSS v4
spec/      → Especificações (Spec Driven Development)
bd/        → Docker Compose (PostgreSQL, Prometheus, Grafana)
```

## Stack

| Camada | Tecnologias |
|--------|-------------|
| Backend | Java 21, Spring Boot, Spring Security, Spring Data JPA, Flyway, PostgreSQL |
| Frontend | React 18, TypeScript, React Router, Axios, Tailwind CSS v4 |
| Infra | Docker Compose, Prometheus, Grafana |
| Testes | JUnit 5, Mockito, Spring Boot Test |

Detalhes completos em [spec/tech-stack.md](spec/tech-stack.md).

## Metodologia

**Spec Driven Development** — toda funcionalidade é primeiro especificada em `/spec`, depois implementada. O desenvolvimento é assistido por **agente de codificação com IA (OpenCode)**, que interpreta as especificações, gera código, executa testes e iterage com o desenvolvedor até a task ser concluída.
