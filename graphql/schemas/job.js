import { gql } from 'apollo-server-express'

const jobSchema = gql`
  enum TransportationTypeEnum {
    VAN
    UBER
  }
  type Job {
    address: String
    id: ID!
    fssLocation: Location
    name: String
    peopleNeeded: Int
    transportationType: TransportationTypeEnum
    transportationCost: Float
  }

  extend type Query {
    getAllJobs: [Job]
    getJobById(id: ID!): Job
    getJobsByPeopleNeeded(peopleNeeded: Int): [Job!]
  }

  extend type Mutation {
    createJob(
      name: String!
      address: String!
      fssLocation: ID!
      peopleNeeded: Int!
      transportationType: TransportationTypeEnum!
      transportationCost: Float!
    ): Job
    # TODO: Convert to boolean??
    deleteJobById(id: ID): Job
  }
`
export default jobSchema
