import * as equipmentTypes from '../constants/equipment.constants'

const initialState = {
  equipment: [],
  loading: false,
  error: ''
}

export default function equipment(state = initialState, action) {
  switch (action.type) {
    case equipmentTypes.GET_ALL_EQUIPMENT_REQUEST:
      return { ...state, loading: true, error: '' }
    case equipmentTypes.GET_ALL_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        equipment: action.equipment
      }
    case equipmentTypes.GET_ALL_EQUIPMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.err.toString()
      }
    case equipmentTypes.DELETE_EQUIPMENT_REQUEST:
      return { ...state, loading: true, error: '' }
    case equipmentTypes.DELETE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        equipment: state.equipment.filter(
          equipment => equipment._id !== action.equipmentId
        )
      }
    case equipmentTypes.DELETE_EQUIPMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.err.toString()
      }
    case equipmentTypes.CREATE_EQUIPMENT_REQUEST:
      return { ...state, loading: true, error: '' }
    case equipmentTypes.CREATE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        equipment: [...state.equipment, action.equipment]
      }
    case equipmentTypes.CREATE_EQUIPMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.err.toString()
      }
    default:
      return state
  }
}
