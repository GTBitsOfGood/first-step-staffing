import * as userTypes from '../constants/user.constants'

const initialState = {
  users: [],
  usersLoading: false,
  usersError: ''
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case userTypes.GET_ALL_JOB_SEEKERS_REQUEST:
      return { ...state, usersLoading: true, usersError: '' }
    case userTypes.GET_ALL_JOB_SEEKERS_SUCCESS:
      return { ...state, usersLoading: false, usersError: '', users: action.users }
    case userTypes.GET_ALL_JOB_SEEKERS_FAILURE:
      return { ...state, usersLoading: false, usersError: action.err.toString() }
    default:
      return state
  }
}
