# Tech Stack

## Backend

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Java | 21 | Linguagem |
| Spring Boot | 3.4+ | Framework |
| Spring Web | — | REST Controllers |
| Spring Data JPA | — | Persistência |
| Spring Boot Actuator | — | Health checks, métricas e observabilidade |
| Spring Security | — | Autenticação/autorização |
| springdoc-openapi (Swagger) | — | Documentação da API |
| JJWT | 0.12+ | Geração/validação de tokens JWT |
| Lombok | — | Redução de boilerplate |
| Maven | — | Gerenciamento de dependências |
| Flyway | — | Migrations do banco de dados |
| PostgreSQL Driver | — | Conexão com banco |
| JUnit 5 | — | Testes unitários |
| Mockito | — | Mocking em testes unitários |
| Spring Boot Test | — | Testes de integração (slice tests, Testcontainers) |

**Diretório**: `/backend`

**Variáveis de Ambiente**:

| Variável | Fallback | Descrição |
|----------|----------|-----------|
| `SERVER_PORT` | `8080` | Porta do servidor |
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5439/sge` | URL de conexão com o banco |
| `SPRING_DATASOURCE_USERNAME` | `sge` | Usuário do banco |
| `SPRING_DATASOURCE_PASSWORD` | `sge` | Senha do banco |
| `JWT_SECRET` | *(fallback hardcoded apenas dev)* | Chave secreta para assinar tokens JWT |
| `APP_CORS_ALLOWED_ORIGINS` | `http://localhost:5173` | Origens permitidas pelo CORS |

**Arquitetura**: MVC sem camadas adicionais

```
controller/   → REST endpoints
service/      → Lógica de negócio
repository/   → Acesso a dados (Spring Data JPA)
model/        → Entidades JPA
config/       → Beans de configuração (Security, Swagger, CORS)
dto/          → Objetos de request/response
```

## Frontend

| Tecnologia | Uso |
|------------|-----|
| React 18+ | Biblioteca UI |
| TypeScript | Tipagem estática |
| React Router DOM | Roteamento SPA |
| Axios | HTTP client |
| Tailwind CSS v4 | Estilização utilitária |

**Diretório**: `/frontend`

**Variáveis de Ambiente**:

| Variável | Fallback | Descrição |
|----------|----------|-----------|
| `VITE_API_URL` | `http://localhost:8080` | URL base da API REST do backend |

**Estrutura**:
```
src/
  components/    → Componentes reutilizáveis
  pages/         → Páginas do sistema
  services/      → Chamadas Axios para API
  contexts/      → Contextos React (autenticação, etc.)
  types/         → Interfaces TypeScript
  styles/        → Tema Tailwind (theme.css) e estilos globais
```

**Responsividade**: Todo o frontend deve ser responsivo (desktop ≥ 1024px, tablet/mobile < 1024px). Navegação em mobile deve usar menu colapsável (hamburger), tabelas devem ter scroll horizontal em telas estreitas, formulários devem ocupar 100% da largura disponível, e modais devem ser full-screen em mobile. Nenhuma funcionalidade deve ser oculta ou restrita em mobile — todos os fluxos de CRUD, vendas e consultas operam integralmente em qualquer dispositivo.

## Design System

### Paleta de Cores

Cores definidas via `@theme` no Tailwind CSS v4 (arquivo `frontend/src/styles/theme.css`), disponíveis como utilitários ex: `bg-primary-600`, `text-success-500`, `border-danger-400`.

| Token | Escala | Cor Base | Uso |
|-------|--------|----------|-----|
| **primary** | 50–900 | Blue `#2563eb` | Botões, links, header, elementos de destaque |
| **secondary** | 50–900 | Slate `#64748b` | Elementos neutros, bordas, textos secundários |
| **success** | 500–700 | Emerald `#10b981` | Badge COMPLETED, ações positivas |
| **warning** | 500–600 | Amber `#f59e0b` | Badge PENDING, alertas |
| **danger** | 500–700 | Red `#ef4444` | Badge CANCELLED, botão cancelar, erros |
| **info** | 500–600 | Sky `#0ea5e9` | Mensagens informativas |

### Mapeamento de Status

| Status da Venda | Token | Badge |
|-----------------|-------|-------|
| `COMPLETED` | success | Verde |
| `PENDING` | warning | Amarelo |
| `CANCELLED` | danger | Vermelho |

## Infraestrutura

| Componente | Descrição |
|------------|-----------|
| PostgreSQL 16 | Banco de dados relacional |
| Prometheus | Coleta e armazenamento de métricas |
| Grafana | Dashboards de observabilidade |
| Docker Compose | Orquestração dos serviços |

**Arquivo**: `/bd/docker-compose.yml`

### Observabilidade (Prometheus + Grafana)

Pipeline de métricas:

```
Backend (8080) ──(/actuator/prometheus)──> Prometheus (9090) ──> Grafana (3000)
```

**Pré-requisitos**:
- Backend rodando na máquina host (`mvn spring-boot:run`)
- Containers Prometheus e Grafana sobem via Docker Compose

**Subir os serviços**:
```bash
cd bd && docker compose up -d prometheus grafana
```

**Acessos**:
| Serviço | URL |
|---------|-----|
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3000 (admin/admin) |

**Grafana**: o datasource Prometheus já é provisionado automaticamente. Basta importar ou criar dashboards com métricas como `jvm_memory_used_bytes`, `http_server_requests_seconds_count`, `system_cpu_usage`.

**Arquivos de configuração**:
| Arquivo | Função |
|---------|--------|
| `bd/prometheus.yml` | Configuração do scrape job apontando para o backend |
| `bd/grafana/datasources/datasource.yml` | Provisionamento automático do datasource no Grafana |

## Estilo Arquitetural

- **Monólito Modular**: único deploy, mas com separação clara entre domínios
- **REST API**: comunicação stateless via JSON
- **Autenticação Stateless**: JWT enviado no header `Authorization: Bearer <token>`
- **MVC Simples**: Controllers → Services → Repositories, sem camada de domínio rica
