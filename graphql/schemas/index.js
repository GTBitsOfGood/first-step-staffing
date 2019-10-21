import jobSeekerSchema from './jobseekers'
import jobSchema from './job'
import equipmentSchema from './equipment'
import locationSchema from './location'
import { gql } from 'apollo-server-core'

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`
export default [
  linkSchema,
  jobSeekerSchema,
  jobSchema,
  equipmentSchema,
  locationSchema
]
