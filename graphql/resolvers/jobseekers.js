import JobSeeker from '../models/jobSeeker'
import Job from '../models/job'

const jobSeekerResolvers = {
  Query: {
    getAllJobseekers: async () => {
      const jss = await JobSeeker.find()
        .populate('currentJob')
        .populate('pastJobs')
        .exec()
      if (jss) {
        console.log(jss)
        return jss
      }
    },
    getJobseekerById: async (parent, { id }) => {
      return await JobSeeker.findById(id)
        .populate('currentJob')
        .populate('pastJobs')
    },
    getJobseekersByLastFourSSN: async (parent, { ssnString }) => {
      return await JobSeeker.find({ ssnString }).populate('currentJob')
    },
    getJobseekerByJobId: async (parent, { id }) => {
      return await JobSeeker.find({ currentJob: id })
    }
  },

  Mutation: {
    createJobseeker: async (parent, { firstName, lastName, ssn, birthday }) => {
      return await JobSeeker.create({ firstName, lastName, ssn, birthday })
    },
    deleteJobseekerById: async (parent, { id }) => {
      return await JobSeeker.findByIdAndDelete(id)
    },
    // TODO: this isn't really safe, it doesn't do any error checking after the update
    // to make sure it was successful. Also it returns the prevous state not the current one,
    // don't know the problem
    assignJobseekerToJob: async (parent, { jobseekerId, jobId }) => {
      return await JobSeeker.findById(jobseekerId, (err, js) => {
        const job = Job.findById(jobId, (err, job) => {
          if (job) {
            Object.assign(js, { currentJob: job })
            js.save()
          }
        })
      })
        .populate('pastJobs')
        .populate('currentJob')
    }
  }
}

export default jobSeekerResolvers
