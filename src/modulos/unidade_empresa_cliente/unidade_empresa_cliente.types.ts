import gql from "graphql-tag";

export const unidadeEmpresaClienteTypes = gql`
  type UnidadeEmpresaCliente {
    id: ID
    nome: String
    cnpj: String
    endRua: String
    endNumero: String
    endBairro: String
    endCep: String
    endCidade: String
    endComplemento: String
    endUf: String
    statusUnidadeCliente: Boolean
    matriz: Boolean
    empresaClienteId: EmpresaCliente
    operadoraId: Operadora
  }
  type Query {
    unidadeEmpresaClientes: [UnidadeEmpresaCliente]
    unidadeEmpresaClienteId(id: ID!): UnidadeEmpresaCliente!
    listaUnidadesEmpresaClienteId(id: ID!): [UnidadeEmpresaCliente]!
    unidadeMatrizEmpresaCliente(empresaClienteId: ID!): UnidadeEmpresaCliente
  }

  input UnidadeEmpresaClienteInput {
    id: ID
    nome: String
    cnpj: String
    endRua: String
    endNumero: String
    endBairro: String
    endCep: String
    endCidade: String
    endComplemento: String
    endUf: String
    statusUnidadeCliente: Boolean
    matriz: Boolean
    empresaClienteId: Int
    operadoraId: Int
  }

  type Mutation {
    createUnidadeEmpresaCliente(
      input: UnidadeEmpresaClienteInput!
    ): UnidadeEmpresaCliente
    updateUnidadeEmpresaCliente(
      id: ID!
      input: UnidadeEmpresaClienteInput!
    ): UnidadeEmpresaCliente
    definirUnidadeMatriz(unidadeId: ID!): UnidadeEmpresaCliente
    deleteUnidadeEmpresaCliente(id: ID!): UnidadeEmpresaCliente
  }
`;
