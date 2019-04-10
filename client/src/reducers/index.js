import { combineReducers } from 'redux'
import users from './users.reducer'
import jobs from './jobs.reducer'

const rootReducer = combineReducers({
  users,
  jobs
})

export default rootReducer
