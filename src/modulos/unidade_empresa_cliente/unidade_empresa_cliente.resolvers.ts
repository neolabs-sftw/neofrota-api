import { UnidadeEmpresaCliente } from "@prisma/client";
import { prisma } from "../../prisma";

interface CreateUnidadeEmpresaClienteInput {
  nome: string;
  cnpj?: string;
  endRua?: string;
  endNumero?: string;
  endBairro?: string;
  endCep?: string;
  endCidade?: string;
  endComplemento?: string;
  endUf?: string;
  empresaClienteId: string;
  operadoraId: string;
}

export const unidadeEmpresaClienteResolvers = {
  Query: {
    unidadeEmpresaClientes() {
      return prisma.unidadeEmpresaCliente.findMany();
    },
    unidadeEmpresaClienteId(_: any, args: { id: string }) {
      {
        return prisma.unidadeEmpresaCliente.findUnique({
          where: { id: parseInt(args.id) },
        });
      }
    },
    listaUnidadesEmpresaClienteId(_: any, args: { id: any }) {
      {
        return prisma.unidadeEmpresaCliente.findMany({
          where: { empresaClienteId: parseInt(args.id) },
          orderBy: { nome: "asc" },
        });
      }
    },
    async unidadeMatrizEmpresaCliente(
      _: any,
      args: { empresaClienteId: string },
    ) {
      try {
        const listaUnidades = await prisma.unidadeEmpresaCliente.findMany({
          where: { empresaClienteId: parseInt(args.empresaClienteId) },
        });

        if (!listaUnidades || listaUnidades.length === 0) {
          return null;
        }

        const unidadeMatriz = listaUnidades.find(
          (unidade: UnidadeEmpresaCliente) => unidade.matriz === true,
        );
        if (!unidadeMatriz) {
          return null;
        }

        return {
          ...unidadeMatriz,
          id: unidadeMatriz.id.toString(),
        };
      } catch (error) {
        console.error("🚨 Erro ao buscar ou processar as unidades:", error);
        return null;
      }
    },
  },
  UnidadeEmpresaCliente: {
    id(unidadeEmpresaCliente: UnidadeEmpresaCliente) {
      return parseInt(unidadeEmpresaCliente.id.toString());
    },
    empresaClienteId(unidadeEmpresaCliente: UnidadeEmpresaCliente) {
      if (!unidadeEmpresaCliente.empresaClienteId) return null;
      return prisma.empresaCliente.findUnique({
        where: { id: unidadeEmpresaCliente.empresaClienteId },
      });
    },
    operadoraId(unidadeEmpresaCliente: UnidadeEmpresaCliente) {
      if (!unidadeEmpresaCliente.operadoraId) return null;
      return prisma.operadora.findUnique({
        where: { id: unidadeEmpresaCliente.operadoraId },
      });
    },
  },
  Mutation: {
    async createUnidadeEmpresaCliente(
      _: any,
      { input }: { input: CreateUnidadeEmpresaClienteInput },
    ) {
      try {
        const {
          nome,
          cnpj,
          endRua,
          endNumero,
          endBairro,
          endCep,
          endCidade,
          endComplemento,
          endUf,
          empresaClienteId,
          operadoraId,
        } = input;

        // Validar campos obrigatórios
        if (!empresaClienteId || !operadoraId) {
          throw new Error("empresaClienteId e operadoraId são obrigatórios");
        }

        return await prisma.unidadeEmpresaCliente.create({
          data: {
            nome: nome || "",
            cnpj: cnpj || "",
            endRua: endRua || "",
            endNumero: endNumero || "",
            endBairro: endBairro || "",
            endCep: endCep || "",
            endCidade: endCidade || "",
            endComplemento: endComplemento || "",
            endUf: endUf || "",
            empresaClienteId: BigInt(empresaClienteId),
            operadoraId: BigInt(operadoraId),
            statusUnidadeCliente: true, // Valor padrão
            matriz: false, // Valor padrão
          },
        });
      } catch (error) {
        console.error("Erro ao criar unidade:", error);
        throw new Error("Falha ao criar unidade");
      }
    },
    updateUnidadeEmpresaCliente: (
      _parent: any,
      args: { id: string; input: Partial<CreateUnidadeEmpresaClienteInput> },
    ) => {
      const { empresaClienteId, operadoraId, ...rest } = args.input;
      const data: any = { ...rest };
      if (empresaClienteId) {
        data.empresaClienteId = BigInt(empresaClienteId);
      }
      if (operadoraId) {
        data.operadoraId = BigInt(operadoraId);
      }
      return prisma.unidadeEmpresaCliente.update({
        where: { id: Number(args.id) },
        data,
      });
    },

    async definirUnidadeMatriz(_: any, { unidadeId }: { unidadeId: string }) {
      try {
        // 1. Primeiro, encontramos a unidade para saber a qual empresa ela pertence
        const unidade = await prisma.unidadeEmpresaCliente.findUnique({
          where: { id: parseInt(unidadeId) },
          select: { empresaClienteId: true }, // Trazemos apenas o ID da empresa para economizar memória
        });

        if (!unidade) {
          throw new Error("Unidade não encontrada.");
        }

        // 2. Usamos o $transaction para executar duas operações de uma vez com segurança
        const [todasAtualizadas, unidadeMatriz] = await prisma.$transaction([
          // Operação 1: Tira o status de matriz de TODAS as unidades desta empresa
          prisma.unidadeEmpresaCliente.updateMany({
            where: { empresaClienteId: unidade.empresaClienteId },
            data: { matriz: false },
          }),

          // Operação 2: Coloca o status de matriz APENAS na unidade escolhida
          prisma.unidadeEmpresaCliente.update({
            where: { id: parseInt(unidadeId) },
            data: { matriz: true },
          }),
        ]);

        // Retornamos a unidade que acabou de virar matriz
        return unidadeMatriz;
      } catch (error) {
        console.error("Erro ao definir matriz:", error);
        throw new Error("Falha ao atualizar a unidade matriz.");
      }
    },
    deleteUnidadeEmpresaCliente: (_parent: any, args: { id: string }) =>
      prisma.unidadeEmpresaCliente.delete({ where: { id: Number(args.id) } }),
  },
};
