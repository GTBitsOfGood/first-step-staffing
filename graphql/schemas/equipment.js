import { gql } from 'apollo-server-core'

const equipmentSchema = gql`
  type Equipment {
    name: String
    cost: Float
    id: ID!
  }

  extend type Query {
    getAllEquipment: [Equipment]
    getEquipmentById(id: ID!): Equipment
  }

  extend type Mutation {
    createEquipment(name: String, cost: Float): Equipment
    deleteEquipmentById(id: ID): Equipment
  }
`
export default equipmentSchema
