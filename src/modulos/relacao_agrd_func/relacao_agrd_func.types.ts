import gql from 'graphql-tag';

export const relacaoAgrdFuncTypes = gql`
  type RelacaoAgrdFunc {
    id: ID
    agregadoId: Int
    funcionarioId: Int
    operadoraId: Int
    motoristaComoAgregado: Motorista
    motoristaComoFuncionario: Motorista
    operadora: Operadora
  }
  type Query {
    relacaoAgrdFuncs: [RelacaoAgrdFunc]
    listaFuncionariosAgregadoId(id: ID!): [RelacaoAgrdFunc]
    relacaoAgrdFuncId(id: ID!): RelacaoAgrdFunc!
  }

  input RelacaoAgrdFuncInput {
    agregadoId: Int
    funcionarioId: Int
    operadoraId: Int
  }

  type Mutation {
    createRelacaoAgrdFunc(input: RelacaoAgrdFuncInput!): RelacaoAgrdFunc
    updateRelacaoAgrdFunc(
      id: ID!
      input: RelacaoAgrdFuncInput!
    ): RelacaoAgrdFunc
    deleteRelacaoAgrdFunc(id: ID!): RelacaoAgrdFunc
  }
`;
