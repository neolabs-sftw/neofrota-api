import { gql } from "graphql-tag";

export const lancamentoTypes = gql`
  enum TipoLancamento {
    Credito
    Desconto
  }

  type LancamentoMotorista {
    id: ID!
    descricao: String!
    valor: Float!
    tipo: TipoLancamento!
    dataHora: DateTime!
    motorista: Motorista!
    adminUsuario: AdminUsuario!
    operadora: Operadora!
  }

  input filtroLancamento {
    tipo: TipoLancamento
    dataInicial: DateTime
    dataFinal: DateTime
    motoristaId: ID
    adminUsuarioId: ID
    operadoraId: ID
  }

  type Query {
    lancamentos(filter: filtroLancamento): [LancamentoMotorista]
  }

  input LancamentoMotoristaInput {
    descricao: String!
    valor: Float!
    tipo: TipoLancamento!
    dataHora: DateTime!
    motoristaId: ID!
    adminUsuarioId: ID!
    operadoraId: ID!
  }

  type Mutation {
    criarLancamentoMotorista(
      input: LancamentoMotoristaInput!
    ): LancamentoMotorista

    editarLancamentoMotorista(
      descricao: String!
      valor: Float!
      tipo: TipoLancamento!
    ): LancamentoMotorista

    deletarLancamentoMotorista(id: ID!): LancamentoMotorista
  }
`;
