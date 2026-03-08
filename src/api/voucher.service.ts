
import { prisma } from '../prisma';

export const executarCriacaoVoucher = async (input: any) => {
  const { passageiros, ...voucherData } = input;

  try {
    return await prisma.voucher.create({
      data: {
        ...voucherData,
        // Conversões necessárias para o Prisma/Postgres
        empresaClienteId: BigInt(voucherData.empresaClienteId),
        unidadeClienteId: BigInt(voucherData.unidadeClienteId),
        motoristaId: BigInt(voucherData.motoristaId),
        solicitanteId: BigInt(voucherData.solicitanteId),
        adminUsuarioId: BigInt(voucherData.adminUsuarioId),
        operadoraId: BigInt(voucherData.operadoraId),
        carroId: parseInt(voucherData.carroId),
        modeloFixoId: voucherData.modeloFixoId ? parseInt(voucherData.modeloFixoId) : undefined,
        modeloTurnoId: voucherData.modeloTurnoId ? parseInt(voucherData.modeloTurnoId) : undefined,
        rotaId: voucherData.rotaId ? parseInt(voucherData.rotaId) : undefined,
        
        passageiros: {
          create: passageiros.map((p: any) => ({
            passageiroId: BigInt(p.passageiroId),
            horarioEmbarqueReal: p.horarioEmbarqueReal,
            rateio: p.rateio ? parseFloat(p.rateio) : undefined,
            statusPresenca: p.statusPresenca || "Agendado",
          })),
        },
      },
    });
  } catch (error) {
    console.error("Erro ao criar voucher via Cron:", error);
    throw error;
  }
};