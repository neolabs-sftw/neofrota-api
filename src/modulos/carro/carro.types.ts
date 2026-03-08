import gql from 'graphql-tag';

export const carroTypes = gql`
  type Carro {
    id: ID
    placa: String
    marca: String
    modelo: String
    cor: String
    crlv: String
    vCrlv: Boolean
    chassi: String
    ano: String
    agregadoId: Motorista
    motoristaId: Motorista
    operadoraId: Operadora
  }

  type Marca {
    id: ID
    nome: String
  }

  type Modelo {
    id: ID
    nome: String
    marcaId: Marca
  }

  type Query {
    carros: [Carro]
    carroId(id: ID!): Carro!
    carrosAgregadoId(id: ID!): [Carro]
    carroMotoristaId(idMotorista: ID!): [Carro]
    marcas: [Marca]
    modelos: [Modelo]
  }

  input CarroInput {
    placa: String
    marca: String
    modelo: String
    cor: String
    crlv: String
    chassi: String
    ano: String
    agregadoId: Int
    motoristaId: Int
    operadoraId: Int
  }

  type Mutation {
    createCarro(data: CarroInput!): Carro
    updateCarro(id: ID!, data: CarroInput!): Carro
    deleteCarro(id: ID!): Boolean
  }
`;
