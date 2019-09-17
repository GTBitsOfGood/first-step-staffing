import { combineReducers } from 'redux'
import jobSeekers from './jobSeekers.reducer'
import jobs from './jobs.reducer'
import equipment from './equipment.reducer'

const rootReducer = combineReducers({
  jobSeekers,
  jobs,
  equipment
})

export default rootReducer
