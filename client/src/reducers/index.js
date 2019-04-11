import { combineReducers } from 'redux'
import users from './users.reducer'
import equipment from './equipment.reducer'

const rootReducer = combineReducers({
  equipment
})

export default rootReducer
