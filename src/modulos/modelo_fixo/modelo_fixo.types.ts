import gql from "graphql-tag";

export const modeloVoucherFixoTypes = gql`
  enum TipoCorrida {
    Entrada
    Saida
  }

  type ModeloVoucherFixo {
    id: Int!
    nomeModelo: String!
    ativo: Boolean!

    empresaClienteId: ID!
    unidadeClienteId: ID!
    operadoraId: ID!
    adminUsuarioId: ID!

    valorViagem: Float!
    valorViagemRepasse: Float!
    valorHoraParada: Float
    valorHoraParadaRepasse: Float
    valorDeslocamento: Float
    valorDeslocamentoRepasse: Float
    valorPedagio: Int

    passageirosFixos: [ModeloVoucherFixoPassageiro]

    # Relacionamentos
    configuracoes: [ModeloVoucherFixoConfig!]!
    empresaCliente: EmpresaCliente!
    unidadeCliente: UnidadeEmpresaCliente!
    operadora: Operadora!
    pedagio: Pedagio
  }

  type ModeloVoucherFixoConfig {
    id: Int!
    modeloFixoId: Int!
    tipo: TipoCorrida!

    horario: String!

    domingo: Boolean!
    segunda: Boolean!
    terca: Boolean!
    quarta: Boolean!
    quinta: Boolean!
    sexta: Boolean!
    sabado: Boolean!

    origem: String!
    destino: String!

    motoristaId: ID!
    carroId: Int!

    # Relacionamentos
    modelo: ModeloVoucherFixo!
    motorista: Motorista!
    carro: Carro!
  }

  type ModeloVoucherFixoPassageiro {
    id: ID!
    modeloFixoId: Int!
    passageiroId: ID!
    modeloFixo: ModeloVoucherFixo!
    passageiro: Passageiro!
  }

  type Query {
    modelosVoucherFixo(operadoraId: ID!): [ModeloVoucherFixo!]!
    modeloVoucherFixo(id: Int!): ModeloVoucherFixo
  }

  input ModeloVoucherFixoConfigInput {
    tipo: TipoCorrida!

    horario: String! # Ex: "2024-05-20T08:00:00Z" ou apenas a hora dependendo da sua conversão
    domingo: Boolean!
    segunda: Boolean!
    terca: Boolean!
    quarta: Boolean!
    quinta: Boolean!
    sexta: Boolean!
    sabado: Boolean!

    origem: String!
    destino: String!
    motoristaId: ID!
    carroId: Int!
  }

  type ModeloVoucherFixoPassageiro {
    modeloFixoId: Int!
    passageiroId: ID!
  }

  input CreateModeloVoucherFixoInput {
    nomeModelo: String!
    empresaClienteId: ID!
    unidadeClienteId: ID!
    operadoraId: ID!
    adminUsuarioId: ID!

    # Valores
    valorViagem: Float!
    valorViagemRepasse: Float!
    valorHoraParada: Float
    valorHoraParadaRepasse: Float
    valorDeslocamento: Float
    valorDeslocamentoRepasse: Float
    valorPedagio: Int
    passageirosFixos: [VoucherPassageiroCreateInput]

    # O Nested Write acontece aqui
    configuracoes: [ModeloVoucherFixoConfigInput!]!
  }
  input UpdateModeloVoucherFixoInput {
    nomeModelo: String!
    empresaClienteId: ID!
    unidadeClienteId: ID!
    operadoraId: ID!
    adminUsuarioId: ID!

    # Valores
    valorViagem: Float!
    valorViagemRepasse: Float!
    valorHoraParada: Float
    valorHoraParadaRepasse: Float
    valorDeslocamento: Float
    valorDeslocamentoRepasse: Float
    valorPedagio: Int
    passageirosFixos: [VoucherPassageiroCreateInput]

    # O Nested Write acontece aqui
    configuracoes: [ModeloVoucherFixoConfigInput!]!
  }

  type Mutation {
    createModeloVoucherFixo(
      input: CreateModeloVoucherFixoInput!
    ): ModeloVoucherFixo!
    updateModeloVoucherFixo(
      id: Int!
      input: UpdateModeloVoucherFixoInput!
    ): ModeloVoucherFixo!
  }
`;
