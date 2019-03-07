import * as userTypes from '../constants/user.constants'

export default function users(state = [], action) {
  switch (action.type) {
    case userTypes.GET_USERS_BY_SSN:
      return { ...state, usersBySSN: action.usersBySSN }
    default:
      return action
  }
}
