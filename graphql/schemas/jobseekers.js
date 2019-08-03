import {
    gql
} from 'apollo-server-express'

const jobSeekerSchema = gql `
    type Jobseeker {
        firstName: String
        lastName: String
        ssn: Int
        id: ID!
    }

    type Query {
        jobseeker(id: ID!): Jobseeker
        jobseekers: [Jobseeker]
    }
`

export default jobSeekerSchema
