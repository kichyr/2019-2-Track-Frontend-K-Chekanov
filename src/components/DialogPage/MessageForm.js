import React, { useEffect } from 'react'
import singleMessStyles from './singleMessage.module.css'
import WHOAMI from '../whoami'
import topLineStyles from './topLine.module.css'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import BackArrow from '../BackArrow/BackArrow'
// to delete
function getTime() {
  const today = new Date()
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
  return `${date} ${time}`
}

/* function getChatMessages(chatId) {
	const messages = localStorage.getItem('messages');
	return [ messages[chatId].topic, messages[chatId].messages ];
} */

function postMessage(message) {
  const data = JSON.parse(localStorage.getItem('messages'))
  data[message.chatId].push(message)
  localStorage.setItem('messages', JSON.stringify(data))
}

class Message {
  constructor(chatId, userId, messageText) {
    this.messageText = messageText
    this.userId = userId
    this.time = getTime()
    this.chatId = chatId
  }
}

function TopLine({ topic, appState, setAppState }) {
  let history = useHistory()
  return (
    <div id="chatTopLine" className={topLineStyles.container}>
      <div
        id="chatBack"
        onClick={(e) => {
          setAppState(Object.assign({}, appState, { appPage: 'ChatList', prevAppPage: history.location }))
          history.push(`${window.publicUrl}/`)
        }}
        style={{ flex: '0.2' }}
        role="button"
        tabIndex={0}
      >
        <BackArrow />
      </div>
      <div className={topLineStyles.topic}> {topic} </div>
    </div>
  )
}

function MessagesContainer({ messages, appState, setAppState }) {
  let mContainer
  let history = useHistory()
  // eslint-disable-next-line
  useEffect(() => {
    // Обновляем заголовок документа с помощью API браузера
    // eslint-disable-next-line
    mContainer.scrollTop = mContainer.scrollHeight
    // eslint-disable-next-line
  }, [messages])
  return (
    <div
      className={styles.result}
      style={{ scrollTop: 'scrollHeight' }}
      ref={(el) => {
        mContainer = el
      }}
    >
      {messages.map((message, index) => (
        <div key={index.toString()} className={singleMessStyles.singleMessContainer}>
          <input
            type="image"
            onClick={(e) => {
              //setAppState(Object.assign({}, appState, {appPage: 'ProfilePage', prevAppPage: 'Chat'}));
              history.push(`${window.publicUrl}/profile`, appState)
            }}
            className={topLineStyles.chatImg}
            src="http://emilcarlsson.se/assets/rachelzane.png"
            alt="Avatar"
          />
          <div className={singleMessStyles.singleMess} sender={message.userId === WHOAMI.userId ? 'me' : 'him'}>
            <div className={singleMessStyles.singleMessText}> {message.messageText} </div>
            <p className={singleMessStyles.dateTime}> {message.time} </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function InputPanel({ appState, setAppState }) {
  const sendMessage = (e) => {
    e.preventDefault()
    const newMess = new Message(appState.openedChat.chatId, WHOAMI.userId, e.target[0].value)
    postMessage(newMess)
    setAppState(
      Object.assign(
        {},
        appState,
        Object.assign(appState.openedChat, { messages: [...appState.openedChat.messages, newMess] }),
      ),
    )
    e.target[0].value = ''
  }
  return (
    <div className={styles.input_panel}>
      <form className={styles.sendMessForm} onSubmit={sendMessage}>
        <input type="text" name={styles.messageText} maxLength="512" placeholder="Введите сообщеине" />
        <input type="submit" value="Отправить" />
      </form>
    </div>
  )
}

function MessageForm({ appState, setAppState }) {
  return (
    <div className={styles.message_form}>
      <TopLine topic={appState.openedChat.topic} appState={appState} setAppState={setAppState} />
      <MessagesContainer messages={appState.openedChat.messages} appState={appState} setAppState={setAppState} />
      <InputPanel appState={appState} setAppState={setAppState} />
    </div>
  )
}

MessageForm.propTypes = {
  appState: PropTypes.shape({
    appPage: PropTypes.string.isRequired,
    openedChat: PropTypes.shape({
      chatId: PropTypes.number,
      topic: PropTypes.string.isRequired,
      messages: PropTypes.array.isRequired,
    }),
  }).isRequired,
  setAppState: PropTypes.func.isRequired,
}

InputPanel.propTypes = {
  appState: PropTypes.shape({
    appPage: PropTypes.string.isRequired,
    openedChat: PropTypes.shape({
      chatId: PropTypes.number,
      topic: PropTypes.string.isRequired,
      messages: PropTypes.array.isRequired,
    }),
  }).isRequired,
  setAppState: PropTypes.func.isRequired,
}

MessagesContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  appState: PropTypes.shape({
    appPage: PropTypes.string.isRequired,
    openedChat: PropTypes.shape({
      chatId: PropTypes.number,
      topic: PropTypes.string.isRequired,
      messages: PropTypes.array.isRequired,
    }),
  }).isRequired,
  setAppState: PropTypes.func.isRequired,
}

TopLine.propTypes = {
  topic: PropTypes.string.isRequired,
  appState: PropTypes.shape({
    appPage: PropTypes.string.isRequired,
    openedChat: PropTypes.shape({
      chatId: PropTypes.number,
      topic: PropTypes.string.isRequired,
      messages: PropTypes.array.isRequired,
    }),
  }).isRequired,
  setAppState: PropTypes.func.isRequired,
}

export default MessageForm
