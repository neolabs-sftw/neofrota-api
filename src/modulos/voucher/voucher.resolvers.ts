import { VoucherPassageiro } from "@prisma/client";
import { prisma } from "../../prisma";

export const voucherResolvers = {
  Query: {
    voucher: async (_: any, { id }: any) => {
      const v = await prisma.voucher.findUnique({
        where: { id: parseInt(id) },
        include: {
          empresaCliente: true,
          unidadeCliente: true,
          motorista: true,
          carro: true,
          adminUsuario: true,
          solicitante: true,
          operadora: true,
          modeloFixo: true,
          modeloTurno: true,
          rota: true,
          passageiros: {
            include: {
              passageiro: true,
              voucher: true,
            },
          },
        },
      });
      return v;
    },
    vouchers: async (_: any, { operadoraId, filter, limit, offset }: any) => {
      try {
        const where: any = {};
        if (operadoraId) where.operadoraId = operadoraId;
        if (filter?.status) where.status = filter.status;
        if (filter?.natureza) where.natureza = filter.natureza;
        if (filter?.motoristaId) where.motoristaId = BigInt(filter.motoristaId);

        return await prisma.voucher.findMany({
          where,
          take: limit,
          skip: offset,
          include: {
            empresaCliente: true,
            unidadeCliente: true,
            motorista: true,
            carro: true,
            adminUsuario: true,
            solicitante: true,
            operadora: true,
            modeloFixo: true,
            modeloTurno: true,
            rota: true,
            passageiros: {
              include: {
                passageiro: true,
                voucher: true,
              },
            },
          },
          orderBy: { dataHoraProgramado: "asc" },
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    voucherOperadoraData: async (
      _: any,
      args: { operadoraId: any; diaSelecionado: string },
    ) => {
      function formatarDiaSelecionado(dayYYYYMMDD: string) {
        const start = new Date(`${dayYYYYMMDD}T00:00:00.000Z`);
        const end = new Date(start);
        end.setUTCDate(end.getUTCDate() + 1);
        return { start, end };
      }

      const { start, end } = formatarDiaSelecionado(args.diaSelecionado);

      return await prisma.voucher.findMany({
        where: {
          AND: [
            { operadoraId: args.operadoraId },
            { dataHoraProgramado: { gte: start, lt: end } },
          ],
        },
        orderBy: { dataHoraProgramado: "asc" },
        include: {
          empresaCliente: true,
          unidadeCliente: true,
          motorista: true,
          carro: true,
          adminUsuario: true,
          solicitante: true,
          operadora: true,
          modeloFixo: true,
          modeloTurno: true,
          rota: true,
          passageiros: {
            include: {
              passageiro: true,
              voucher: true,
            },
          },
        },
      });
    },
    vouchersMotoristaData: async (
      _: any,
      args: { motoristaId: any; diaSelecionado: string },
    ) => {
      function formatarDiaSelecionado(dayYYYYMMDD: string) {
        const start = new Date(`${dayYYYYMMDD}T00:00:00.000Z`);
        const end = new Date(start);
        end.setUTCDate(end.getUTCDate() + 1);
        return { start, end };
      }
      const { start, end } = formatarDiaSelecionado(args.diaSelecionado);

      return await prisma.voucher.findMany({
        where: {
          AND: [
            { motoristaId: args.motoristaId },
            { dataHoraProgramado: { gte: start, lt: end } },
          ],
        },
        include: {
          empresaCliente: true,
          unidadeCliente: true,
          motorista: true,
          carro: true,
          adminUsuario: true,
          solicitante: true,
          operadora: true,
          modeloFixo: true,
          modeloTurno: true,
          rota: true,
          passageiros: {
            include: {
              passageiro: true,
              voucher: true,
            },
          },
        },
      });
    },

    vouchersPorMotorista: async (_: any, { motoristaId }: any) => {
      try {
        return await prisma.voucher.findMany({
          where: { motoristaId: BigInt(motoristaId) },
          include: {
            empresaCliente: true,
            unidadeCliente: true,
            motorista: true,
            carro: true,
            adminUsuario: true,
            solicitante: true,
            operadora: true,
            modeloFixo: true,
            modeloTurno: true,
            rota: true,
            passageiros: {
              include: {
                passageiro: true,
                voucher: true,
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    voucherPassageiro: async (_: any, { id }: any) => {
      try {
        return await prisma.voucherPassageiro.findUnique({
          where: { id: parseInt(id) },
          include: {
            voucher: true,
            passageiro: true,
          },
        });
      } catch (error) {
        throw error;
      }
    },
    voucherPassageiros: async (_: any) => {
      try {
        return await prisma.voucherPassageiro.findMany({
          include: {
            voucher: true,
            passageiro: true,
          },
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },

  Voucher: {
    id: (parent: any) => String(parent.id),
    empresaClienteId: (parent: any) => String(parent.empresaClienteId),
    unidadeClienteId: (parent: any) => String(parent.unidadeClienteId),
    passageiros: async (parent: any) => {
      return await prisma.voucherPassageiro.findMany({
        where: { voucherId: parent.id },
        include: {
          passageiro: true,
        },
      });
    },
  },

  VoucherPassageiro: {
    id: (parent: VoucherPassageiro) => String(parent.id),
    voucherId: async (parent: VoucherPassageiro) => {
      return await prisma.voucher.findUnique({
        where: { id: parent.voucherId },
      });
    },
    passageiroId: async (parent: VoucherPassageiro) => {
      return await prisma.passageiro.findUnique({
        where: { id: parent.passageiroId },
      });
    },
  },

  Mutation: {
    criarVoucher: async (_: any, { input }: any) => {
      const { passageiros, ...voucherData } = input;

      try {
        return await prisma.voucher.create({
          data: {
            ...voucherData,
            empresaClienteId: BigInt(voucherData.empresaClienteId),
            unidadeClienteId: BigInt(voucherData.unidadeClienteId),
            motoristaId: BigInt(voucherData.motoristaId),
            solicitanteId: BigInt(voucherData.solicitanteId),
            adminUsuarioId: BigInt(voucherData.adminUsuarioId),
            operadoraId: BigInt(voucherData.operadoraId),
            carroId: parseInt(voucherData.carroId),
            modeloFixoId: voucherData.modeloFixoId
              ? parseInt(voucherData.modeloFixoId)
              : undefined,
            modeloTurnoId: voucherData.modeloTurnoId
              ? parseInt(voucherData.modeloTurnoId)
              : undefined,
            rotaId: voucherData.rotaId
              ? parseInt(voucherData.rotaId)
              : undefined,
            passageiros: {
              create: passageiros.map((p: any) => ({
                passageiroId: BigInt(p.passageiroId),
                horarioEmbarqueReal: p.horarioEmbarqueReal,
                rateio: p.rateio ? parseFloat(p.rateio) : undefined,
                statusPresenca: p.statusPresenca || "Agendado",
              })),
            },
          },
          include: {
            empresaCliente: true,
            unidadeCliente: true,
            motorista: true,
            carro: true,
            adminUsuario: true,
            solicitante: true,
            operadora: true,
            modeloFixo: true,
            modeloTurno: true,
            rota: true,
            passageiros: true,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },

    editarVoucher: async (_: any, { input }: any) => {
      const { id, passageiros, ...updateData } = input;

      try {
        // Atualiza o Voucher principal
        await prisma.voucher.update({
          where: { id: parseInt(id) },
          data: {
            ...updateData,
            empresaClienteId: updateData.empresaClienteId
              ? BigInt(updateData.empresaClienteId)
              : undefined,
            unidadeClienteId: updateData.unidadeClienteId
              ? BigInt(updateData.unidadeClienteId)
              : undefined,
            motoristaId: updateData.motoristaId
              ? BigInt(updateData.motoristaId)
              : undefined,
            solicitanteId: updateData.solicitanteId
              ? BigInt(updateData.solicitanteId)
              : undefined,
            adminUsuarioId: updateData.adminUsuarioId
              ? BigInt(updateData.adminUsuarioId)
              : undefined,
            operadoraId: updateData.operadoraId
              ? BigInt(updateData.operadoraId)
              : undefined,
            carroId: updateData.carroId
              ? parseInt(updateData.carroId)
              : undefined,
            modeloFixoId: updateData.modeloFixoId
              ? parseInt(updateData.modeloFixoId)
              : undefined,
            modeloTurnoId: updateData.modeloTurnoId
              ? parseInt(updateData.modeloTurnoId)
              : undefined,
            rotaId: updateData.rotaId ? parseInt(updateData.rotaId) : undefined,
          },
          include: {
            passageiros: true,
          },
        });

        // Atualiza os VoucherPassageiro se fornecidos
        if (passageiros && passageiros.length > 0) {
          for (const p of passageiros) {
            await prisma.voucherPassageiro.update({
              where: { id: parseInt(p.id) },
              data: {
                horarioEmbarqueReal: p.horarioEmbarqueReal,
                rateio: p.rateio ? parseFloat(p.rateio) : undefined,
                statusPresenca: p.statusPresenca,
              },
            });
          }
        }

        // Retorna o Voucher atualizado com includes
        return await prisma.voucher.findUnique({
          where: { id: parseInt(id) },
          include: {
            empresaCliente: true,
            unidadeCliente: true,
            motorista: true,
            carro: true,
            adminUsuario: true,
            solicitante: true,
            operadora: true,
            modeloFixo: true,
            modeloTurno: true,
            rota: true,
            passageiros: true,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },

    deletarVoucher: async (_: any, { id }: any) => {
      try {
        // Deleta os VoucherPassageiro associados primeiro
        await prisma.voucherPassageiro.deleteMany({
          where: { voucherId: parseInt(id) },
        });

        await prisma.voucher.delete({
          where: { id: parseInt(id) },
        });

        return true;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
