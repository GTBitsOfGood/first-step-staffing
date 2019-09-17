import * as jobTypes from '../constants/job.constants'

const initialState = {
  jobs: [],
  loading: false,
  error: ''
}

export default function jobs(state = initialState, action) {
  switch (action.type) {
    case jobTypes.GET_ALL_JOBS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case jobTypes.GET_ALL_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        jobs: action.jobs
      }
    case jobTypes.GET_ALL_JOBS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.err.toString()
      }
    case jobTypes.DELETE_JOB_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case jobTypes.DELETE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        jobs: state.jobs.filter(job => job._id !== action.deleted._id)
      }
    case jobTypes.DELETE_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.err.toString()
      }
    case jobTypes.CREATE_JOB_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case jobTypes.CREATE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        jobs: [...state.jobs, action.job]
      }
    case jobTypes.CREATE_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.err.toString()
      }
    case jobTypes.GET_JOB_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case jobTypes.GET_JOB_BY_ID_SUCCESS:
      const newJob = action.job
      let i = state.jobs.length !== 0 ? state.job.findIndex(j => j._id === newJob._id) : -1
      if (i === -1) {
        return {
          ...state,
          loading: false,
          error: '',
          jobs: [...state.jobs, newJob]
        }
      } else {
        return {
          ...state,
          loading: false,
          error: ''
        }
      }
    case jobTypes.GET_JOB_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.err.toString()
      }
    default:
      return state
  }
}