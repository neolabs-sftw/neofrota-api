-- CreateTable
CREATE TABLE "modelo_voucher_fixo_passageiro" (
    "id" SERIAL NOT NULL,
    "modelo_fixo_id" INTEGER NOT NULL,
    "passageiro_id" BIGINT NOT NULL,

    CONSTRAINT "modelo_voucher_fixo_passageiro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "modelo_voucher_fixo_passageiro" ADD CONSTRAINT "modelo_voucher_fixo_passageiro_modelo_fixo_id_fkey" FOREIGN KEY ("modelo_fixo_id") REFERENCES "modelo_voucher_fixo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
