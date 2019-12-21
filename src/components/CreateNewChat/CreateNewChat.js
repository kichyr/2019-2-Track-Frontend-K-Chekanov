import React, { useState, useEffect } from 'react'
import * as plusButtonStyles from './plusButtonStyles.module.css'
import * as CNDialogFormStyles from './createNewChatForm.module.css'
import UserAppender from './UserAppender'
import { HOST } from '../whoami'

// create new Chat in local storage and return created chat
function createNewChat(Topic, selectedUsers) {
  const data = { topic: Topic, users_ids: selectedUsers.map((user, index) => user.id) }
  // Значения по умолчанию обозначены знаком *
  return fetch(HOST + 'chats/create_chat', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
  }).then((response) => response.json()) // парсит JSON ответ в Javascript объект
}

function PlusButton({ setHiding }) {
  return (
    <div
      role="button"
      id={'isActiveForSetHiding'}
      tabIndex={0}
      className={plusButtonStyles.plusbut}
      onClick={setHiding}
    >
      <div className={plusButtonStyles.horizontal_plus} id={'isActiveForSetHiding'} />
      <div className={plusButtonStyles.vertical_plus} id={'isActiveForSetHiding'} />
    </div>
  )
}

function CreateNewDialogForm({ isHide, setHiding, setChats, chats }) {
  const [selectedUsers, setSelectedUsers] = useState([])

  let topicForm = null
  const createChatButt = (e) => {
    e.preventDefault()
    setChats(
      (() => {
        const newChat = createNewChat(topicForm.value, selectedUsers)
        const newChats = [...chats, newChat]
        return newChats
      })(),
    )
    setHiding(e)
  }

  useEffect(() => {
    setSelectedUsers([])
  }, [isHide])

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
          type="text"
          name="topic"
          placeholder="Chat Topic"
        />

        <UserAppender selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />

        <div
          style={{
            width: '80%',
          }}
        >
          {selectedUsers.map((user, index) => (
            <div key={index.toString()}>
              <p>{`${user.first_name} ${user.last_name}`}</p>
            </div>
          ))}
        </div>
        <button onClick={createChatButt}>
          <span id="isActiveForSetHiding">Create new chat</span>
        </button>
      </div>
    </div>
  )
}

function CreateChatStuff({ setChats, chats }) {
  const [hidden, setHiding] = useState(false)
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.target.id === 'isActiveForSetHiding') hidden ? setHiding(false) : setHiding(true)
  }

  return (
    <React.Fragment>
      <PlusButton setHiding={handleClick} />
      <CreateNewDialogForm isHide={hidden} setHiding={handleClick} setChats={setChats} chats={chats} />
    </React.Fragment>
  )
}

export default CreateChatStuff
