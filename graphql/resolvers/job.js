import Job from '../models/job'
import Location from '../models/location'

const jobResolvers = {
  TransportationTypeEnum: {
    VAN: 'Van',
    UBER: 'Uber'
  },
  Query: {
    getAllJobs: async () => {
      return await Job.find()
    },
    getJobById: async (parent, { id }) => {
      return await Job.findById(id)
    },
    getJobsByPeopleNeeded: async (parent, { peopleNeeded }) => {
      return await job.find({ peopleNeeded })
    }
  },
  Mutation: {
    createJob: async (
      parent,
      {
        name,
        address,
        fssLocation,
        peopleNeeded,
        transportationType,
        transportationCost
      }
    ) => {
      const location = Location.findById(fssLocation)
      if (location) {
        const job = {
          name,
          address,
          fssLocation,
          peopleNeeded,
          transportationType,
          transportationCost
        }
        return await Job.create(job)
      } else {
        return null // TODO: update to proper error with handling
      }
    },
    deleteJobById: async (parent, { id }) => {
      return await Job.findByIdAndDelete(id)
    }
  }
}

export default jobResolvers
