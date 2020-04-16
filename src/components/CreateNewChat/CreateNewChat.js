import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as plusButtonStyles from './plusButtonStyles.module.css'
import * as CNDialogFormStyles from './createNewChatForm.module.css'
import { addNewChatToChatList } from '../../actions/sendMessage'

// create new Chat in local storage and return created chat
function createNewChat(Topic) {
  let data
  if (localStorage.getItem('DialogList') == null) {
    localStorage.setItem('DialogList', '[]')
    data = []
  } else {
    data = JSON.parse(localStorage.getItem('DialogList'))
  }
  const chatId = data.length
  data.push({ chat_id: chatId, topic: Topic, lastmessage: '' })
  localStorage.setItem('DialogList', JSON.stringify(data))
  let mdata
  if (localStorage.getItem('messages') == null) {
    localStorage.setItem('messages', '{}')
    mdata = {}
  } else {
    mdata = JSON.parse(localStorage.getItem('messages'))
  }
  mdata[chatId] = []
  localStorage.setItem('messages', JSON.stringify(mdata))
  return data[data.length - 1]
}

export function PlusButton({ setHiding }) {
  return (
    <div
      role="button"
      id="isActiveForSetHiding"
      tabIndex={0}
      name="plus_butt"
      className={plusButtonStyles.plusbut}
      onClick={setHiding}
    >
      <div className={plusButtonStyles.horizontal_plus} id="isActiveForSetHiding" />
      <div className={plusButtonStyles.vertical_plus} id="isActiveForSetHiding" />
    </div>
  )
}

function CreateNewDialogForm({ isHide, setHiding }) {
  const dispatch = useDispatch()
  let topicForm = null
  // creating new chat when click on button
  const createChatButt = (e) => {
    e.preventDefault()
    dispatch(addNewChatToChatList(createNewChat(topicForm.value)))
    setHiding(e)
  }

  return (
    <div
      className={CNDialogFormStyles.modal}
      id="isActiveForSetHiding"
      style={isHide ? { display: 'block' } : { display: 'none' }}
      role="button"
      tabIndex={0}
      onClick={setHiding}
    >
      <div className={CNDialogFormStyles.modal_content}>
        <span
          className={CNDialogFormStyles.close}
          id="isActiveForSetHiding"
          role="button"
          tabIndex={0}
          onClick={setHiding}
        >
          &times;
        </span>
        <h2>Create new chat</h2>
        <br />
        <input
          className={CNDialogFormStyles.topic}
          ref={(input) => {
            topicForm = input
          }}
          id="topic_form"
          type="text"
          name="topic"
          placeholder="Chat Topic"
        />
        <button onClick={createChatButt}>
          <span name="create_chat_button" id="isActiveForSetHiding">
            Create new chat
          </span>
        </button>
      </div>
    </div>
  )
}

function CreateChatStuff() {
  const [hidden, setHiding] = useState(false)
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(e.target)
    if (e.target.id === 'isActiveForSetHiding') hidden ? setHiding(false) : setHiding(true)
  }
  return (
    <>
      <PlusButton setHiding={handleClick} />
      <CreateNewDialogForm isHide={hidden} setHiding={handleClick} />
    </>
  )
}

export default CreateChatStuff
