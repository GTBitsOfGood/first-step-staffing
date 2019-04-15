import * as jobSeekerTypes from '../constants/jobSeeker.constants'

const initialState = {
  jobSeekers: [],
  loading: false,
  error: ''
}

export default function jobSeekers(state = initialState, action) {
  switch (action.type) {
    case jobSeekerTypes.GET_ALL_JOB_SEEKERS_REQUEST:
      return { ...state, loading: true, error: '' }
    case jobSeekerTypes.GET_ALL_JOB_SEEKERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        jobSeekers: action.jobSeekers
      }
    case jobSeekerTypes.GET_ALL_JOB_SEEKERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.err.toString()
      }
    case jobSeekerTypes.DELETE_JOB_SEEKER_REQUEST:
      return { ...state, loading: true, error: '' }
    case jobSeekerTypes.DELETE_JOB_SEEKER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        jobSeekers: state.jobSeekers.filter(js => js._id !== action.deleted._id)
      }
    case jobSeekerTypes.DELETE_JOB_SEEKER_FAILURE:
      return { ...state, loading: false, error: action.err.toString() }
    case jobSeekerTypes.GET_JOB_SEEKER_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.err.toString() }
    case jobSeekerTypes.GET_JOB_SEEKER_BY_ID_REQUEST:
      return { ...state, loading: true, error: '' }
    case jobSeekerTypes.GET_JOB_SEEKER_BY_ID_SUCCESS:
      let newJob = action.jobSeeker
      let i = state.jobSeekers
        ? state.jobSeekers.findIndex(js => js._id === newJob._id)
        : -1
      if (i === -1) {
        return {
          ...state,
          loading: false,
          error: '',
          jobSeekers: [...state.jobSeekers, newJob]
        }
      }
      return {
        ...state,
        loading: false,
        error: ''
      }
    default:
      return state
  }
}
