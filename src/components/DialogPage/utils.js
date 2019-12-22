import React, { useState } from 'react'
import { ReactMic } from 'react-mic'
import ReactAudioPlayer from 'react-audio-player'
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

export async function sendFile(file, appState, setAppState) {
  generateFileMeassage(appState, setAppState, file)

  const formData = new FormData()
  formData.append('image', file)
  try {
    /* const response = await fetch('https://tt-front.now.sh/upload', {
      method: 'POST',
      body: formData,
    });
     */
    // const result = await response.json();
  } catch (error) {
    // eslint-disable-next-line
    console.error('Ошибка:', error)
  }
}

function generateFileMeassage(appState, setAppState, file) {
  let contentType
  if (file.type !== undefined && file.type.includes('image')) contentType = 'image'
  else contentType = 'file'
  const link = URL.createObjectURL(file)
  const newMess = new Message(appState.openedChat.chatId, WHOAMI.userId, '', contentType, link, file.name)
  setAppState({
    ...appState,
    ...Object.assign(appState.openedChat, { messages: [...appState.openedChat.messages, newMess] }),
  })
}

export function AudioMessageSender({ appState, setAppState }) {
  const [stateReqord, setStateReqord] = useState({ record: false })

  const startRecording = () => {
    setStateReqord({
      record: true,
    })
  }

  const stopRecording = () => {
    setStateReqord({
      record: false,
    })
  }

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob)
  }

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob)
    setStateReqord({ url: recordedBlob.blobURL })
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: '0px',
        top: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <ReactMic
          record={stateReqord.record}
          className="frequencyBars"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          width={window.screen.width}
        />
        <button onClick={startRecording} type="button">
          Start
        </button>
        <button onClick={stopRecording} type="button">
          Stop
        </button>
      </div>
      <ReactAudioPlayer src={stateReqord.url} autoPlay controls />
    </div>
  )
}
