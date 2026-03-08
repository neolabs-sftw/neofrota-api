import gql from "graphql-tag";

export const motoristaTypes = gql`
  type Motorista {
    id: ID
    nome: String
    email: String
    senha: String
    fotoMotorista: String
    cpf: String
    cnh: String
    vCnh: DateTime
    statusMotorista: Boolean
    tipoMotorista: String
    dataCriacao: String
    operadoraId: Operadora
    statusCnh: Boolean
  }

  enum MotoristaOrderByField {
    nome
    email
    dataCriacao
  }

  enum SortOrder {
    asc
    desc
  }

  input MotoristaOrderByInput {
    field: MotoristaOrderByField!
    direction: SortOrder!
  }

  type Query {
    motoristas: [Motorista]
    motorista(id: ID!): Motorista
    motoristasOperadora(id: ID!, orderBy: MotoristaOrderByInput): [Motorista]
    motoristasAgregados(operadoraId: ID!): [Motorista]
  }

  input MotoristaInput {
    nome: String
    email: String
    senha: String
    fotoMotorista: String
    cpf: String
    cnh: String
    vCnh: DateTime
    statusMotorista: Boolean
    tipoMotorista: String
    operadoraId: Int
  }

  type AuthPayload {
    token: String!
  }

  type Mutation {
    createMotorista(input: MotoristaInput!): Motorista!
    updateMotorista(id: ID!, input: MotoristaInput!): Motorista!
    deleteMotorista(id: ID!, email: String!): Motorista
    loginMotorista(email: String!, senha: String!): AuthPayload!
  }
`;
