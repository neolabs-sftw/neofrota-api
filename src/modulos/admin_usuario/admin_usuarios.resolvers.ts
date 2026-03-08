import { AdminUsuario } from "@prisma/client";
import { prisma } from "../../prisma";

import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

const JWT_SECRET = "MINHA_CHAVE_SECRETA_SUPER_SECRETA";

export const adminUsuarioResolvers = {
  Query: {
    adminUsuarios() {
      return prisma.adminUsuario.findMany();
    },
    adminUsuario: async (_: any, { id }: { id: string }) => {
      const adm = await prisma.adminUsuario.findUnique({
        where: { id: parseInt(id) },
      });
      return adm;
    },
    adminUsuariosByOperadora(_: any, args: { operadoraId: string }) {
      return prisma.adminUsuario.findMany({
        where: { operadoraId: parseInt(args.operadoraId) },
        orderBy: { nome: "asc" },
      });
    },
  },

  AdminUsuario: {
    id: (parent: AdminUsuario) => String(parent.id),
    operadora: (parent: AdminUsuario) => {
      if (!parent.operadoraId) return null;
      return prisma.operadora.findUnique({
        where: { id: parent.operadoraId },
      });
    },
    dataCriacao: (parent: AdminUsuario) => {
      return parent.dataCriacao
        ? new Date(parent.dataCriacao).toISOString()
        : null;
    },
  },

  Mutation: {
    createAdminUsuario: async (_: any, { data }: any) => {
      return prisma.adminUsuario.create({
        data: {
          ...data,
          operadoraId: data.operadoraId ? parseInt(data.operadoraId) : null,
        },
      });
    },

    updateAdminUsuario: async (_: any, { id, data }: any) => {
      return prisma.adminUsuario.update({
        where: { id: parseInt(id) },
        data: {
          ...data,
          operadoraId: data.operadoraId ? parseInt(data.operadoraId) : null,
        },
      });
    },

    deleteAdminUsuario: async (_: any, { id }: any) => {
      return prisma.adminUsuario.delete({
        where: { id: parseInt(id) },
      });
    },

    login: async (
      _: any,
      { email, senha }: { email: string; senha: string }
    ) => {
      const adminUsuario = await prisma.adminUsuario.findUnique({
        where: { email },
      });

      if (!adminUsuario) {
        throw new Error("Email ou senha inválidos.");
      }

      // Comparação de senha (ajuste conforme sua implementação real)
      const isValid = adminUsuario.senha === senha;

      if (!isValid) {
        throw new Error("Email ou senha inválidos.");
      }

      const token = jwt.sign(
        {
          adminUsuarioId: adminUsuario.id.toString(),
          operadoraId: adminUsuario.operadoraId?.toString(),
          role: adminUsuario.funcao,
        },
        JWT_SECRET,
        { expiresIn: "18h" }
      );

      return {
        token,
        adminUsuario,
      };
    },
  },

  AuthPayload: {
    adminUsuario: (parent: { adminUsuario: AdminUsuario }) => ({
      ...parent.adminUsuario,
      id: String(parent.adminUsuario.id),
    }),
  },
};
