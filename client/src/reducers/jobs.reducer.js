import * as jobTypes from '../constants/job.constants'

const initialState = {
  jobs: [],
  jobsLoading: false,
  jobsError: ''
}

export default function jobs(state = initialState, action) {
  switch (action.type) {
    case jobTypes.GET_ALL_JOBS_REQUEST:
      return { ...state, jobsLoading: true, jobsError: '' }
    case jobTypes.GET_ALL_JOBS_SUCCESS:
      return {
        ...state,
        jobsLoading: false,
        jobsError: '',
        jobs: action.jobs
      }
    case jobTypes.GET_ALL_JOBS_FAILURE:
      return {
        ...state,
        jobsLoading: false,
        jobsError: action.err.toString()
      }
    case jobTypes.DELETE_JOB_REQUEST:
      return { ...state, jobsLoading: true, jobsError: '' }
    case jobTypes.DELETE_JOB_SUCCESS:
      return {
        ...state,
        jobsLoading: false,
        jobsError: '',
        jobs: state.jobs.filter(job => job._id !== action.deleted._id)
      }
    case jobTypes.DELETE_JOB_FAILURE:
      return { ...state, jobsLoading: false, jobsError: action.err.toString() }
    default:
      return state
  }
}
