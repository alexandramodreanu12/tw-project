import { combineReducers } from 'redux'
import plan from './PlanReducer'
import user from './UserReducer'
import location from './LocationReducer'
import locationStep from './LocationStepReducer'
import step from './StepReducer'

export default combineReducers({
    plan,
    user,
    location,
    locationStep,
    step
})