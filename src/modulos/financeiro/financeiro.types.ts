import gql from "graphql-tag";

export const moduloFinanceiroTypes = gql`
  type FaturamentoOperadoraTotal {
    operadoraId: ID!
    qtdVouchers: Int!
    totalFaturado: String!
  }

  type FaturamentoMotorosita {
    mes: Float!
    totalCorridas: Int
    valorViagemRepasse: Float
    valorDeslocamentoRepasse: Float
    valorHoraParadaRepasse: Float
    valorPedagio: Float
    valorEstacionamento: Float
    faturamentoTotal: Float
  }

  type Query {
    faturamentoTotalOperadoraID(
      inicio: DateTime!
      fim: DateTime!
      operadoraId: ID!
      status: String
    ): FaturamentoOperadoraTotal!

    faturamentoParcialOperadoraID(
      inicio: DateTime!
      fim: DateTime!
      operadoraId: ID!
      status: String!
      natureza: String!
    ): FaturamentoOperadoraTotal!

    resumoFaturamento(motoristaId: String!, ano: Float!): [FaturamentoMotorosita]
  }
`;
