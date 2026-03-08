import { Motorista } from "@prisma/client";
import { prisma } from "../../prisma";

import jwt from "jsonwebtoken";

const JWT_SECRET = "MINHA_CHAVE_SECRETA_SUPER_SECRETA";

export const motoristaResolvers = {
  Query: {
    motoristas() {
      return prisma.motorista.findMany();
    },
    motorista(_: any, args: { id: any }) {
      return prisma.motorista.findUnique({
        where: { id: Number(args.id) },
      });
    },
    motoristasAgregados(_: any, { operadoraId }: { operadoraId: any }) {
      return prisma.motorista.findMany({
        where: { tipoMotorista: "Agregado", operadoraId: Number(operadoraId) },
      });
    },
    motoristasOperadora(
      _: any,
      args: {
        id: any;
        orderBy?: {
          field: "nome" | "email" | "dataCriacao";
          direction: "asc" | "desc";
        };
      },
    ) {
      let orderByClause = {};

      // Converter campo para snake_case para o Prisma
      const fieldMap = {
        nome: "nome",
        email: "email",
        dataCriacao: "data_criacao",
      };

      if (args.orderBy) {
        const prismaField = fieldMap[args.orderBy.field] || args.orderBy.field;
        orderByClause = {
          [prismaField]: args.orderBy.direction,
        };
      } else {
        orderByClause = {
          nome: "asc",
        };
      }

      return prisma.motorista.findMany({
        where: { operadoraId: Number(args.id) },
        orderBy: orderByClause,
      });
    },
  },

  Motorista: {
    id: (obj: Motorista) => String(obj.id),
    operadoraId: (obj: Motorista) => {
      if (!obj.operadoraId) return null;
      return prisma.operadora.findUnique({
        where: { id: obj.operadoraId },
      });
    },
    vCnh: (obj: Motorista) => {
      if (!obj.vCnh) return null;
      return new Date(obj.vCnh);
    },
    statusCnh: (parent: Motorista) => {
      // Usar o campo vCnh em camelCase
      if (!parent.vCnh) {
        return false;
      }

      const hoje = new Date();
      const dataVencimento = new Date(parent.vCnh);
      const dataGatilho = new Date(dataVencimento);
      dataGatilho.setDate(dataVencimento.getDate() - 1);

      return hoje < dataGatilho;
    },
    statusMotorista: (parent: Motorista) => {
      return parent.statusMotorista;
    },
    dataCriacao: (parent: Motorista) => {
      return parent.dataCriacao
        ? new Date(parent.dataCriacao).toISOString()
        : null;
    },
  },

  Mutation: {
    createMotorista: async (_: any, args: any) => {
      const {
        nome,
        email,
        fotoMotorista,
        cpf,
        cnh,
        vCnh,
        tipoMotorista,
        operadoraId,
      } = args.input;

      return await prisma.motorista.create({
        data: {
          nome,
          email,
          fotoMotorista,
          cpf,
          cnh,
          vCnh: new Date(vCnh),
          tipoMotorista,
          operadoraId: parseInt(operadoraId),
        },
      });
    },
    updateMotorista: async (_: any, args: any) => {
      const { vCnh, operadoraId } = args.input;

      return prisma.motorista.update({
        where: { id: parseInt(args.id) },
        data: {
          ...args.input,
          vCnh: vCnh ? new Date(vCnh) : undefined,
          operadoraId: operadoraId ? parseInt(operadoraId) : undefined,
        },
      });
    },
    deleteMotorista: async (_: any, id: string, email: string) => {
      return prisma.motorista.update({
        where: { id: parseInt(id) },
        data: {
          tipoMotorista: "Excluido",
          statusMotorista: false,
          email,
        },
      });
    },

    loginMotorista: async (
      _: any,
      { email, senha }: { email: string; senha: string },
    ) => {
      const motorista = await prisma.motorista.findUnique({
        where: { email },
      });

      if (!motorista) {
        throw new Error("Email ou senha inválidos.");
      }

      // Valida senha com bcrypt

      const isValid = motorista.senha === senha;
      if (!isValid) {
        throw new Error("Email ou senha inválidos.");
      }

      // Gera token
      const token = jwt.sign(
        {
          motoristaId: motorista.id.toString(),
          operadoraId: motorista.operadoraId?.toString(),
        },
        JWT_SECRET,
      );

      return {
        token,
      };
    },
  },
};
