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
    default:
      return state
  }
}
