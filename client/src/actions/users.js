import * as userTypes from '../constants/user.constants'
import 'whatwg-fetch'

export function getUserBySSN(ssn) {
  return dispatch => {
    dispatch(request({ ssn }))
    return fetch(`/users/SSN?SSN=${ssn}`, { method: 'GET' })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.users))
        return json.users
      })
      .catch(err => dispatch(failure(err)))
  }

  function request(ssn) {
    return { type: userTypes.GET_USERS_BY_SSN_REQUEST, ssn }
  }
  function success(users) {
    return { type: userTypes.GET_USERS_BY_SSN_SUCCESS, users }
  }
  function failure(err) {
    return { type: userTypes.GET_USERS_BY_SSN_FAILURE, err }
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
