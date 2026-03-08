import { RotaValor } from "@prisma/client";
import { prisma } from "../../prisma";

export const rotaValorResolvers = {
  Query: {
    rotaValores: () => {
      return prisma.rotaValor.findMany();
    },
    rotaValorId: (_: any, args: any) => {
      return prisma.rotaValor.findUnique({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
  RotaValor: {
    rotaId: (parent: RotaValor) => {
      return prisma.rota.findUnique({
        where: { id: Number(parent.rotaId) },
      });
    },
    empresaClienteId: (parent: RotaValor) => {
      if (!parent.empresaClienteId) return null;
      return prisma.empresaCliente.findUnique({
        where: {
          id: parent.empresaClienteId,
        },
      });
    },
    operadoraId: (parent: RotaValor) => {
      if (!parent.operadoraId) return null;
      return prisma.operadora.findUnique({
        where: {
          id: parent.operadoraId,
        },
      });
    },
    valorPedagio: (parent: RotaValor) => {
      if (parent.valorPedagio === null) return null;
      return prisma.pedagio.findFirst({
        where: {
          id: parent.valorPedagio,
        },
      });
    },
  },
  Mutation: {
    createRotaValor: (_: any, args: any) =>
      prisma.rotaValor.create({ data: args.data }),
    updateRotaValor: (_: any, args: any) =>
      prisma.rotaValor.update({
        where: { id: Number(args.id) },
        data: args.data,
      }),
    deleteRotaValor: (_: any, args: any) =>
      prisma.rotaValor.delete({ where: { id: Number(args.id) } }),
  },
};
