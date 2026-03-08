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
        status: StatusVoucher
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
  },
};
