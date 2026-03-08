import { Solicitante } from "@prisma/client";
import { prisma } from "../../prisma";

export const solicitanteResolvers = {
  Query: {
    solicitantes: () => prisma.solicitante.findMany(),
    solicitanteId: (parent: any, args: any) =>
      prisma.solicitante.findUnique({ where: { id: Number(args.id) } }),
    solicitantesEmpresaClienteId: (parent: any, args: any) =>
      prisma.solicitante.findMany({
        where: { empresaClienteId: Number(args.id) },
        orderBy: { nome: "asc" },
      }),
  },
  Solicitante: {
    id: (parent: Solicitante) => String(parent.id),
    operadoraId: (parent: Solicitante) => {
      if (!parent.operadoraId) return null;
      return prisma.operadora.findUnique({ where: { id: parent.operadoraId } });
    },
    empresaClienteId: (parent: Solicitante) =>
      prisma.empresaCliente.findUnique({
        where: { id: parent.empresaClienteId },
      }),
  },
  Mutation: {
    createSolicitante: (_parent: any, args: any) =>
      prisma.solicitante.create({ data: args.input }),
    updateSolicitante: (_parent: any, args: any) =>
      prisma.solicitante.update({
        where: { id: Number(args.id) },
        data: args.input,
      }),
    deleteSolicitante: (_parent: any, args: any) =>
      prisma.solicitante.delete({ where: { id: Number(args.id) } }),
  },
};
