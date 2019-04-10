import * as equipmentTypes from '../constants/equipment.constants'
import 'whatwg-fetch'

export function getAllEquipment() {
  return dispatch => {
    dispatch(request())
    return fetch(`/equipment/`, { method: 'GET' })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.equipment))
        return json.equipment
      })
      .catch(err => dispatch(failure(err)))
  }

  function request() {
    return { type: equipmentTypes.GET_ALL_EQUIPMENT_REQUEST }
  }

  function success(equipment) {
    return { type: equipmentTypes.GET_ALL_EQUIPMENT_SUCCESS, equipment }
  }

  function failure(err) {
    return { type: equipmentTypes.GET_ALL_EQUIPMENT_FAILURE, err }
  }
}

export function createEquipment(newEquipment) {
  console.log(newEquipment)
  return dispatch => {
    dispatch(request())
    return fetch('/equipment/equipment', {
      method: 'POST',
      body: newEquipment
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(success(json.equipment))
        return json.equipment
      })
      .catch(err => dispatch(failure(err)))
  }

  function request() {
    return { type: equipmentTypes.CREATE_EQUIPMENT_REQUEST }
  }

  function success(equipment) {
    return { type: equipmentTypes.CREATE_EQUIPMENT_SUCCESS, equipment }
  }

  function failure(err) {
    return { type: equipmentTypes.CREATE_EQUIPMENT_FAILURE, err }
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
