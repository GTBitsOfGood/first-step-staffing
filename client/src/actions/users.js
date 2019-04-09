import * as userTypes from '../constants/user.constants'
import 'whatwg-fetch'

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export function getAllJobSeekers() {
  return dispatch => {
    dispatch(request())
    return fetch(`/users/`, { method: 'GET' })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.users))
        return json.users
      })
      .catch(err => dispatch(failure(err)))
  }

  function request() {
    return { type: userTypes.GET_ALL_JOB_SEEKERS_REQUEST }
  }
  function success(users) {
    return { type: userTypes.GET_ALL_JOB_SEEKERS_SUCCESS, users }
  }
  function failure(err) {
    return { type: userTypes.GET_ALL_JOB_SEEKERS_SUCCESS, err }
  }
}

export function deleteJobSeeker(id) {
  return dispatch => {
    dispatch(request())
    return fetch(`/users/user/${id}`, { method: 'DELETE' })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.deleted))
        return json.deleted
      })
      .catch(err => dispatch(failure(err)))
  }

  function request() {
    return { type: userTypes.DELETE_JOB_SEEKER_REQUEST }
  }
  function success(deleted) {
    return { type: userTypes.DELETE_JOB_SEEKER_SUCCESS, deleted }
  }
  function failure(err) {
    return { type: userTypes.DELETE_JOB_SEEKER_FAILURE, err }
  }
}
