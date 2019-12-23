import { combineReducers } from 'redux'
import { audioMessagePageReducer } from './messagesReducers.js'

const allReducers = combineReducers({
  isMessagePageOpen: audioMessagePageReducer,
})

export default allReducers
