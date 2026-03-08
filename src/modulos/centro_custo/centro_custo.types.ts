import gql from 'graphql-tag';

export const centroCustoTypes = gql`
  type CentroCusto {
    id: ID
    nome: String
    codigo: String
    empresaClienteId: EmpresaCliente
    operadoraId: Operadora
  }
  type Query {
    centroCustos: [CentroCusto]
    centroCustoId(id: ID!): CentroCusto!
    centroCustoEmpresaClienteId(id: ID!): [CentroCusto]
  }

  input CentroCustoInput {
    nome: String
    codigo: String
    empresaClienteId: Int
    operadoraId: Int
  }

  type Mutation{
    createCentroCusto(input: CentroCustoInput!): CentroCusto
    updateCentroCusto(id: ID!, input: CentroCustoInput!): CentroCusto
    deleteCentroCusto(id: ID!): CentroCusto
  }
`;
