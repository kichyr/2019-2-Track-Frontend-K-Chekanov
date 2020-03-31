import { sendNewMessage, openNewChat } from './sendMessage'

export function chatFetchData(chatId) {
  return (dispatch) => {
    //FIX: temporary mock
    dispatch(
      openNewChat({
        chatId: chatId,
        topic: 'test',
        messages: [],
      }),
    )
  }
}

export function messagePost(message) {
  //FIX: mock
  return (dispatch) => {
    dispatch(sendNewMessage(message))
  }
}
