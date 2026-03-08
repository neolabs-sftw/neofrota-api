import { EmpresaCliente } from "@prisma/client";
import { prisma } from "../../prisma";

export const empresaClienteResolvers = {
  Query: {
    empresasClientes() {
      return prisma.empresaCliente.findMany();
    },
    empresaClienteId(_: any, args: { id: any }) {
      return prisma.empresaCliente.findUnique({
        where: { id: parseInt(args.id) },
      });
    },
    empresaClienteOper(_: any, { operadoraId }: { operadoraId: any }) {
      return prisma.empresaCliente.findMany({
        where: { operadoraId: parseInt(operadoraId) },
        orderBy: { nome: "asc" },
      });
    },
  },
  EmpresaCliente: {
    operadoraId(obj: EmpresaCliente) {
      if (!obj.operadoraId) return null;
      return prisma.operadora.findUnique({
        where: { id: obj.operadoraId },
      });
    },
    id: (obj: EmpresaCliente) => {
      return String(obj.id);
    },
  },
  Mutation: {
    async createEmpresaCliente(_: any, { data }: { data: any }) {
      const { nome, rSocial, cnpj, fotoLogoCliente, operadoraId } = data;

      const empresaCliente = await prisma.empresaCliente.create({
        data: {
          nome,
          rSocial,
          cnpj,
          fotoLogoCliente,
          operadoraId: parseInt(operadoraId),
        },
      });
      return empresaCliente;
    },
    async updateEmpresaCliente(_: any, { id, data }: { id: any; data: any }) {
      const {
        nome,
        rSocial,
        cnpj,
        fotoLogoCliente,
        operadoraId,
        statusCliente,
      } = data;
      const empresaCliente = await prisma.empresaCliente.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          rSocial,
          cnpj,
          fotoLogoCliente,
          statusCliente,
          operadoraId: parseInt(operadoraId),
        },
      });
      return empresaCliente;
    },
    async deleteEmpresaCliente(_: any, { id }: { id: any }) {
      const empresaCliente = await prisma.empresaCliente.delete({
        where: { id: parseInt(id) },
      });
      return empresaCliente;
    },
  },
};
