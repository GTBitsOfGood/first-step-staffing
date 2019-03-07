import * as userTypes from '../constants/user.constants'
import 'whatwg-fetch'

export function getUserBySSN(ssn) {
  return dispatch => {
    return fetch(`/user/SSN?SSN=${ssn}`, { method: 'GET' })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch(receiveUsersBySSN(json))
      })
  }
}
