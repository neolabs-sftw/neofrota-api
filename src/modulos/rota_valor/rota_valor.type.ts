import gql from "graphql-tag";

export const rotaValorTypes = gql`
  enum CategoriasCarros {
    Sedan
    MiniVan
    Van
    Micro
    Onibus
    Material
  }

  type RotaValor {
    id: ID!
    rotaId: Rota!
    categoria: CategoriasCarros!
    empresaClienteId: EmpresaCliente!
    operadoraId: Operadora!
    valorViagem: Float!
    valorViagemRepasse: Float!
    valorHoraParada: Float!
    valorHoraParadaRepasse: Float!
    valorDeslocamento: Float!
    valorDeslocamentoRepasse: Float!
    valorPedagio: Pedagio
  }

  input CreateRotaValorInput {
    rotaId: Int!
    categoria: CategoriasCarros!
    empresaClienteId: Int
    operadoraId: Int
    valorViagem: Float!
    valorViagemRepasse: Float!
    valorHoraParada: Float!
    valorHoraParadaRepasse: Float!
    valorDeslocamento: Float!
    valorDeslocamentoRepasse: Float!
    valorPedagio: Int
  }

  input UpdateRotaValorInput {
    id: ID!
    valorViagem: Float
    valorViagemRepasse: Float
    valorHoraParada: Float
    valorHoraParadaRepasse: Float
    valorDeslocamento: Float
    valorDeslocamentoRepasse: Float
    valorPedagio: Int
  }

  extend type Query {
    rotaValores(rotaId: Int!): [RotaValor!]!
    rotaValorId(id: ID!): RotaValor
  }  

  extend type Mutation {
    createRotaValor(data: CreateRotaValorInput!): RotaValor!
    updateRotaValor(data: UpdateRotaValorInput!): RotaValor!
    deleteRotaValor(id: ID!): RotaValor
  }
`;
