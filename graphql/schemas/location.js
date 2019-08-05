import { gql } from 'apollo-server-core'

const locationSchema = gql`
  type Location {
    streetNumber: Int
    streetName: String
    city: String
    state: String
    id: ID
  }

  extend type Query {
    getAllLocations: [Location]
    getLocationById(id: ID!): Location
  }

  extend type Mutation {
    createLocation(
      streetNumber: Int
      streetName: String
      city: String
      state: String
    ): Location
    deleteLocationById(id: ID): Location
  }
`
export default locationSchema
