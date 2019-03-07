import * as userTypes from '../constants/user.constants'

const initialState = {
  users: [],
  loading: false,
  error: null
}
export default function users(state = initialState, action) {
  switch (action.type) {
    case userTypes.GET_USERS_BY_SSN_REQUEST:
      return { ...state, loading: true, error: null }
    case userTypes.GET_USERS_BY_SSN_SUCCESS:
      return { ...state, loading: false, users: action.users }
    case userTypes.GET_USERS_BY_SSN_FAILURE:
      return { ...state, loading: false, error: action.err, users: [] }
    default:
      return action
  }
}
