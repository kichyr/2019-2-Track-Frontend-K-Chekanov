export const openAudioMessagePage = () => {
  return {
    type: 'HIDE_OR_DRAW_RECORDER_PAGE',
  }
}

export const addNewChatToChatList = (newChat) => {
  return {
    type: 'ADD_NEW_CHAT_TO_CHAT_LIST',
    newChat,
  }
}

export const openNewChat = (openingChat) => {
  return {
    type: 'OPEN_CHAT',
    openingChat,
  }
}

export const sendNewMessage = (message) => {
  return {
    type: 'SEND_MESSAGE',
    message,
  }
}
