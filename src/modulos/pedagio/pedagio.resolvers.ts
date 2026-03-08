import { Pedagio } from "@prisma/client";
import { prisma } from "../../prisma";

export const pedagioResolvers = {
  Query: {
    pedagios: () => {
      return prisma.pedagio.findMany();
    },
    pedagioOperadoraId: (_:any, args: any) => {
      return prisma.pedagio.findMany({
        where: {
          operadoraId: args.id,
        }, 
      });
    },
    pedagioId: (_: any, args: any) => {
      return prisma.pedagio.findUnique({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
  Pedagio: {
    operadoraId: (parent: Pedagio) => {
      return prisma.operadora.findUnique({
        where: {
          id: parent.operadoraId,
        },
      });
    },
  },
  Mutation: {
    createPedagio: (_: any, args: any) => {
      return prisma.pedagio.create({
        data: args.data,
      });
    },
  },
};
