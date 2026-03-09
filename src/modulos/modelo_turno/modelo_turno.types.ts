import gql from "graphql-tag";

export const modeloVoucherTurnoTypes = gql`
  enum DiaDaSemana {
    Domingo
    Segunda
    Terca
    Quarta
    Quinta
    Sexta
    Sabado
  }

  type ModeloVoucherTurno {
    id: Int!
    nomeModelo: String!
    ativo: Boolean!
    empresaClienteId: EmpresaCliente!
    motoristaId: Motorista
    carroId: Carro
    adminUsuarioId: AdminUsuario!
    operadoraId: Operadora!
    tipoCorrida: String!
    origem: String!
    destino: String!
    valorViagem: Float!
    valorViagemRepasse: Float!
    valorPedagio: Float!
    valorPedagioRepasse: Float!
    valorEstacionamento: Float!
    valorEstacionamentoRepasse: Float!
    valorTempoParado: Float!
    valorTempoParadoRepasse: Float!
    dataInicio: String!
    dataFim: String
    diasSemana: [DiaDaSemana!]!
    horario: String!
    # vouchers_gerados: [Voucher!]!
  }

  input CriarModeloVoucherTurnoInput {
    nomeModelo: String!
    ativo: Boolean
    empresaClienteId: Int!
    motoristaId: Int
    carroId: Int!
    adminUsuarioId: Int!
    operadoraId: Int!
    tipoCorrida: String!
    origem: String!
    destino: String!
    valorViagem: Float!
    valorViagemRepasse: Float!
    valorPedagio: Float!
    valorPedagioRepasse: Float!
    valorEstacionamento: Float!
    valorEstacionamentoRepasse: Float!
    valorTempoParado: Float!
    valorTempoParadoRepasse: Float!
    dataInicio: String!
    dataFim: String
    diasSemana: [DiaDaSemana!]!
    horario: String!
  }

  input EditarModeloVoucherTurnoInput {
    nomeModelo: String
    ativo: Boolean
    empresaClienteId: Int
    motoristaId: Int
    carroId: Int
    adminUsuarioId: Int
    operadoraId: Int
    tipoCorrida: String
    origem: String
    destino: String
    valorViagem: Float
    valorViagemRepasse: Float
    valorPedagio: Float
    valorPedagioRepasse: Float
    valorEstacionamento: Float
    valorEstacionamentoRepasse: Float
    valorTempoParado: Float
    valorTempoParadoRepasse: Float
    dataInicio: String
    dataFim: String
    diasSemana: [DiaDaSemana!]
    horario: String
  }

  type Query {
    ModeloVoucherTurno(id: Int!): ModeloVoucherTurno
    ModelosVoucherTurno: [ModeloVoucherTurno!]!
  }

  type Mutation {
    createModeloVoucherTurno(
      data: CriarModeloVoucherTurnoInput!
    ): ModeloVoucherTurno!
    updateModeloVoucherTurno(
      id: Int!
      data: EditarModeloVoucherTurnoInput!
    ): ModeloVoucherTurno!
    deleterModeloVoucherTurno(id: Int!): Boolean!
  }
`;
