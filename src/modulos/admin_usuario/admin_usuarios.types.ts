import gql from 'graphql-tag';

export const adminUsuarioTypes = gql`
  enum Funcao {
    Master
    Admin
    Finc
    Oper
  }

  type AdminUsuario {
    id: ID
    nome: String
    email: String
    senha: String
    fotoAdminOperadora: String
    funcao: Funcao
    statusAdminOperadora: Boolean
    dataCriacao: String
    operadora: Operadora
  }

  type Query {
    adminUsuarios: [AdminUsuario]
    adminUsuario(id: ID!): AdminUsuario
    adminUsuariosByOperadora(operadoraId: ID!): [AdminUsuario]
  }

  input AdminUsuarioInput {
    nome: String
    email: String
    senha: String
    fotoAdminOperadora: String
    funcao: Funcao
    statusAdminOperadora: Boolean
    dataCriacao: String
    operadoraId: String
  }

  type AuthPayload {
    token: String!
    adminUsuario: AdminUsuario!
  }

  type Mutation {
    createAdminUsuario(data: AdminUsuarioInput!): AdminUsuario
    updateAdminUsuario(id: ID!, data: AdminUsuarioInput!): AdminUsuario
    deleteAdminUsuario(id: ID!): AdminUsuario
    login(email: String!, senha: String!): AuthPayload!
  }
`;