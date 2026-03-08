import gql from "graphql-tag";

export const empresaClienteTypes = gql`
  type EmpresaCliente {
    id: ID
    nome: String
    rSocial: String
    cnpj: String
    fotoLogoCliente: String
    operadoraId: Operadora
    statusCliente: Boolean
  }
  type Query {
    empresasClientes: [EmpresaCliente]!
    empresaClienteOper(operadoraId: String): [EmpresaCliente]!
    empresaClienteId(id: ID!): EmpresaCliente!
  }

  input EmpresaClienteInput {
    nome: String
    rSocial: String
    cnpj: String
    fotoLogoCliente: String
    operadoraId: ID
    statusCliente: Boolean
  }

  type Mutation {
    createEmpresaCliente(data: EmpresaClienteInput!): EmpresaCliente
    updateEmpresaCliente(id: ID!, data: EmpresaClienteInput!): EmpresaCliente
    deleteEmpresaCliente(id: ID!): EmpresaCliente
  }
`;
