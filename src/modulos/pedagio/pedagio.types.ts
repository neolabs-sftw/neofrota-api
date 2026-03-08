import gql from 'graphql-tag';

export const pedagioTypes = gql`

    type Pedagio {
        id: ID
        nome: String
        valor: Float
        operadoraId: Operadora
    }

    type Query {
        pedagios: [Pedagio]
        pedagioOperadoraId(id: ID!): [Pedagio]
        pedagioId(id: ID!): Pedagio
    }

    input PedagioInput {
        nome: String
        valor: Float
        operadoraId: Int
    }

    type Mutation{
        createPedagio(data: PedagioInput!): Pedagio
        updatePedagio(id: ID!, data: PedagioInput!): Pedagio
        deletePedagio(id: ID!): Pedagio
    }
`