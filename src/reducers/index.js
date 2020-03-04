import { combineReducers } from 'redux'
import { audioMessagePageReducer, chatListReducer, openedChatReducer } from './Reducers'

const allReducers = combineReducers({
  isMessagePageOpen: audioMessagePageReducer,
  chatList: chatListReducer,
  openedChat: openedChatReducer,
})

export default allReducers
