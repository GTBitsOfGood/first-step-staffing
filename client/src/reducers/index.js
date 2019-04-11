import { combineReducers } from 'redux'
import users from './users.reducer'
import jobs from './jobs.reducer'
import equipment from './equipment.reducer'

const rootReducer = combineReducers({
  users,
  jobs,
  equipment
})

export default rootReducer
