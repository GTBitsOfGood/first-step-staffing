import * as jobTypes from '../constants/job.constants'
import 'whatwg-fetch'

export function getAllJobs() {
  return dispatch => {
    dispatch(request())
    return fetch(`/jobs`, {
        method: 'GET'
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.jobs))
        return json.jobs
      })
      .catch(err => dispatch(failure(err)))
  }

  function request() {
    return {
      type: jobTypes.GET_ALL_JOBS_REQUEST
    }
  }

  function success(jobs) {
    return {
      type: jobTypes.GET_ALL_JOBS_SUCCESS,
      jobs
    }
  }

  function failure(err) {
    return {
      type: jobTypes.GET_ALL_JOBS_FAILURE,
      err
    }
  }
}

export function deleteJob(id) {
  return dispatch => {
    dispatch(request())
    return fetch(`/jobs/job/${id}`, {
        method: 'DELETE'
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.deleted))
        return json.deleted
      })
      .catch(err => dispatch(failure(err)))
  }

  function request() {
    return {
      type: jobTypes.DELETE_JOB_REQUEST
    }
  }

  function success(deleted) {
    return {
      type: jobTypes.DELETE_JOB_SUCCESS,
      deleted
    }
  }

  function failure(err) {
    return {
      type: jobTypes.DELETE_JOB_FAILURE,
      err
    }
  }
}

export function createJob(job) {
  return dispatch => {
    dispatch(request())
    return fetch(`/jobs/job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.job))
        return json.job
      })
      .catch(err => dispatch(failure(err)))
  }

  function request() {
    return {
      type: jobTypes.CREATE_JOB_REQUEST
    }
  }

  function success(job) {
    return {
      type: jobTypes.CREATE_JOB_SUCCESS,
      job
    }
  }

  function failure(err) {
    return {
      type: jobTypes.CREATE_JOB_FAILURE,
      err
    }
  }
}

export function getJobByID(id) {
  return dispatch => {
    dispatch(request())
    return fetch(`/jobs/job/${id}`, {
        method: 'GET'
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.job))
        return json.job
      })
      .catch(err => {
        dispatch(failure(err))
      })
  }

  function request() {
    return {
      type: jobTypes.GET_JOB_BY_ID_REQUEST
    }
  }

  function success(job) {
    return {
      type: jobTypes.GET_JOB_BY_ID_SUCCESS,
      job
    }
  }

  function failure(err) {
    return {
      type: jobTypes.GET_JOB_BY_ID_FAILURE,
      err
    }
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}