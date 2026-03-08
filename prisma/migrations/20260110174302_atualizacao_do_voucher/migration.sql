-- CreateEnum
CREATE TYPE "CategoriasCarros" AS ENUM ('Sedan', 'MiniVan', 'Van', 'Micro', 'Onibus', 'Material');

-- CreateEnum
CREATE TYPE "Funcao" AS ENUM ('Master', 'Admin', 'Finc', 'Oper');

-- CreateEnum
CREATE TYPE "FuncaoSolicitante" AS ENUM ('Finc', 'Oper', 'Basic');

-- CreateEnum
CREATE TYPE "StatusPresenca" AS ENUM ('Agendado', 'Presente', 'Ausente');

-- CreateEnum
CREATE TYPE "NaturezaVoucher" AS ENUM ('Fixo', 'Extra', 'Turno');

-- CreateEnum
CREATE TYPE "StatusVoucher" AS ENUM ('Aberto', 'EmAndamento', 'Concluido', 'Cancelado');

-- CreateEnum
CREATE TYPE "TipoCorrida" AS ENUM ('Entrada', 'Saida');

-- CreateEnum
CREATE TYPE "DiaDaSemana" AS ENUM ('Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab');

-- CreateTable
CREATE TABLE "admin_usuario" (
    "id" BIGSERIAL NOT NULL,
    "operadora_id" BIGINT,
    "nome" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255),
    "foto_admin_operadora" VARCHAR(255),
    "status_admin_operadora" BOOLEAN DEFAULT true,
    "data_criacao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "funcao" "Funcao" DEFAULT 'Oper',

    CONSTRAINT "admin_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "centro_custo_cliente" (
    "id" BIGSERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "codigo" VARCHAR(50),
    "empresa_cliente_id" BIGINT,
    "operadora_id" BIGINT,

    CONSTRAINT "centro_custo_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresa_cliente" (
    "id" BIGSERIAL NOT NULL,
    "r_social" VARCHAR(255) NOT NULL,
    "nome" VARCHAR(255),
    "cnpj" VARCHAR(20),
    "foto_logo_cliente" VARCHAR(255),
    "operadora_id" BIGINT NOT NULL,
    "status_cliente" BOOLEAN DEFAULT true,

    CONSTRAINT "empresa_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "motorista" (
    "id" BIGSERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "senha" VARCHAR(255) DEFAULT '0000',
    "foto_motorista" VARCHAR(255),
    "cpf" VARCHAR(20),
    "cnh" VARCHAR(20),
    "v_cnh" TIMESTAMP(6),
    "status_motorista" BOOLEAN DEFAULT true,
    "tipo_motorista" VARCHAR(50),
    "data_criacao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "operadora_id" BIGINT,
    "status_cnh" BOOLEAN DEFAULT true,

    CONSTRAINT "motorista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carro" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "marca" VARCHAR(50) NOT NULL,
    "modelo" VARCHAR(50) NOT NULL,
    "cor" VARCHAR(30) NOT NULL,
    "crlv" VARCHAR(50) NOT NULL,
    "ano_crlv" TIMESTAMP(3),
    "v_crlv" BOOLEAN DEFAULT true,
    "chassi" VARCHAR(50) NOT NULL,
    "ano" VARCHAR(4) NOT NULL,
    "agregado_id" BIGINT,
    "motorista_id" BIGINT,
    "operadora_id" BIGINT,

    CONSTRAINT "carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marca" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "marca_id" INTEGER NOT NULL,

    CONSTRAINT "modelo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operadora" (
    "id" BIGSERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(100),
    "logo_operadora" VARCHAR(255),
    "cnpj" VARCHAR(20),
    "r_social" VARCHAR(255),
    "end_rua" VARCHAR(255),
    "end_numero" VARCHAR(20),
    "end_bairro" VARCHAR(100),
    "end_cep" VARCHAR(10),
    "end_cidade" VARCHAR(100),
    "end_uf" VARCHAR(2),
    "status_operadora" BOOLEAN DEFAULT true,
    "data_criacao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "operadora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidade_empresa_cliente" (
    "id" BIGSERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(20),
    "end_rua" VARCHAR(255),
    "end_numero" VARCHAR(20),
    "end_bairro" VARCHAR(100),
    "end_cidade" VARCHAR(100),
    "end_cep" VARCHAR(10),
    "end_complemento" VARCHAR(100),
    "end_uf" VARCHAR(2),
    "empresa_cliente_id" BIGINT,
    "operadora_id" BIGINT,
    "status_unidade_cliente" BOOLEAN NOT NULL DEFAULT true,
    "matriz" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "unidade_empresa_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitante" (
    "id" BIGSERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL DEFAULT '0000',
    "empresa_cliente_id" BIGINT NOT NULL,
    "foto_url_solicitante" VARCHAR(255),
    "status_solicitante" BOOLEAN NOT NULL DEFAULT true,
    "operadora_id" BIGINT,
    "telefone" VARCHAR(20),
    "funcao" "FuncaoSolicitante" NOT NULL,

    CONSTRAINT "solicitante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passageiro" (
    "id" BIGSERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" TEXT,
    "telefone" TEXT,
    "email" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "empresa_cliente_id" BIGINT NOT NULL,
    "centro_custo_cliente_id" BIGINT NOT NULL,
    "foto_perfil_passageiro" TEXT,
    "end_rua" TEXT,
    "end_numero" TEXT,
    "end_bairro" TEXT,
    "end_cidade" TEXT,
    "ponto_apanha" TEXT,
    "horario_embarque" TEXT,

    CONSTRAINT "passageiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rota" (
    "id" SERIAL NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "operadora_id" BIGINT NOT NULL,
    "empresa_cliente_id" BIGINT,

    CONSTRAINT "rota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedagio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "operadora_id" BIGINT NOT NULL,

    CONSTRAINT "pedagio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rota_valor" (
    "id" SERIAL NOT NULL,
    "rota_id" INTEGER NOT NULL,
    "empresa_cliente_id" BIGINT,
    "operadora_id" BIGINT,
    "valor_viagem" DECIMAL(10,2) NOT NULL,
    "valor_viagem_repasse" DECIMAL(10,2) NOT NULL,
    "valor_hora_parada" DECIMAL(10,2) NOT NULL,
    "valor_hora_parada_repasse" DECIMAL(10,2) NOT NULL,
    "valor_deslocamento" DECIMAL(10,2) NOT NULL,
    "valor_deslocamento_repasse" DECIMAL(10,2) NOT NULL,
    "valor_pedagio" INTEGER,
    "categoria" "CategoriasCarros" NOT NULL,

    CONSTRAINT "rota_valor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_voucher_fixo" (
    "id" SERIAL NOT NULL,
    "nome_modelo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "empresa_cliente_id" BIGINT NOT NULL,
    "motorista_id" BIGINT NOT NULL,
    "carro_id" INTEGER NOT NULL,
    "admin_usuario_id" BIGINT NOT NULL,
    "operadora_id" BIGINT NOT NULL,
    "tipo_corrida" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "valor_viagem" DECIMAL(10,2) NOT NULL,
    "valor_viagem_repasse" DECIMAL(10,2) NOT NULL,
    "valor_pedagio" DECIMAL(10,2) NOT NULL,
    "valor_pedagio_repasse" DECIMAL(10,2) NOT NULL,
    "valor_estacionamento" DECIMAL(10,2) NOT NULL,
    "valor_estacionamento_repasse" DECIMAL(10,2) NOT NULL,
    "valor_tempo_parado" DECIMAL(10,2) NOT NULL,
    "valor_tempo_parado_repasse" DECIMAL(10,2) NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3),
    "horario" TIME NOT NULL,
    "dias_semana" "DiaDaSemana"[],

    CONSTRAINT "modelo_voucher_fixo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_voucher_turno" (
    "id" SERIAL NOT NULL,
    "nome_modelo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "empresa_cliente_id" BIGINT NOT NULL,
    "motorista_id" BIGINT NOT NULL,
    "carro_id" INTEGER NOT NULL,
    "admin_usuario_id" BIGINT NOT NULL,
    "operadora_id" BIGINT NOT NULL,
    "tipo_corrida" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "valor_viagem" DECIMAL(10,2) NOT NULL,
    "valor_viagem_repasse" DECIMAL(10,2) NOT NULL,
    "valor_pedagio" DECIMAL(10,2) NOT NULL,
    "valor_pedagio_repasse" DECIMAL(10,2) NOT NULL,
    "valor_estacionamento" DECIMAL(10,2) NOT NULL,
    "valor_estacionamento_repasse" DECIMAL(10,2) NOT NULL,
    "valor_tempo_parado" DECIMAL(10,2) NOT NULL,
    "valor_tempo_parado_repasse" DECIMAL(10,2) NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3),
    "horario" TIME NOT NULL,
    "dias_semana" "DiaDaSemana"[],

    CONSTRAINT "modelo_voucher_turno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relacao_agrd_func" (
    "id" BIGSERIAL NOT NULL,
    "agregado_id" BIGINT NOT NULL,
    "funcionario_id" BIGINT NOT NULL,
    "operadora_id" BIGINT,

    CONSTRAINT "relacao_agrd_func_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucher_passageiro" (
    "id" SERIAL NOT NULL,
    "voucher_id" INTEGER NOT NULL,
    "passageiro_id" BIGINT NOT NULL,
    "horario_embarque_real" TIMESTAMP(3),
    "rateio" DECIMAL(65,30),
    "status_presenca" "StatusPresenca" NOT NULL DEFAULT 'Agendado',

    CONSTRAINT "voucher_passageiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucher" (
    "id" SERIAL NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "data_hora_programado" TIMESTAMP(3) NOT NULL,
    "data_hora_conclusao" TIMESTAMP(3),
    "data_hora_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_viagem" DECIMAL(10,2) NOT NULL,
    "valor_viagem_repasse" DECIMAL(10,2) NOT NULL,
    "valor_deslocamento" DECIMAL(10,2) NOT NULL,
    "valor_deslocamento_repasse" DECIMAL(10,2) NOT NULL,
    "valor_hora_parada" DECIMAL(10,2) NOT NULL,
    "valor_hora_parada_repasse" DECIMAL(10,2) NOT NULL,
    "valor_estacionamento" DECIMAL(10,2) NOT NULL,
    "valor_pedagio" DECIMAL(10,2) NOT NULL,
    "valor_tempo_parado" DECIMAL(10,2) NOT NULL,
    "qnt_tempo_parado" TIMESTAMP(3),
    "assinatura" TEXT,
    "observacao_motorista" TEXT,
    "observacao" TEXT,
    "modelo_fixo_id" INTEGER,
    "modelo_turno_id" INTEGER,
    "rota_id" INTEGER,
    "empresa_cliente_id" BIGINT NOT NULL,
    "unidade_cliente_id" BIGINT NOT NULL,
    "motorista_id" BIGINT NOT NULL,
    "carro_id" INTEGER NOT NULL,
    "solicitante_id" BIGINT NOT NULL,
    "admin_usuario_id" BIGINT NOT NULL,
    "operadora_id" BIGINT NOT NULL,
    "natureza" "NaturezaVoucher" NOT NULL,
    "tipo_corrida" "TipoCorrida" NOT NULL,
    "status" "StatusVoucher" NOT NULL DEFAULT 'Aberto',

    CONSTRAINT "voucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_usuario_email_key" ON "admin_usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "motorista_email_key" ON "motorista"("email");

-- CreateIndex
CREATE UNIQUE INDEX "carro_placa_key" ON "carro"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "marca_nome_key" ON "marca"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "modelo_nome_key" ON "modelo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "operadora_slug_key" ON "operadora"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "solicitante_email_key" ON "solicitante"("email");

-- CreateIndex
CREATE UNIQUE INDEX "passageiro_email_key" ON "passageiro"("email");

-- CreateIndex
CREATE UNIQUE INDEX "relacao_agrd_func_funcionario_id_key" ON "relacao_agrd_func"("funcionario_id");

-- CreateIndex
CREATE UNIQUE INDEX "voucher_passageiro_voucher_id_passageiro_id_key" ON "voucher_passageiro"("voucher_id", "passageiro_id");

-- AddForeignKey
ALTER TABLE "admin_usuario" ADD CONSTRAINT "admin_usuario_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "centro_custo_cliente" ADD CONSTRAINT "centro_custo_cliente_empresa_cliente_id_fkey" FOREIGN KEY ("empresa_cliente_id") REFERENCES "empresa_cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "centro_custo_cliente" ADD CONSTRAINT "centro_custo_cliente_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empresa_cliente" ADD CONSTRAINT "empresa_cliente_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "motorista" ADD CONSTRAINT "motorista_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carro" ADD CONSTRAINT "carro_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carro" ADD CONSTRAINT "carro_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "motorista"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo" ADD CONSTRAINT "modelo_marca_id_fkey" FOREIGN KEY ("marca_id") REFERENCES "marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidade_empresa_cliente" ADD CONSTRAINT "unidade_empresa_cliente_empresa_cliente_id_fkey" FOREIGN KEY ("empresa_cliente_id") REFERENCES "empresa_cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidade_empresa_cliente" ADD CONSTRAINT "unidade_empresa_cliente_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitante" ADD CONSTRAINT "solicitante_empresa_cliente_id_fkey" FOREIGN KEY ("empresa_cliente_id") REFERENCES "empresa_cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitante" ADD CONSTRAINT "solicitante_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "passageiro" ADD CONSTRAINT "passageiro_empresa_cliente_id_fkey" FOREIGN KEY ("empresa_cliente_id") REFERENCES "empresa_cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "passageiro" ADD CONSTRAINT "passageiro_centro_custo_cliente_id_fkey" FOREIGN KEY ("centro_custo_cliente_id") REFERENCES "centro_custo_cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rota" ADD CONSTRAINT "rota_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rota" ADD CONSTRAINT "rota_empresa_cliente_id_fkey" FOREIGN KEY ("empresa_cliente_id") REFERENCES "empresa_cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedagio" ADD CONSTRAINT "pedagio_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rota_valor" ADD CONSTRAINT "rota_valor_rota_id_fkey" FOREIGN KEY ("rota_id") REFERENCES "rota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rota_valor" ADD CONSTRAINT "rota_valor_empresa_cliente_id_fkey" FOREIGN KEY ("empresa_cliente_id") REFERENCES "empresa_cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rota_valor" ADD CONSTRAINT "rota_valor_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rota_valor" ADD CONSTRAINT "rota_valor_valor_pedagio_fkey" FOREIGN KEY ("valor_pedagio") REFERENCES "pedagio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_fixo" ADD CONSTRAINT "modelo_voucher_fixo_empresa_cliente_id_fkey" FOREIGN KEY ("empresa_cliente_id") REFERENCES "empresa_cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_fixo" ADD CONSTRAINT "modelo_voucher_fixo_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_fixo" ADD CONSTRAINT "modelo_voucher_fixo_carro_id_fkey" FOREIGN KEY ("carro_id") REFERENCES "carro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_fixo" ADD CONSTRAINT "modelo_voucher_fixo_admin_usuario_id_fkey" FOREIGN KEY ("admin_usuario_id") REFERENCES "admin_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_fixo" ADD CONSTRAINT "modelo_voucher_fixo_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_turno" ADD CONSTRAINT "modelo_voucher_turno_empresa_cliente_id_fkey" FOREIGN KEY ("empresa_cliente_id") REFERENCES "empresa_cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_turno" ADD CONSTRAINT "modelo_voucher_turno_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_turno" ADD CONSTRAINT "modelo_voucher_turno_carro_id_fkey" FOREIGN KEY ("carro_id") REFERENCES "carro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_turno" ADD CONSTRAINT "modelo_voucher_turno_admin_usuario_id_fkey" FOREIGN KEY ("admin_usuario_id") REFERENCES "admin_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelo_voucher_turno" ADD CONSTRAINT "modelo_voucher_turno_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relacao_agrd_func" ADD CONSTRAINT "relacao_agrd_func_agregado_id_fkey" FOREIGN KEY ("agregado_id") REFERENCES "motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relacao_agrd_func" ADD CONSTRAINT "relacao_agrd_func_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relacao_agrd_func" ADD CONSTRAINT "relacao_agrd_func_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_passageiro" ADD CONSTRAINT "voucher_passageiro_voucher_id_fkey" FOREIGN KEY ("voucher_id") REFERENCES "voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_passageiro" ADD CONSTRAINT "voucher_passageiro_passageiro_id_fkey" FOREIGN KEY ("passageiro_id") REFERENCES "passageiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_modelo_fixo_id_fkey" FOREIGN KEY ("modelo_fixo_id") REFERENCES "modelo_voucher_fixo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_modelo_turno_id_fkey" FOREIGN KEY ("modelo_turno_id") REFERENCES "modelo_voucher_turno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_rota_id_fkey" FOREIGN KEY ("rota_id") REFERENCES "rota"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_empresa_cliente_id_fkey" FOREIGN KEY ("empresa_cliente_id") REFERENCES "empresa_cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_unidade_cliente_id_fkey" FOREIGN KEY ("unidade_cliente_id") REFERENCES "unidade_empresa_cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_carro_id_fkey" FOREIGN KEY ("carro_id") REFERENCES "carro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_admin_usuario_id_fkey" FOREIGN KEY ("admin_usuario_id") REFERENCES "admin_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_solicitante_id_fkey" FOREIGN KEY ("solicitante_id") REFERENCES "solicitante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_operadora_id_fkey" FOREIGN KEY ("operadora_id") REFERENCES "operadora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
