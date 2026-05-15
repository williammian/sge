CREATE TABLE usuarios (
    id          BIGSERIAL    PRIMARY KEY,
    nome        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    senha       VARCHAR(255) NOT NULL,
    perfil      VARCHAR(20)  NOT NULL CHECK (perfil IN ('ADMIN', 'VENDEDOR', 'GERENTE')),
    ativo       BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE clientes (
    id          BIGSERIAL    PRIMARY KEY,
    nome        VARCHAR(255) NOT NULL,
    cpf_cnpj    VARCHAR(20)  NOT NULL UNIQUE,
    telefone    VARCHAR(20)  NOT NULL,
    email       VARCHAR(255),
    endereco    TEXT,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE itens (
    id          BIGSERIAL       PRIMARY KEY,
    nome        VARCHAR(255)    NOT NULL UNIQUE,
    descricao   TEXT,
    preco       DECIMAL(12, 2) NOT NULL,
    ativo       BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE TABLE vendas (
    id                  BIGSERIAL       PRIMARY KEY,
    cliente_id          BIGINT          NOT NULL,
    vendedor_id         BIGINT          NOT NULL,
    data_hora           TIMESTAMP       NOT NULL DEFAULT NOW(),
    valor_total         DECIMAL(14, 2)  NOT NULL,
    status              VARCHAR(20)     NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'CANCELLED')),
    observacao          TEXT,
    motivo_cancelamento TEXT,
    created_at          TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMP       NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_vendas_cliente  FOREIGN KEY (cliente_id)  REFERENCES clientes(id),
    CONSTRAINT fk_vendas_vendedor FOREIGN KEY (vendedor_id) REFERENCES usuarios(id)
);

CREATE TABLE venda_itens (
    id              BIGSERIAL       PRIMARY KEY,
    venda_id        BIGINT          NOT NULL,
    item_id         BIGINT          NOT NULL,
    quantidade      INTEGER         NOT NULL CHECK (quantidade > 0),
    preco_unitario  DECIMAL(12, 2)  NOT NULL,
    subtotal        DECIMAL(14, 2)  NOT NULL,
    CONSTRAINT fk_venda_itens_venda FOREIGN KEY (venda_id) REFERENCES vendas(id),
    CONSTRAINT fk_venda_itens_item  FOREIGN KEY (item_id)  REFERENCES itens(id)
);

INSERT INTO usuarios (nome, email, senha, perfil, ativo)
VALUES ('Admin', 'admin@sge.com.br', '$2a$10$VirvEkFnQpXwegmERU3Dc.GuQL/QgsactjLsMulLjfN11z42fCCkq', 'ADMIN', true);

INSERT INTO usuarios (nome, email, senha, perfil, ativo)
VALUES ('vendedor', 'vendedor@sge.com.br', '$2a$10$Iggj8b0dCaJPID8PT1x2SeosPfgfblFCyIRZmFkZWuHr.hewEDRSK', 'VENDEDOR', true);

INSERT INTO usuarios (nome, email, senha, perfil, ativo)
VALUES ('Gerente', 'gerente@sge.com.br', '$2a$10$9Ab543tY6aEiGjqTETrvheekX42ZU8REkqZNRiZpVwcQhUMqIS9oa', 'GERENTE', true);
