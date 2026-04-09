import { NaturezaVoucher, Prisma, StatusVoucher } from "@prisma/client";
import { prisma } from "../../prisma";

export const moduloFinanceiroResolvers = {
  Query: {
    faturamentoParcialOperadoraID: async (
      _: any,
      args: {
        inicio: string;
        fim: string;
        operadoraId: number;
        natureza: NaturezaVoucher;
        status: StatusVoucher;
      },
    ) => {
      const agg = await prisma.voucher.aggregate({
        where: {
          operadoraId: args.operadoraId,
          status: args.status,
          natureza: args.natureza,
          dataHoraProgramado: {
            gte: new Date(args.inicio),
            lt: new Date(args.fim),
          },
        },
        _count: { _all: true },
        _sum: {
          valorViagem: true,
          valorDeslocamento: true,
          valorHoraParada: true,
          valorPedagio: true,
          valorEstacionamento: true,
        },
      });
      const z = new Prisma.Decimal(0);
      const d = (v: Prisma.Decimal | null | undefined) => v ?? z;

      const total = d(agg._sum.valorViagem)
        .plus(d(agg._sum.valorDeslocamento))
        .plus(d(agg._sum.valorHoraParada))
        .plus(d(agg._sum.valorPedagio))
        .plus(d(agg._sum.valorEstacionamento));

      return {
        operadoraId: String(args.operadoraId),
        qtdVouchers: agg._count._all,
        totalFaturado: total.toFixed(2), // retorna "1234.56"
      };
    },

    faturamentoTotalOperadoraID: async (
      _: any,
      args: {
        inicio: string;
        fim: string;
        operadoraId: number;
        status: StatusVoucher;
      },
    ) => {
      const agg = await prisma.voucher.aggregate({
        where: {
          operadoraId: args.operadoraId,
          status: args.status,
          dataHoraProgramado: {
            gte: new Date(args.inicio),
            lt: new Date(args.fim),
          },
        },
        _count: { _all: true },
        _sum: {
          valorViagem: true,
          valorDeslocamento: true,
          valorHoraParada: true,
          valorPedagio: true,
          valorEstacionamento: true,
        },
      });
      const z = new Prisma.Decimal(0);
      const d = (v: Prisma.Decimal | null | undefined) => v ?? z;

      const total = d(agg._sum.valorViagem)
        .plus(d(agg._sum.valorDeslocamento))
        .plus(d(agg._sum.valorHoraParada))
        .plus(d(agg._sum.valorPedagio))
        .plus(d(agg._sum.valorEstacionamento));

      return {
        operadoraId: String(args.operadoraId),
        qtdVouchers: agg._count._all,
        totalFaturado: total.toFixed(2), // retorna "1234.56"
      };
    },

    resumoFaturamento: async (
      _: any,
      args: { motoristaId: string; ano: number },
    ) => {
      const dataInicio = new Date(`${args.ano}-01-01T00:00:00.000Z`);
      const dataFim = new Date(`${args.ano}-12-31T23:59:59.999Z`);

      const vouchers = await prisma.voucher.findMany({
        where: {
          motoristaId: Number(args.motoristaId),
          status: "Concluido",
          dataHoraProgramado: {
            gte: dataInicio,
            lte: dataFim,
          },
        },
        select: {
          dataHoraProgramado: true,
          valorViagemRepasse: true,
          valorDeslocamentoRepasse: true,
          valorHoraParadaRepasse: true,
          qntTempoParado: true,
          valorPedagio: true,
          valorEstacionamento: true,
        },
      });

      const faturamentoAgrupado = vouchers.reduce((acc: any, voucher: any) => {
        const mes = voucher.dataHoraProgramado.getUTCMonth() + 1;

        if (!acc[mes]) {
          acc[mes] = {
            mes,
            totalCorridas: 0,
            valorViagemRepasse: 0,
            valorDeslocamentoRepasse: 0,
            valorHoraParadaRepasse: 0,
            valorPedagio: 0,
            valorEstacionamento: 0,
            faturamentoTotal: 0,
          };
        }

        const viagem = Number(voucher.valorViagemRepasse) || 0;
        const deslocamento = Number(voucher.valorDeslocamentoRepasse) || 0;
        const pedagio = Number(voucher.valorPedagio) || 0;
        const estacionamento = Number(voucher.valorEstacionamento) || 0;

        const valorHoraParadaBase = Number(voucher.valorHoraParadaRepasse) || 0;
        const tempoParado = Number(voucher.qntTempoParado) || 0;

        const horaParada = valorHoraParadaBase * tempoParado;

        acc[mes].totalCorridas += 1;
        acc[mes].valorViagemRepasse += viagem;
        acc[mes].valorDeslocamentoRepasse += deslocamento;
        acc[mes].valorHoraParadaRepasse += horaParada;
        acc[mes].valorPedagio += pedagio;
        acc[mes].valorEstacionamento += estacionamento;
        acc[mes].faturamentoTotal +=
          viagem + deslocamento + horaParada + pedagio + estacionamento;

        return acc;
      }, {});

      const resultadoFinal = Object.values(faturamentoAgrupado).sort(
        (a: any, b: any) => b.mes - a.mes,
      );

      return resultadoFinal;
    },
  },
};
