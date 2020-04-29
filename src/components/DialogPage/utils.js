import React, { useState } from 'react'
import { ReactMic } from 'react-mic'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import WHOAMI from '../whoami'
import { openAudioMessagePage } from '../../actions/sendMessage'

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
    await fetch('https://tt-front.now.sh/upload', {
      method: 'POST',
      body: formData,
    })
  } catch (error) {
    // eslint-disable-next-line
    console.error('Ошибка:', error)
  }
}

export function generateFileMeassage(chatId, file) {
  let contentType
  if (file.type !== undefined && file.type.includes('image')) contentType = 'image'
  else contentType = 'file'
  const link = URL.createObjectURL(file)
  const newMess = new Message(chatId, WHOAMI.userId, '', contentType, link, file.name)
  return newMess
}

const CloseButt = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  opacity: 0.3;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    content: ' ';
    height: 30%;
    width: 3px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`

const StartStopButt = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  opacity: 0.3;
  display: flex;
  justify-content: center;
  align-items: center;
  text-color: #333;
  font-size: 7vh;

  &:hover {
    opacity: 1;
  }
`

export function AudioMessageSender({ appState, setAppState }) {
  const [stateReqord, setStateReqord] = useState({ record: false })
  const isOpened = useSelector((state) => state.isMessagePageOpen)
  const dispatch = useDispatch()

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

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob)
    const newMess = new Message(appState.openedChat.chatId, WHOAMI.userId, '', 'audioMessage', recordedBlob.blobURL)
    // postMessage(newMess);
    dispatch(openAudioMessagePage())
    setAppState({
      ...appState,
      ...Object.assign(appState.openedChat, { messages: [...appState.openedChat.messages, newMess] }),
    })
    sendAudioMessage(recordedBlob)
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: '0px',
        top: '0px',
        display: isOpened ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
      }}
    >
      <div
        style={{
          width: '80%',
          height: '60%',
          backgroundColor: '#fefefe',
          borderRadius: '25px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ flex: '1' }}>
          <ReactMic
            record={stateReqord.record}
            className="frequencyBars"
            onStop={onStop}
            strokeColor="blue"
            width={window.screen.width * 0.8}
            height={window.screen.height * 0.3}
          />
        </div>

        <div
          style={{
            flex: '1',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <CloseButt
            onClick={() => {
              stopRecording()
              dispatch(openAudioMessagePage())
            }}
          />
          <StartStopButt
            onClick={(e) => {
              e.preventDefault()
              stateReqord.record ? stopRecording(e) : startRecording(e)
            }}
          >
            {stateReqord.record ? 'Send' : 'Start'}{' '}
          </StartStopButt>
          {/* <button onClick={startRecording} type="button">Start</button>
          <button onClick={stopRecording} type="button">Stop</button> */}
        </div>
        {/* <ReactAudioPlayer
          src={stateReqord.url}
          autoPlay
          controls
        /> */}
      </div>
    </div>
  )
}

async function sendAudioMessage(audioBlob) {
  const formData = new FormData()
  formData.append('audio', audioBlob)
  try {
    await fetch('https://tt-front.now.sh/upload', {
      method: 'POST',
      body: formData,
    })
  } catch (error) {
    // eslint-disable-next-line
    console.error('Ошибка:', error)
  }
}
