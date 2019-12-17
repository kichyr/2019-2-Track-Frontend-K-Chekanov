import WHOAMI from '../whoami'

export class Message {
  constructor(chatId, userId, messageText, contentType, link = '', fileName = '') {
    this.messageText = messageText
    this.userId = userId
    this.time = getTime()
    this.chatId = chatId
    this.contentType = contentType
    this.link = link
    this.fileName = fileName
  }
}

// to delete
function getTime() {
  const today = new Date()
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
  return `${date} ${time}`
}

export async function sendFile(files, appState, setAppState) {
  generateFileMeassage(appState, setAppState, files[0])

  const formData = new FormData()
  formData.append('image', files[0])
  try {
    const response = await fetch('https://tt-front.now.sh/upload', {
      method: 'POST',
      body: formData,
    })
    const result = await response.json()
    console.log('Успех:', JSON.stringify(result))
  } catch (error) {
    console.error('Ошибка:', error)
  }
}

function generateFileMeassage(appState, setAppState, file) {
  let contentType
  if (file.type.includes('image')) contentType = 'image'
  else contentType = 'file'
  const link = URL.createObjectURL(file)
  const newMess = new Message(appState.openedChat.chatId, WHOAMI.userId, '', contentType, link, file.name)
  console.log(newMess)
  setAppState({
    ...appState,
    ...Object.assign(appState.openedChat, { messages: [...appState.openedChat.messages, newMess] }),
  })
}
