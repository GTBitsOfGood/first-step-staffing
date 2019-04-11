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
    return { type: userTypes.GET_ALL_JOBSEEKERS_REQUEST }
  }
  function success(users) {
    return { type: userTypes.GET_ALL_JOBSEEKERS_SUCCESS, users }
  }
  function failure(err) {
    return { type: userTypes.GET_ALL_JOBSEEKERS_FAILURE, err }
  }
}

export function createJobseeker(newJobseeker) {
  return dispatch => {
    dispatch(request())
    return fetch('/users/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJobseeker)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.user))
        return json.user
      })
      .catch(err => dispatch(failure(err)))
  }

  function request() {
    return { type: userTypes.CREATE_JOBSEEKER_REQUEST }
  }

  function success(jobseeker) {
    return { type: userTypes.CREATE_JOBSEEKER_SUCCESS, jobseeker }
  }

  function failure(err) {
    return { type: userTypes.CREATE_JOBSEEKER_FAILURE, err }
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
    return { type: userTypes.DELETE_JOBSEEKER_REQUEST }
  }
  function success(deleted) {
    return { type: userTypes.DELETE_JOBSEEKER_SUCCESS, deleted }
  }
  function failure(err) {
    return { type: userTypes.DELETE_JOBSEEKER_FAILURE, err }
  }
}
