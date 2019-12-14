import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import singleMessStyles from './singleMessage.module.css'
import WHOAMI from '../whoami'
import topLineStyles from './topLine.module.css'
import styles from './styles.module.css'
import BackArrow from '../BackArrow/BackArrow'
import { PAPER_AIRPLANE, CLIP } from './svgVariables'
import { usePosition } from 'use-position'

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
  constructor(chatId, userId, messageText, contentType) {
    this.messageText = messageText
    this.userId = userId
    this.time = getTime()
    this.chatId = chatId
    this.contentType = contentType
  }
}

function TopLine({ topic, appState, setAppState }) {
  const history = useHistory()
  return (
    <div id="chatTopLine" className={topLineStyles.container}>
      <div
        id="chatBack"
        onClick={(e) => {
          setAppState({ ...appState, appPage: 'ChatList', prevAppPage: history.location })
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
  const history = useHistory()
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
              // setAppState(Object.assign({}, appState, {appPage: 'ProfilePage', prevAppPage: 'Chat'}));
              history.push(`${window.publicUrl}/profile`, appState)
            }}
            className={topLineStyles.chatImg}
            src="http://emilcarlsson.se/assets/rachelzane.png"
            alt="Avatar"
          />
          <div className={singleMessStyles.singleMess} sender={message.userId === WHOAMI.userId ? 'me' : 'him'}>
            <div className={singleMessStyles.singleMessText}>
              {(() => {
                if (message.contentType === 'link') return <a href={message.messageText}> {message.messageText} </a>
                return <div> {message.messageText} </div>
              })()}
            </div>
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
    const newMess = new Message(appState.openedChat.chatId, WHOAMI.userId, e.target[0].value, 'text')
    postMessage(newMess)
    setAppState({
      ...appState,
      ...Object.assign(appState.openedChat, { messages: [...appState.openedChat.messages, newMess] }),
    })
    e.target[0].value = ''
  }

  let textInput = React.createRef()
  let attachmentTypeDiv = React.createRef()
  const { latitude, longitude } = usePosition()

  const GeolocationHandler = (e) => {
    e.preventDefault()
    const newMess = new Message(
      appState.openedChat.chatId,
      WHOAMI.userId,
      `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`,
      'link',
    )
    postMessage(newMess)
    setAppState({
      ...appState,
      ...Object.assign(appState.openedChat, { messages: [...appState.openedChat.messages, newMess] }),
    })
    attachmentTypeDiv.current.style.transform = 'scale(0)'
  }

  return (
    <div className={styles.input_panel}>
      <form className={styles.sendMessForm} onSubmit={sendMessage}>
        <input
          ref={textInput}
          type="text"
          className={styles.messageText}
          maxLength="512"
          placeholder="Введите сообщеине"
        />
        <div
          style={{
            margin: '5px',
            flex: '0.3',
            maxHeight: '100%',
          }}
        >
          <div ref={attachmentTypeDiv} className={styles.attachmentType}>
            <div>Файл</div>
            <div onClick={GeolocationHandler}>Моя геолокация</div>
            <div>Аудиосообщене</div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: CLIP }}
            style={{
              height: '100%',
            }}
            onClick={(e) => {
              attachmentTypeDiv.current.style.transform =
                attachmentTypeDiv.current.style.transform !== 'scale(1)' ? 'scale(1)' : 'scale(0)'
            }}
          />
        </div>

        <label
          style={{
            flex: '0.3',
            display: 'flex',
            maxHeight: '100%',
          }}
        >
          <input style={{ display: 'none' }} type="submit" value="" />

          <div dangerouslySetInnerHTML={{ __html: PAPER_AIRPLANE }} style={{ flex: '1', margin: '5px' }} />
        </label>
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
