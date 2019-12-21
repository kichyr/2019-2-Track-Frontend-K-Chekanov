import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import DialogList from './components/DialogList/DialogList'
import MessageForm from './components/DialogPage/MessageForm'
import ProfilePage from './components/ProfilePage/ProfilePage'
import './styles/globalStyles.css'
import { WHOAMI, HOST } from './components/whoami'

async function determineWhoAmI() {
  try {
    const response = await fetch(HOST + 'users/whoami', {
      crossDomain: true,
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
    })
    if (response.status === 200) {
      const myJson = await response.json() //extract JSON from the http response
      const data = JSON.parse(myJson)
      WHOAMI.userId = data.user_id
    } else {
      console.log('not a 200')
    }
  } catch (err) {
    // catches errors both in fetch and response.json
    console.log(err)
  }
}

const App = (props) => {
  const [appState, setAppState] = useState({
    appPage: '', // Chat, ProfilePage
    prevAppPage: 'ChatList',
    openedChat: {
      chatId: -1,
      topic: '',
      messages: [],
    },
  })
  useEffect(() => {
    if (!Array.isArray(JSON.parse(localStorage.getItem('DialogList')))) localStorage.clear()
    determineWhoAmI()
  }, [])

  window.publicUrl = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : ''
  // FIX
  if (window.publicUrl === '/static') window.publicUrl = ''
  //
  return (
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path={`${window.publicUrl}/chat/`}>
          {(props) => {
            if (appState.appPage !== 'Chat') setAppState({ ...appState, appPage: 'Chat' })
            return <MessageForm appState={appState} setAppState={setAppState} />
          }}
        </Route>
        <Route path={`${window.publicUrl}/`}>
          {(props) => {
            if (appState.appPage !== 'ChatList')
              setAppState({ ...appState, appPage: 'ChatList', prevAppPage: appState.appPage })
            return <DialogList appState={appState} setAppState={setAppState} />
          }}
        </Route>
        <Route path={`${window.publicUrl}/profile/`}>
          {(props) => {
            if (appState.appPage !== 'ProfilePage')
              setAppState({ ...appState, appPage: 'ProfilePage', prevAppPage: appState.appPage })
            return <ProfilePage appState={appState} setAppState={setAppState} />
          }}
        </Route>
      </AnimatedSwitch>
    </Router>
  )
}

export default App
