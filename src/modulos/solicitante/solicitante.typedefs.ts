import gql from "graphql-tag";

export const solicitanteTypes = gql`
  enum FuncaoSolicitante {
    Finc
    Oper
    Prin
  }

  type Solicitante {
    id: ID
    nome: String
    email: String
    senha: String
    funcao: FuncaoSolicitante
    telefone: String
    operadoraId: Operadora
    statusSolicitante: Boolean
    empresaClienteId: EmpresaCliente
    fotoUrlSolicitante: String
  }
  type Query {
    solicitantes: [Solicitante]
    solicitanteId(id: ID!): Solicitante!
    solicitantesEmpresaClienteId(id: ID!): [Solicitante]
  }

  input SolicitanteInput {
    nome: String
    email: String
    senha: String
    funcao: FuncaoSolicitante
    telefone: String
    operadoraId: Int
    empresaClienteId: Int
    fotoUrlSolicitante: String
    statusSolicitante: Boolean
  }

  type Mutation {
    createSolicitante(input: SolicitanteInput!): Solicitante
    updateSolicitante(id: ID!, input: SolicitanteInput!): Solicitante
    deleteSolicitante(id: ID!): Solicitante
  }
`;
