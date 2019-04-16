import * as jobSeekerTypes from '../constants/jobSeeker.constants'
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
    return fetch(`/jobseekers/`, { method: 'GET' })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.jobSeekers))
        return json.jobSeekers
      })
      .catch(err => dispatch(failure(err)))
  }

  function request() {
    return { type: jobSeekerTypes.GET_ALL_JOBSEEKERS_REQUEST }
  }
  function success(jobSeekers) {
    return { type: jobSeekerTypes.GET_ALL_JOBSEEKERS_SUCCESS, jobSeekers }
  }
  function failure(err) {
    return { type: jobSeekerTypes.GET_ALL_JOBSEEKERS_SUCCESS, err }
  }
}

export function createJobSeeker(newJobSeeker) {
  return dispatch => {
    dispatch(request())
    return fetch('/jobseekers/jobseeker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJobSeeker)
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.jobSeeker))
        return json.jobSeeker
      })
      .catch(err => dispatch(failure(err)))
  }

  function request() {
    return { type: jobSeekerTypes.CREATE_JOBSEEKER_REQUEST }
  }

  function success(jobSeeker) {
    return { type: jobSeekerTypes.CREATE_JOBSEEKER_SUCCESS, jobSeeker }
  }

  function failure(err) {
    return { type: jobSeekerTypes.CREATE_JOBSEEKER_FAILURE, err }
  }
}

export function deleteJobSeeker(id) {
  return dispatch => {
    dispatch(request())
    return fetch(`/jobseekers/jobseeker/${id}`, { method: 'DELETE' })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.deleted))
        return json.deleted
      })
      .catch(err => dispatch(failure(err)))
  }

  function request() {
    return { type: jobSeekerTypes.DELETE_JOBSEEKER_REQUEST }
  }
  function success(deleted) {
    return { type: jobSeekerTypes.DELETE_JOBSEEKER_SUCCESS, deleted }
  }
  function failure(err) {
    return { type: jobSeekerTypes.DELETE_JOBSEEKER_FAILURE, err }
  }
}

export function getJobSeekerByID(id) {
  return dispatch => {
    dispatch(request())
    return fetch(`/jobseekers/jobseeker/${id}`, {
      method: 'GET'
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.jobSeeker))
        return json.jobSeeker
      })
      .catch(err => {
        dispatch(failure(err))
      })
  }

  function request() {
    return {
      type: jobSeekerTypes.GET_JOBSEEKER_BY_ID_REQUEST
    }
  }

  function success(jobSeeker) {
    return {
      type: jobSeekerTypes.GET_JOBSEEKER_BY_ID_SUCCESS,
      jobSeeker
    }
  }

  function failure(err) {
    return {
      type: jobSeekerTypes.GET_JOBSEEKER_BY_ID_FAILURE,
      err
    }
  }
}

export function getJobSeekersByJobID(id) {
  return dispatch => {
    dispatch(request())
    return fetch(`/jobseekers/job/${id}`, { method: 'GET' })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.jobSeekers))
        return json.jobSeekers
      })
      .catch(err => dispatch(failure(err)))
  }

  function request() {
    return { type: jobSeekerTypes.GET_JOBSEEKER_BY_JOB_ID_REQUEST }
  }
  function success(jobSeekers) {
    return { type: jobSeekerTypes.GET_JOBSEEKER_BY_JOB_ID_SUCCESS, jobSeekers }
  }
  function failure(err) {
    return { type: jobSeekerTypes.GET_JOBSEEKER_BY_JOB_ID_FAILURE, err }
  }
}
