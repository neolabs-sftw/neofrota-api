import { CentroCustoCliente } from "@prisma/client";
import { prisma } from "../../prisma";

export const CentroCustoResolvers = {
  Query: {
    centroCustoId: (parent: any, args: any) =>
      prisma.centroCustoCliente.findUnique({
        where: { id: Number(args.id) },
      }),
    centroCustoEmpresaClienteId: (parent: any, args: any) =>
      prisma.centroCustoCliente.findMany({
        where: { empresaClienteId: Number(args.id) },
        orderBy: {nome: "asc"}
      }),
  },
  CentroCusto: {
    id: (parent: CentroCustoCliente) => String(parent.id),
    empresaClienteId: (parent: CentroCustoCliente) => {
      if (!parent.empresaClienteId) return null;
      return prisma.empresaCliente.findUnique({
        where: { id: parent.empresaClienteId },
      });
    },
    operadoraId: (parent: CentroCustoCliente) => {
      if (!parent.operadoraId) return null;
      return prisma.operadora.findUnique({ where: { id: parent.operadoraId } });
    },
  },
  Mutation: {
    createCentroCusto: (_parent: any, args: any) =>
      prisma.centroCustoCliente.create({ data: args.input }),

    updateCentroCusto: (_parent: any, args: { id: string; input: any }) =>
      prisma.centroCustoCliente.update({
        where: { id: Number(args.id) },
        data: args.input,
      }),

    deleteCentroCusto: (_parent: any, args: any) =>
      prisma.centroCustoCliente.delete({ where: { id: Number(args.id) } }),
  },
};
