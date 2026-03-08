import { gql } from "graphql-tag";

export const voucherTypes = gql`
  scalar DataTime
  scalar Decimal

  enum NaturezaVoucher {
    Fixo
    Extra
    Turno
  }

  enum TipoCorrida {
    Entrada
    Saida
  }

  enum StatusVoucher {
    Aberto
    EmAndamento
    Concluido
    Cancelado
  }

  type Voucher {
    id: ID!

    # Dados básicos
    origem: String
    destino: String
    dataHoraProgramado: DateTime
    dataHoraConclusao: DateTime
    dataHoraCriacao: DateTime

    # Outros
    qntTempoParado: DateTime
    assinatura: String
    observacaoMotorista: String
    observacao: String

    # Valores
    valorViagem: Float
    valorViagemRepasse: Float
    valorDeslocamento: Float
    valorDeslocamentoRepasse: Float
    valorHoraParada: Float
    valorHoraParadaRepasse: Float
    valorPedagio: Float
    valorEstacionamento: Float

    # Enums
    natureza: NaturezaVoucher
    tipoCorrida: TipoCorrida
    status: StatusVoucher

    # Relações obrigatórias
    empresaCliente: EmpresaCliente
    empresaClienteId: ID
    unidadeCliente: UnidadeEmpresaCliente
    unidadeClienteId: ID
    motorista: Motorista
    motoristaId: ID
    carro: Carro
    carroId: ID
    adminUsuario: AdminUsuario
    adminUsuarioId: ID
    solicitante: Solicitante
    solicitanteId: ID
    operadora: Operadora
    operadoraId: ID

    # Relações opcionais
    modeloFixo: ModeloVoucherFixo
    modeloTurno: ModeloVoucherTurno
    rota: Rota

    # Relação many
    passageiros: [VoucherPassageiro]
  }

  # Inputs para criação/atualização
  input VoucherCreateInput {
    origem: String
    destino: String
    dataHoraProgramado: DateTime
    valorViagem: Float
    valorViagemRepasse: Float
    valorDeslocamento: Float
    valorDeslocamentoRepasse: Float
    valorHoraParada: Float
    valorHoraParadaRepasse: Float
    valorPedagio: Float
    valorEstacionamento: Float
    qntTempoParado: DateTime
    assinatura: String
    observacaoMotorista: String
    observacao: String
    natureza: NaturezaVoucher
    tipoCorrida: TipoCorrida
    status: StatusVoucher = Aberto

    # IDs para conectar relações obrigatórias
    empresaClienteId: ID
    unidadeClienteId: ID
    motoristaId: ID
    carroId: ID
    adminUsuarioId: ID
    solicitanteId: ID
    operadoraId: ID

    # IDs para relações opcionais
    modeloFixoId: ID
    modeloTurnoId: ID
    rotaId: ID

    # Para passageiros (array de inputs ou IDs)
    passageiros: [VoucherPassageiroCreateInput]
  }

  input VoucherUpdateInput {
    id: ID!
    origem: String
    destino: String
    dataHoraProgramado: DateTime
    dataHoraConclusao: DateTime
    valorViagem: Float
    valorViagemRepasse: Float
    valorDeslocamento: Float
    valorDeslocamentoRepasse: Float
    valorHoraParada: Float
    valorHoraParadaRepasse: Float
    valorPedagio: Float
    valorEstacionamento: Float
    qntTempoParado: DateTime
    assinatura: String
    observacaoMotorista: String
    observacao: String
    natureza: NaturezaVoucher
    tipoCorrida: TipoCorrida
    status: StatusVoucher

    # IDs para atualizar relações
    empresaClienteId: ID
    unidadeClienteId: ID
    motoristaId: ID
    carroId: ID
    adminUsuarioId: ID
    solicitanteId: ID
    operadoraId: ID
    modeloFixoId: ID
    modeloTurnoId: ID
    rotaId: ID

    # Para passageiros (atualização separada, se necessário)
    passageiros: [VoucherPassageiroUpdateInput!]
  }

  input VoucherFilterInput {
    status: StatusVoucher
    natureza: NaturezaVoucher
    motoristaId: ID
    # Adicione filtros relevantes
  }

  # Queries (exemplo básico, adicione mais se necessário)
  extend type Query {
    voucher(id: ID!): Voucher
    vouchers(
      operadiraId: ID
      filter: VoucherFilterInput
      limit: Int
      offset: Int
    ): [Voucher!]!
    vouchersPorMotorista(motoristaId: ID!): [Voucher!]!
    vouchersMotoristaData(
      motoristaId: ID!
      diaSelecionado: String!
    ): [Voucher!]!
    voucherOperadoraData(operadoraId: ID!, diaSelecionado: String!): [Voucher!]
    voucherPassageiro(id: ID!): VoucherPassageiro!
    voucherPassageiros: [VoucherPassageiro]
  }

  # Mutations
  extend type Mutation {
    criarVoucher(input: VoucherCreateInput!): Voucher!
    criarVouchers(input: [VoucherCreateInput!]!): [Voucher!]!
    editarVoucher(input: VoucherUpdateInput!): Voucher!
    deletarVoucher(id: ID!): Boolean!
  }
`;
