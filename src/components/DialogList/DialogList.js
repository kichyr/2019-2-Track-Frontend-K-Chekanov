import React, { useState, useEffect } from 'react'
import TopLineDialogList from '../TopLineDialogList/TopLineDialogList'
import styles from './DialogList.module.css'
import CreateNewChat from '../CreateNewChat/CreateNewChat'
import { useHistory } from 'react-router-dom'
import { HOST } from '../whoami'

const getDialogsList = async (setChats) => {
  try {
    const response = await fetch(HOST + 'users/contacts_list', {
      crossDomain: true,
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
    })
    if (response.status === 200) {
      const myJson = await response.json() //extract JSON from the http response
      const data = JSON.parse(myJson)
      setChats(data)
    } else {
      console.log('not a 200')
    }
  } catch (err) {
    // catches errors both in fetch and response.json
    console.log(err)
  } finally {
    // do it again in 2 seconds
    setTimeout(() => {
      getDialogsList(setChats)
    }, 5000)
  }
}

async function getChat(chatIdParameter, setAppState) {
  try {
    const response = await fetch(HOST + 'chats/get_chat/' + chatIdParameter, {
      crossDomain: true,
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
    })
    if (response.status === 200) {
      const myJson = await response.json() //extract JSON from the http response
      const data = JSON.parse(myJson)
      setAppState({
        appPage: 'Chat',
        openedChat: {
          chatId: data.chat_id,
          topic: data.topic,
          messages: data.messages.reverse(),
        },
        prevAppPage: 'ChatList',
      })
    } else {
      console.log('not a 200')
    }
  } catch (err) {
    // catches errors both in fetch and response.json
    console.log(err)
  }
}

const GenerateList = (chats, appState, setAppState) => {
  let history = useHistory()
  return chats.map((chat, index) => (
    <div className={styles.chatwrap} key={index.toString()}>
      <div
        onClick={(e) => {
          history.push(`${window.publicUrl}/chat`)
          setAppState({ ...appState, openedChat: { ...appState.openedChat, chatId: chat.chat_id } })
          openChat(chat.chat_id, setAppState)
        }}
        role="button"
        tabIndex={0}
        className={styles.wrap}
        id={chat.chat_id}
      >
        <img className={styles.chatImg} src="http://emilcarlsson.se/assets/rachelzane.png" alt="" />
        <div className={styles.meta}>
          <div className={styles.topic}>{`${chat.chat__topic}`} </div>
          <div className={styles.preview}>{chat.chat__last_message} </div>
        </div>
        <div className={styles.addinfo}>
          <span className={styles.dot} />
          <p>21:23</p>
        </div>
      </div>
    </div>
  ))
}

function DialogListImpl({ chats, appState, setAppState }) {
  return (
    <div className={styles.dialogsListContainer}>{chats !== null && GenerateList(chats, appState, setAppState)}</div>
  )
}

function openChat(chatId, setAppState) {
  getChat(chatId, setAppState)
}

function DialogList({ appState, setAppState }) {
  const [chats, setChats] = useState([])
  const loadExistingChats = () => {
    getDialogsList(setChats)
  }
  useEffect(loadExistingChats, [])

  return (
    <div className={styles.dialog_list_wrap}>
      <TopLineDialogList />
      <DialogListImpl chats={chats} setChats={setChats} appState={appState} setAppState={setAppState} />
      <CreateNewChat setChats={setChats} chats={chats} />
    </div>
  )
}

export default DialogList
