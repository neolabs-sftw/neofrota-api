-- CreateEnum
CREATE TYPE "TipoLancamento" AS ENUM ('Credito', 'Desconto');

-- CreateTable
CREATE TABLE "lancamento_motorista" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "tipo" "TipoLancamento" NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motorista_id" BIGINT NOT NULL,
    "admin_usuario_id" BIGINT NOT NULL,

    CONSTRAINT "lancamento_motorista_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lancamento_motorista" ADD CONSTRAINT "lancamento_motorista_admin_usuario_id_fkey" FOREIGN KEY ("admin_usuario_id") REFERENCES "admin_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamento_motorista" ADD CONSTRAINT "lancamento_motorista_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "motorista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
