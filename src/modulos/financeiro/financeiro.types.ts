import gql from "graphql-tag";

export const moduloFinanceiroTypes = gql`
  type FaturamentoOperadoraTotal {
    operadoraId: ID!
    qtdVouchers: Int!
    totalFaturado: String!
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
  }
`;
