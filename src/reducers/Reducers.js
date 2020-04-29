const audioMessagePageReducer = (state = false, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case 'HIDE_OR_DRAW_RECORDER_PAGE':
      return !state
    default:
      return state
  }
}

// addChatToList appends created chat to chat list
const chatListReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW_CHAT_TO_CHAT_LIST':
      return [...state, action.newChat]
    case 'DElETE_CHAT_FROM_LIST':
      //FIX: add ability to delete chat from chatList
      return { ...state }
    default:
      return state
  }
}

const openedChatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'OPEN_CHAT':
      return action.openingChat
    case 'SEND_MESSAGE':
      let newState = { ...state }
      newState.messages = [...newState.messages, action.message]
      return newState
    default:
      return state
  }
}

//
export { audioMessagePageReducer, chatListReducer, openedChatReducer }
