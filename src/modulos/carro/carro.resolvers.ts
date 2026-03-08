import {Carro, Modelo } from "@prisma/client";
import { prisma } from "../../prisma";

export const carroResolvers = {
  Query: {
    async carroId(_: any, { id }: { id: any }) {
      return prisma.carro.findUnique({ where: { id: parseInt(id) } });
    },

    async carros(_: any, { input }: { input: any }) {
      return prisma.carro.findMany({ where: input });
    },

    async marcas() {
      return prisma.marca.findMany();
    },

    async modelos(_: any, { marcaId }: { marcaId: any }) {
      return prisma.modelo.findMany({ where: { marcaId: marcaId } });
    },

    async carrosAgregadoId(_: any, { id }: { id: any }) {
      return prisma.carro.findMany({ where: { agregadoId: id } });
    },

    async carroMotoristaId(_: any, { idMotorista }: { idMotorista: any }) {
      return prisma.carro.findMany({ where: { motoristaId: idMotorista } });
    },
  },

  Modelo: {
    marcaId: async (modelo: Modelo) =>
      prisma.marca.findUnique({ where: { id: modelo.marcaId } }),
  },

  Carro: {
    motoristaId: (carro: Carro) => {
      if (!carro.motoristaId) return null;
      return prisma.motorista.findUnique({ where: { id: carro.motoristaId } });
    },
    agregadoId: (carro: Carro) => {
      if (!carro.agregadoId) return null;
      return prisma.motorista.findUnique({ where: { id: carro.agregadoId } });
    },
  },

  Mutation: {
    async createCarro(_: any, { data }: { data: any }) {
      return prisma.carro.create({ data });
    },

    async updateCarro(_: any, { id, data }: { id: any; data: any }) {
      const motoristaId = data.motoristaId;

      if (motoristaId) {
        const carroAntigo = await prisma.carro.findFirst({
          where: { motoristaId },
        });

        if (carroAntigo) {
          await prisma.carro.update({
            where: { id: carroAntigo.id },
            data: { motoristaId: null },
          });
        }
      }

      return prisma.carro.update({
        where: { id: parseInt(id) },
        data,
      });
    },

    async deleteCarro(_: unknown, { id }: { id: any }) {
      await prisma.carro.delete({ where: { id } });
      return true;
    },
  },
};
