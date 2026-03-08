import { Passageiro } from "@prisma/client";
import { prisma } from "../../prisma";

export const passageirosResolvers = {
  Query: {
    async passageiros() {
      return await prisma.passageiro.findMany();
    },
    async passageiro(_: any, args: { id: string }) {
      return await prisma.passageiro.findUnique({
        where: { id: parseInt(args.id, 10) },
      });
    },
    async passageirosByCentroCustoCliente(
      _: any,
      args: { centroCustoClienteId: string },
    ) {
      return await prisma.passageiro.findMany({
        where: {
          centroCustoClienteId: parseInt(args.centroCustoClienteId, 10),
        },
      });
    },
    async passageirosByEmpresaCliente(
      _: any,
      args: { empresaClienteId: string },
    ) {
      return await prisma.passageiro.findMany({
        where: { empresaClienteId: parseInt(args.empresaClienteId, 10) },
        orderBy: { nome: "asc" },
      });
    },
  },
  Passageiro: {
    id: (parent: Passageiro) => {
      return String(parent.id);
    },
    centroCustoClienteId: async (parent: Passageiro) => {
      if (!parent.centroCustoClienteId) return null;
      return await prisma.centroCustoCliente.findUnique({
        where: { id: parent.centroCustoClienteId },
      });
    },
    empresaClienteId: async (parent: Passageiro) => {
      if (!parent.empresaClienteId) return null;
      return await prisma.empresaCliente.findUnique({
        where: { id: parent.empresaClienteId },
      });
    },
  },
  Mutation: {
    async createPassageiro(_: any, args: { input: any }) {
      return await prisma.passageiro.create({ data: args.input });
    },

    async updatePassageiro(_: any, args: { id: string; data: any }) {
      return await prisma.passageiro.update({
        where: { id: parseInt(args.id) },
        data: args.data,
      });
    },
    async deletePassageiro(_: any, args: { id: string }) {
      return await prisma.passageiro.delete({
        where: { id: parseInt(args.id, 10) },
      });
    },
  },
};
