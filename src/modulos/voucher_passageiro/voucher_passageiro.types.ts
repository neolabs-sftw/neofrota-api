import gql from "graphql-tag";

export const voucherPassageiroTypes = gql`
  enum StatusPresenca {
    Agendado
    Presente
    Ausente
  }

  type VoucherPassageiro {
    id: ID!

    voucherId: Voucher!
    passageiroId: Passageiro!

    horarioEmbarqueReal: DateTime
    rateio: Float
    statusPresenca: StatusPresenca!
  }

  input VoucherPassageiroCreateInput {
    passageiroId: ID!

    horarioEmbarqueReal: DateTime
    rateio: Float
    statusPresenca: StatusPresenca
  }

  input VoucherPassageiroUpdateInput {
    id: ID!
    horarioEmbarqueReal: DateTime
    rateio: Float
    statusPresenca: StatusPresenca
  }

  type Query {
    voucherPassageiro(id: ID!): VoucherPassageiro!
    voucherPassageiros: [VoucherPassageiro]
  }
`;
