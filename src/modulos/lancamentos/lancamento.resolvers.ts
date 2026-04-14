import { prisma } from "../../prisma";

export const lancamentosResolvers = {
  Query: {
    lancamentos: async (_: any, args: any) => {
      const { dataInicial, dataFinal, ...restFiltro } = args.filter || {};

      const dataHoraFilter: any = {};

      if (dataInicial) {
        dataHoraFilter.gte = new Date(dataInicial);
      }

      if (dataFinal) {
        const fimDoDia = new Date(dataFinal);
        fimDoDia.setUTCHours(23, 59, 59, 999);

        dataHoraFilter.lte = fimDoDia;
      }

      return await prisma.lancamentoMotorista.findMany({
        where: {
          ...restFiltro,
          ...(Object.keys(dataHoraFilter).length > 0 && {
            dataHora: dataHoraFilter,
          }),
        },
        include: {
          motorista: true,
          adminUsuario: true,
          operadora: true,
        },
        orderBy: {
          dataHora: "desc",
        },
      });
    },
  },
  Mutation: {
    criarLancamentoMotorista: async (_: any, { input }: any) => {
      return await prisma.lancamentoMotorista.create({
        data: {
          ...input,
          dataHora: new Date(input.dataHora),
        },
      });
    },
    editarLancamentoMotorista: async (_: any, args: any) => {
      return await prisma.lancamentoMotorista.update({
        where: { id: parseInt(args.id) },
        data: args,
      });
    },
    deletarLancamentoMotorista: async (_: any, args: any) => {
      return await prisma.lancamentoMotorista.delete({
        where: { id: parseInt(args.id) },
      });
    },
  },
};
