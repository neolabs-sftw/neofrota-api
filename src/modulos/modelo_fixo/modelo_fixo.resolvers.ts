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
}

export const modeloVoucherFixoResolvers = {
  Query: {
    modelosVoucherFixo: async (_: any, args: any) => {
      return await prisma.modeloVoucherFixo.findMany({
        where: {
          operadoraId: parseInt(args.operadoraId),
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
      return prisma.pedagio.findUnique({
        where: { id: parent.valorPedagio },
      });
    },
    configuracoes: async (parent: any) => {
      return await prisma.configuracaoViagemFixa.findMany({
        where: { modeloFixoId: parent.id },
        include: {
          motorista: true,
          carro: true,
        },
      });
    },
  },
  // ConfiguracaoViagemFixa: {
  //   motoristaId: async (parent: any) => {
  //     return await prisma.motorista.findUnique({
  //       where: {
  //         id: parent.motoristaId,
  //       },
  //     });
  //   },
  // },
  Mutation: {
    createModeloVoucherFixo: async (
      _parent: any,
      { input }: { input: CreateModeloInput },
    ) => {
      const parseTimeStringToDate = (timeString: string): Date => {
        // Criamos uma data base qualquer (hoje)
        const [horas, minutos, segundos] = timeString.split(":").map(Number);
        const date = new Date();

        // Definimos o horário. Importante: use setHours para garantir
        // que o objeto Date seja válido para o motor do Prisma.
        date.setHours(horas || 0, minutos || 0, segundos || 0, 0);

        return date;
      };

      const dataInput: any = {
        nomeModelo: input.nomeModelo,
        ativo: true,
        // Conversões explícitas para os tipos do Prisma (BigInt e Decimal)
        empresaClienteId: BigInt(input.empresaClienteId),
        unidadeClienteId: BigInt(input.unidadeClienteId),
        operadoraId: BigInt(input.operadoraId),
        adminUsuarioId: BigInt(input.adminUsuarioId),

        valorViagem: new Prisma.Decimal(input.valorViagem),
        valorViagemRepasse: new Prisma.Decimal(input.valorViagemRepasse),

        // Nested Write com tipagem rigorosa
        configuracoes: {
          create: input.configuracoes.map((config) => ({
            tipo: config.tipo,
            // O Prisma trata campos @db.Time como objetos Date em JS
            horario: parseTimeStringToDate(config.horario),
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
      };

      if (input.valorHoraParada !== undefined) {
        dataInput.valorHoraParada = new Prisma.Decimal(input.valorHoraParada);
      }
      if (input.valorHoraParadaRepasse !== undefined) {
        dataInput.valorHoraParadaRepasse = new Prisma.Decimal(
          input.valorHoraParadaRepasse,
        );
      }
      if (input.valorDeslocamento !== undefined) {
        dataInput.valorDeslocamento = new Prisma.Decimal(
          input.valorDeslocamento,
        );
      }
      if (input.valorDeslocamentoRepasse !== undefined) {
        dataInput.valorDeslocamentoRepasse = new Prisma.Decimal(
          input.valorDeslocamentoRepasse,
        );
      }
      if (input.valorPedagio !== undefined) {
        dataInput.valorPedagio = new Prisma.Decimal(input.valorPedagio);
      }

      return await prisma.modeloVoucherFixo.create({
        data: dataInput,
        include: {
          configuracoes: true,
        },
      });
    },
  },
};
