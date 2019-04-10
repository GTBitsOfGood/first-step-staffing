import * as equipmentTypes from '../constants/equipment.constants'

const initialState = {
  equipment: [],
  equipmemntLoading: false,
  equipmentError: ''
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case equipmentTypes.GET_ALL_EQUIPMENT_REQUEST:
      return { ...state, equipmemntLoading: true, equipmentError: '' }
    case equipmentTypes.GET_ALL_EQUIPMENT_SUCCESS:
      return {
        ...state,
        equipmemntLoading: false,
        equipmentError: '',
        equipment: action.equipment
      }
    case equipmentTypes.GET_ALL_EQUIPMENT_FAILURE:
      return {
        ...state,
        equipmemntLoading: false,
        equipmentError: action.err.toString()
      }
    case equipmentTypes.CREATE_EQUIPMENT_REQUEST:
      return { ...state, equipmemntLoading: true, equipmentError: '' }
    case equipmentTypes.CREATE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        equipmemntLoading: false,
        equipmentError: '',
        equipment: [...state.equipment, action.equipment]
      }
    case equipmentTypes.CREATE_EQUIPMENT_FAILURE:
      return {
        ...state,
        equipmemntLoading: false,
        equipmentError: action.err.toString()
      }
    default:
      return state
  }
}
