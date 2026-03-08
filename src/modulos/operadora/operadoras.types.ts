import gql from 'graphql-tag';

export const operadoraTypes = gql`
  type Operadora {
    id: ID!
    nome: String
    slug: String
    logoOperadora: String
    cnpj: String
    rSocial: String
    endRua: String
    endNumero: String
    endBairro: String
    endCep: String
    endCidade: String
    endUf: String
    statusOperadora: Boolean
    dataCriacao: String
  }

  type Query {
    operadoras: [Operadora]!
    operadoraId(id: ID!): Operadora!
  }

  input OperadoraInput {
    nome: String
    slug: String
    logoOperadora: String
    cnpj: String
    rSocial: String
    endRua: String
    endNumero: String
    endBairro: String
    endCep: String
    endCidade: String
    endUf: String
  }

  type Mutation {
    createOperadora(data: OperadoraInput!): Operadora!
    updateOperadora(id: ID!, data: OperadoraInput!): Operadora!
    deleteOperadora(id: ID!): Operadora!
  }
`;
