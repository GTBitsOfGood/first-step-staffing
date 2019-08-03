import JobSeeker from "../models/jobSeeker";

const jobSeekerResolvers = {
    Query: {
        jobseekers: async () => {
            return await JobSeeker.find().populate('currentJob')
        }
    }
}

export default jobSeekerResolvers
