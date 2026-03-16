-- AlterTable
ALTER TABLE "modelo_voucher_fixo" ALTER COLUMN "valor_viagem" DROP NOT NULL,
ALTER COLUMN "valor_viagem_repasse" DROP NOT NULL,
ALTER COLUMN "valor_deslocamento" DROP NOT NULL,
ALTER COLUMN "valor_deslocamento_repasse" DROP NOT NULL,
ALTER COLUMN "valor_hora_parada" DROP NOT NULL,
ALTER COLUMN "valor_hora_parada_repasse" DROP NOT NULL;

-- AlterTable
ALTER TABLE "modelo_voucher_turno" ALTER COLUMN "valor_viagem" DROP NOT NULL,
ALTER COLUMN "valor_viagem_repasse" DROP NOT NULL,
ALTER COLUMN "valor_pedagio" DROP NOT NULL,
ALTER COLUMN "valor_pedagio_repasse" DROP NOT NULL,
ALTER COLUMN "valor_estacionamento" DROP NOT NULL,
ALTER COLUMN "valor_estacionamento_repasse" DROP NOT NULL,
ALTER COLUMN "valor_tempo_parado" DROP NOT NULL,
ALTER COLUMN "valor_tempo_parado_repasse" DROP NOT NULL,
ALTER COLUMN "data_inicio" DROP NOT NULL;

-- AlterTable
ALTER TABLE "voucher" ALTER COLUMN "valor_viagem" DROP NOT NULL,
ALTER COLUMN "valor_viagem_repasse" DROP NOT NULL,
ALTER COLUMN "valor_deslocamento" DROP NOT NULL,
ALTER COLUMN "valor_deslocamento_repasse" DROP NOT NULL,
ALTER COLUMN "valor_hora_parada" DROP NOT NULL,
ALTER COLUMN "valor_hora_parada_repasse" DROP NOT NULL,
ALTER COLUMN "valor_estacionamento" DROP NOT NULL,
ALTER COLUMN "valor_pedagio" DROP NOT NULL;
