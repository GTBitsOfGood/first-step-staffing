import * as jobTypes from '../constants/job.constants'

const initialState = {
  jobs: [],
  loading: false,
  error: ''
}

export default function jobs(state = initialState, action) {
  switch (action.type) {
    case jobTypes.GET_ALL_JOBS_REQUEST:
      return { ...state, loading: true, error: '' }
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
      return { ...state, loading: true, error: '' }
    case jobTypes.DELETE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        jobs: state.jobs.filter(job => job._id !== action.deleted._id)
      }
    case jobTypes.DELETE_JOB_FAILURE:
      return { ...state, loading: false, error: action.err.toString() }
    case jobTypes.CREATE_JOB_REQUEST:
      return { ...state, loading: true, error: '' }
    case jobTypes.CREATE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        jobs: [...state.jobs, action.job]
      }
    case jobTypes.CREATE_JOB_FAILURE:
      return { ...state, loading: false, error: action.err.toString() }
    default:
      return state
  }
}
