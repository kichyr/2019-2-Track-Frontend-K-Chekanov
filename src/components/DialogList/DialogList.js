import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import TopLineDialogList from '../TopLineDialogList/TopLineDialogList'
import styles from './DialogList.module.css'
import CreateNewChat from '../CreateNewChat/CreateNewChat'
import { openNewChat } from '../../actions/sendMessage'

function getDialogsList() {
  const data = JSON.parse(localStorage.getItem('DialogList'))
  return data == null ? [] : data
}

export function getChat(chatIdParameter) {
  const messages = JSON.parse(localStorage.getItem('messages'))
  const chatInfo = JSON.parse(localStorage.getItem('DialogList'))[chatIdParameter]
  return { chatId: chatIdParameter, topic: chatInfo.topic, messages: messages[chatIdParameter] }
}

const GenerateList = (chats) => {
  const history = useHistory()
  const dispatch = useDispatch()
  return chats.map((chat, index) => (
    <div className={styles.chatwrap} key={index.toString()}>
      <div
        onClick={(e) => {
          history.push(`${window.publicUrl}/chat`)
          openChat(chat.chat_id, dispatch)
        }}
        role="button"
        tabIndex={0}
        className={styles.wrap}
        id={chat.chat_id}
      >
        <img className={styles.chatImg} src="http://emilcarlsson.se/assets/rachelzane.png" alt="" />
        <div className={styles.meta}>
          <div className={styles.topic}>{`${chat.topic}`} </div>
          <div className={styles.preview}>{chat.lastmessage} </div>
        </div>
        <div className={styles.addinfo}>
          <span className={styles.dot} />
          <p>21:22</p>
        </div>
      </div>
    </div>
  ))
}

function DialogListImpl() {
  const chats = useSelector((state) => state.chatList)
  return <div className={styles.dialogsListContainer}>{chats !== null && GenerateList(chats)}</div>
}

function openChat(chatId, dispatch) {
  dispatch(openNewChat(getChat(chatId)))
}

function DialogList({ appState, setAppState }) {
  const [chats, setChats] = useState([])
  const loadExistingChats = () => {
    setChats(getDialogsList())
  }
  useEffect(loadExistingChats, [])

  return (
    <div className={styles.dialog_list_wrap}>
      <TopLineDialogList />
      <DialogListImpl chats={chats} setChats={setChats} setAppState={setAppState} />
      <CreateNewChat />
    </div>
  )
}

export default DialogList
