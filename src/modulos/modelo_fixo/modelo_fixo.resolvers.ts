import { prisma } from "../../prisma";
import { $Enums, Prisma } from "@prisma/client";

type TipoCorrida = $Enums.TipoCorrida;

interface ConfiguracaoInput {
  tipo: TipoCorrida;
  horario: string;
  domingo: boolean;
  segunda: boolean;
  terca: boolean;
  quarta: boolean;
  quinta: boolean;
  sexta: boolean;
  sabado: boolean;
  origem: string;
  destino: string;
  motoristaId: string;
  carroId: number;
}

interface PassageiroInput {
  passageiroId: string;
}

interface CreateModeloInput {
  nomeModelo: string;
  empresaClienteId: string;
  unidadeClienteId: string;
  operadoraId: string;
  adminUsuarioId: string;
  valorViagem: number;
  valorViagemRepasse: number;
  valorHoraParada?: number;
  valorHoraParadaRepasse?: number;
  valorDeslocamento?: number;
  valorDeslocamentoRepasse?: number;
  valorPedagio?: number;
  configuracoes: ConfiguracaoInput[];
  passageirosFixos: PassageiroInput[];
}

export const modeloVoucherFixoResolvers = {
  Query: {
    modelosVoucherFixo: async (_: any, args: any) => {
      return await prisma.modeloVoucherFixo.findMany({
        where: {
          operadoraId: parseInt(args.operadoraId),
        },
        orderBy: {
          nomeModelo: "asc",
        },
        include: {
          empresaCliente: true,
          unidadeCliente: true,
          pedagio: true,
          configuracoes: true,
          passageirosFixos: true,
        },
      });
    },
    modeloVoucherFixo: async (_: any, args: any) => {
      return await prisma.modeloVoucherFixo.findUnique({
        where: {
          id: args.id,
        },
        include: {
          configuracoes: true,
          passageirosFixos: true,
          pedagio: true,
          empresaCliente: true,
          unidadeCliente: true,
        },
      });
    },
  },
  ModeloVoucherFixo: {
    id: (parent: any) => String(parent.id),
    empresaCliente: (parent: any) => {
      return prisma.empresaCliente.findUnique({
        where: { id: parent.empresaClienteId },
      });
    },
    unidadeCliente: (parent: any) => {
      return prisma.unidadeEmpresaCliente.findUnique({
        where: { id: parent.unidadeClienteId },
      });
    },
    pedagio: (parent: any) => {
      if (!parent.valorPedagio) {
        return null;
      }
      return prisma.pedagio.findUnique({
        where: { id: parent.valorPedagio },
      });
    },
    configuracoes: async (parent: any) => {
      return await prisma.modeloVoucherFixoConfig.findMany({
        where: { modeloFixoId: parent.id },
        include: {
          motorista: true,
          carro: true,
        },
      });
    },
    passageirosFixos: async (parent: any) => {
      return await prisma.modeloVoucherFixoPassageiro.findMany({
        where: { modeloFixoId: parent.id },
      });
    },
  },
  ModeloVoucherFixoPassageiro: {
    passageiro: async (parent: any) => {
      return await prisma.passageiro.findUnique({
        where: { id: parent.passageiroId },
      });
    },
  },
  Mutation: {
    createModeloVoucherFixo: async (
      _parent: any,
      { input }: { input: CreateModeloInput },
    ) => {
      const dataInput: any = {
        nomeModelo: input.nomeModelo,
        ativo: true,
        empresaClienteId: BigInt(input.empresaClienteId),
        unidadeClienteId: BigInt(input.unidadeClienteId),
        operadoraId: BigInt(input.operadoraId),
        adminUsuarioId: BigInt(input.adminUsuarioId),
        valorViagem: Number(input.valorViagem),
        valorViagemRepasse: Number(input.valorViagemRepasse),
        valorHoraParada: Number(input.valorHoraParada),
        valorHoraParadaRepasse: Number(input.valorHoraParadaRepasse),
        valorDeslocamento: Number(input.valorDeslocamento),
        valorDeslocamentoRepasse: Number(input.valorDeslocamentoRepasse),
        valorPedagio: input.valorPedagio ? Number(input.valorPedagio) : null,

        // 1. NESTED WRITE: Configurações
        configuracoes: {
          create: input.configuracoes.map((config) => ({
            tipo: config.tipo,
            horario: config.horario,
            domingo: config.domingo,
            segunda: config.segunda,
            terca: config.terca,
            quarta: config.quarta,
            quinta: config.quinta,
            sexta: config.sexta,
            sabado: config.sabado,
            origem: config.origem,
            destino: config.destino,
            motoristaId: BigInt(config.motoristaId),
            carroId: config.carroId,
          })),
        },

        // 2. NESTED WRITE: Passageiros (ADICIONADO AQUI)
        passageirosFixos: {
          create: input.passageirosFixos?.map((p) => ({
            // O Prisma lida com a conexão do modeloFixoId automaticamente por estar no 'create'
            passageiroId: BigInt(p.passageiroId),
          })),
        },
      };

      // ... (seus blocos IF para valores opcionais de parada e pedágio)

      return await prisma.modeloVoucherFixo.create({
        data: dataInput,
        include: {
          configuracoes: true,
          passageirosFixos: true,
          pedagio: true,
        },
      });
    },
    updateModeloVoucherFixo: async (
      _parent: any,
      args: { id: number; input: Partial<CreateModeloInput> },
    ) => {
      const { input } = args;
      const { configuracoes, passageirosFixos, ...rest } = input;

      const updateData: any = {
        ...rest,
      };

      if (rest.empresaClienteId) updateData.empresaClienteId = BigInt(rest.empresaClienteId);
      if (rest.unidadeClienteId) updateData.unidadeClienteId = BigInt(rest.unidadeClienteId);
      if (rest.operadoraId) updateData.operadoraId = BigInt(rest.operadoraId);
      if (rest.adminUsuarioId) updateData.adminUsuarioId = BigInt(rest.adminUsuarioId);

      if (configuracoes) {
        updateData.configuracoes = {
          deleteMany: {},
          create: configuracoes.map((config) => ({
            tipo: config.tipo,
            horario: config.horario,
            domingo: config.domingo,
            segunda: config.segunda,
            terca: config.terca,
            quarta: config.quarta,
            quinta: config.quinta,
            sexta: config.sexta,
            sabado: config.sabado,
            origem: config.origem,
            destino: config.destino,
            motoristaId: BigInt(config.motoristaId),
            carroId: config.carroId,
          })),
        };
      }

      if (passageirosFixos) {
        updateData.passageirosFixos = {
          deleteMany: {},
          create: passageirosFixos.map((p) => ({
            passageiroId: BigInt(p.passageiroId),
          })),
        };
      }

      return await prisma.modeloVoucherFixo.update({
        where: { id: Number(args.id) },
        data: updateData,
      });
    },
  },
};
