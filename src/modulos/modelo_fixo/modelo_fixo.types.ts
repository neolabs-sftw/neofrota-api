import gql from "graphql-tag";

export const modeloVoucherFixoTypes = gql`
  enum DiaDaSemana {
    Domingo
    Segunda
    Terca
    Quarta
    Quinta
    Sexta
    Sabado
  }

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

    diasSemana: [DiaDaSemana!]!

    passageiros: [VoucherPassageiro]

    # Relacionamentos
    configuracoes: [ConfiguracaoViagemFixa!]!
    empresaCliente: EmpresaCliente!
    unidadeCliente: UnidadeEmpresaCliente!
    operadora: Operadora!
    pedagio: Pedagio
  }

  type ConfiguracaoViagemFixa {
    id: Int!
    modeloFixoId: Int!
    tipo: TipoCorrida!
    horario: String!
    origem: String!
    destino: String!

    motoristaId: ID!
    carroId: Int!

    # Relacionamentos
    modelo: ModeloVoucherFixo!
    motorista: Motorista!
    carro: Carro!
  }

  type Query {
    modelosVoucherFixo: [ModeloVoucherFixo!]!
    modeloVoucherFixo(id: Int!): ModeloVoucherFixo
  }

  input ConfiguracaoViagemInput {
    tipo: TipoCorrida!
    horario: String! # Ex: "2024-05-20T08:00:00Z" ou apenas a hora dependendo da sua conversão
    origem: String!
    destino: String!
    motoristaId: ID!
    carroId: Int!
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
    valorPedagio: Int # ID do Pedágio se houver relação
    diasSemana: [DiaDaSemana!]!

    passageiros: [VoucherPassageiroCreateInput]

    # O Nested Write acontece aqui
    configuracoes: [ConfiguracaoViagemInput!]!
  }

  type Mutation {
    createModeloVoucherFixo(
      input: CreateModeloVoucherFixoInput!
    ): ModeloVoucherFixo!
  }
`;
