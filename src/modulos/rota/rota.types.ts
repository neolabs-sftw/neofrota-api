import gql from "graphql-tag";

export const modeloRotaTypes = gql`
  type Rota {
    id: ID!
    origem: String!
    destino: String!
    tributacao: String
    operadoraId: Operadora!
    empresaClienteId: EmpresaCliente!
    rotaValor: [RotaValor]
    vouchers: [Voucher!]
  }

  type Query {
    rotas: [Rota!]
    rota(id: ID!): Rota
    rotaEmpresaClienteId(id: ID!): [Rota]
  }

  input RotaInput {
    origem: String!
    destino: String!
    tributacao: String
    operadoraId: ID!
    empresaClienteId: ID!
  }

  input RotaValorUpsertInput {
    categoria: CategoriasCarros!
    valorViagem: Float
    valorViagemRepasse: Float
    valorHoraParada: Float
    valorHoraParadaRepasse: Float
    valorDeslocamento: Float
    valorDeslocamentoRepasse: Float
    valorPedagio: Float
    pedagioId: ID
  }

  input UpdateRotaComValoresInput {
    id: ID!
    origem: String!
    destino: String!
    tributacao: String
    operadoraId: ID!
    empresaClienteId: ID
    rotaValores: [RotaValorUpsertInput!]!
  }

  type Mutation {
    createRota(input: RotaInput!): Rota
    updateRotaComValores(input: UpdateRotaComValoresInput!): Rota!
    updateRota(id: ID!, input: RotaInput!): Rota
    deleteRota(id: ID!): Rota
  }
`;
