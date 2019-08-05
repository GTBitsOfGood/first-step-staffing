import { gql } from 'apollo-server-express'

const jobSeekerSchema = gql`
  type Jobseeker {
    birthday: Date!
    currentJob: Job
    firstName: String!
    id: ID!
    lastName: String!
    pastJobs: [Job]
    ssn: Int!
    ssnString: String
  }

  extend type Query {
    getJobseekerById(id: ID!): Jobseeker
    getAllJobseekers: [Jobseeker]
    getJobseekersByLastFourSSN(ssnString: String): [Jobseeker]
    getJobseekerByJobId(id: ID!): [Jobseeker]
  }

  extend type Mutation {
    createJobseeker(
      firstName: String!
      lastName: String!
      ssn: Int!
      birthday: Date!
    ): Jobseeker!
    # TODO: convert to boolean??
    deleteJobseekerById(id: ID!): Jobseeker
    # TODO: investigate if jobseeekerId should be moved to context
    assignJobseekerToJob(jobseekerId: ID!, jobId: ID!): Jobseeker!
  }
`

export default jobSeekerSchema
