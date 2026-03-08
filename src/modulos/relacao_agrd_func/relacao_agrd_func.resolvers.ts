import { RelacaoAgrdFunc } from "@prisma/client";
import { prisma } from "../../prisma";

export const relacaoAgrdFuncResolvers = {
  Query: {
    relacaoAgrdFuncs() {
      return prisma.relacaoAgrdFunc.findMany();
    },
    listaFuncionariosAgregadoId: async (_: any, { id }: any) =>
      await prisma.relacaoAgrdFunc.findMany({ where: { agregadoId: id } }),

    relacaoAgrdFuncId(_: any, { id }: any) {
      return prisma.relacaoAgrdFunc.findUnique({
        where: { funcionarioId: id },
      });
    },
  },

  RelacaoAgrdFunc: {
    id(relacaoAgrdFunc: RelacaoAgrdFunc) {
      return String(relacaoAgrdFunc.id);
    },
    operadoraId(relacaoAgrdFunc: RelacaoAgrdFunc) {
      if (!relacaoAgrdFunc.operadoraId) return null;
      return prisma.operadora.findUnique({
        where: { id: relacaoAgrdFunc.operadoraId },
      });
    },
    motoristaComoFuncionario: (relacaoAgrdFunc: RelacaoAgrdFunc) =>
      prisma.motorista.findUnique({
        where: { id: relacaoAgrdFunc.funcionarioId },
      }),

    motoristaComoAgregado: (relacaoAgrdFunc: RelacaoAgrdFunc) =>
      prisma.motorista.findUnique({
        where: { id: relacaoAgrdFunc.agregadoId },
      }),
  },

  Mutation: {
    createRelacaoAgrdFunc: async (_: any, { input }: any) => {
      const { agregadoId, funcionarioId, operadoraId } = input;
      return await prisma.relacaoAgrdFunc.create({
        data: {
          agregadoId: Number(agregadoId),
          funcionarioId: Number(funcionarioId),
          operadoraId: Number(operadoraId),
        },
      });
    },
    updateRelacaoAgrdFunc: async (_: any, { id, input }: any) =>
      await prisma.relacaoAgrdFunc.update({ where: { id }, data: input }),
    deleteRelacaoAgrdFunc: async (_: any, { id }: any) =>
      await prisma.relacaoAgrdFunc.delete({ where: { id } }),
  },
};
