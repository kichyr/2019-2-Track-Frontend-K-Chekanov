import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ReactAudioPlayer from 'react-audio-player'
import PropTypes from 'prop-types'
import { usePosition } from 'use-position'
import singleMessStyles from './singleMessage.module.css'
import WHOAMI from '../whoami'
import topLineStyles from './topLine.module.css'
import styles from './styles.module.css'
import BackArrow from '../BackArrow/BackArrow'
import { PAPER_AIRPLANE, CLIP, FILE_ICON } from './svgVariables'
import { openAudioMessagePage } from '../../actions/sendMessage'
import { AudioMessageSender, sendFile, Message } from './utils'

/* function getChatMessages(chatId) {
	const messages = localStorage.getItem('messages');
	return [ messages[chatId].topic, messages[chatId].messages ];
} */

function postMessage(message) {
  const data = JSON.parse(localStorage.getItem('messages'))
  data[message.chatId].push(message)
  localStorage.setItem('messages', JSON.stringify(data))
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
        onKeyDown={(e) => {}}
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
  const [dragging, setDragging] = useState(false)
  const mContainer = React.createRef()
  const history = useHistory()
  // eslint-disable-next-line
  useEffect(() => {
    // Обновляем заголовок документа с помощью API браузера
    // eslint-disable-next-line
    mContainer.current.scrollTop = mContainer.current.scrollHeight
    // eslint-disable-next-line
  }, [messages])

  // DRAGDandDROP
  const handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
  }

  const handleDragOut = (e) => {
    e.persist()
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
  }

  const handleDrop = (e) => {
    setDragging(false)
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.items[0].kind !== 'file') return
    const file = e.dataTransfer.items[0].getAsFile()
    sendFile(file, appState, setAppState)
  }
  // END DRAGDandDROP
  return (
    <div className={styles.result} style={{ scrollTop: 'scrollHeight' }} ref={mContainer} onDragEnter={handleDragIn}>
      <DragAndDropImg dragging={dragging} handleDragOut={handleDragOut} handleDrop={handleDrop} />
      <AudioMessageSender appState={appState} setAppState={setAppState} />

      {messages.map((message, index) => (
        <div
          key={index.toString()}
          className={singleMessStyles.singleMessContainer}
          onDrop={(e) => {
            e.preventDefault()
          }}
        >
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
                switch (message.contentType) {
                  case 'link':
                    return <a href={message.messageText}> {message.messageText} </a>
                  case 'image':
                    return <img alt="" src={message.link} style={{ maxWidth: '100%' }} />
                  case 'file':
                    return (
                      <div style={{ display: 'inline' }}>
                        <a
                          aria-label="location"
                          // eslint-disable-next-line
                          dangerouslySetInnerHTML={{ __html: FILE_ICON }}
                          href={message.link}
                          style={{
                            height: '50%',
                          }}
                        />
                        <p>{message.fileName}</p>
                      </div>
                    )
                  case 'audioMessage':
                    return (
                      <div>
                        <ReactAudioPlayer src={message.link} autoPlay controls />
                      </div>
                    )
                  default:
                    return <div> {message.messageText} </div>
                }
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
  const dispatch = useDispatch()

  const sendMessage = (e) => {
    e.preventDefault()
    const messText = e.target[0].value
    if (messText.replace(/\s/gi, '') === '') {
      return
    }
    const newMess = new Message(appState.openedChat.chatId, WHOAMI.userId, messText, 'text')
    postMessage(newMess)
    setAppState({
      ...appState,
      ...Object.assign(appState.openedChat, { messages: [...appState.openedChat.messages, newMess] }),
    })
    e.target[0].value = ''
  }

  const textInput = React.createRef()
  const attachmentTypeDiv = React.createRef()
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
            <label id="input">
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  attachmentTypeDiv.current.style.transform = 'scale(0)'
                  sendFile(e.target.files[0], appState, setAppState)
                }}
                onKeyDown={(e) => {}}
                style={{ display: 'none' }}
              />
              <div>Файл</div>
            </label>
            <div role="button" onClick={GeolocationHandler} onKeyDown={(e) => {}}>
              Моя геолокации
            </div>
            <div
              onClick={(e) => {
                dispatch(openAudioMessagePage())
                attachmentTypeDiv.current.style.transform = 'scale(0)'
              }}
            >
              {' '}
              Аудиосообщение{' '}
            </div>
          </div>
          <div
            aria-label="send message"
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{ __html: CLIP }}
            style={{
              height: '100%',
            }}
            role="button"
            tabIndex={-1}
            onKeyDown={() => {}}
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

function DragAndDropImg({ dragging, handleDragOut, handleDrop }) {
  return (
    dragging && (
      <div
        onDragLeave={handleDragOut}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onDragEnter={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        style={{
          border: 'dashed grey 4px',
          backgroundColor: 'rgba(255,255,255,.8)',
          position: 'absolute',
          top: '10vh',
          bottom: '10vh',
          left: 0,
          right: 0,
          zIndex: 9999,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: 0,
            left: 0,
            textAlign: 'center',
            color: 'grey',
            fontSize: 36,
          }}
        >
          <div>drop here :)</div>
        </div>
      </div>
    )
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
