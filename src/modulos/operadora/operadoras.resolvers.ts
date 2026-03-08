import { Operadora } from "@prisma/client";
import { prisma } from "../../prisma";

export const operadoraResolvers = {
  Query: {
    operadoras() {
      return prisma.operadora.findMany();
      // return listOperadoras;
    },

    async operadoraId(_: any, args: { id: string }) {
      return prisma.operadora.findUnique({
        where: { id: parseInt(args.id, 10) },
      });
    },
  },
  Operadora: {
    id: (parent: Operadora) => {
      return String(parent.id);
    },
    dataCriacao: (parent: Operadora) => {
      return parent.dataCriacao
        ? new Date(parent.dataCriacao).toISOString()
        : null;
    },
  },
  Mutation: {
    async createOperadora(_: any, args: { data: any }) {
      console.log("🚨 args.data:", args.data) ;
      return prisma.operadora.create({ data: args.data });
    },
    async updateOperadora(_: any, args: { id: string; data: any }) {
      return prisma.operadora.update({
        where: { id: parseInt(args.id, 10) },
        data: args.data,
      });
    },
    async deleteOperadora(_: any, args: { id: string }) {
      return prisma.operadora.delete({ where: { id: parseInt(args.id, 10) } });
    },
  },
};
