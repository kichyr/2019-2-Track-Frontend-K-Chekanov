import React, { useState } from 'react'
import DialogList from './components/DialogList/DialogList'
import MessageForm from './components/DialogPage/MessageForm'
import ProfilePage from './components/ProfilePage/ProfilePage'
import './styles/globalStyles.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'

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

  return (
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path="/chat/">
          {(props) => {
            if (appState.appPage !== 'Chat') setAppState({ ...appState, appPage: 'Chat' })
            return <MessageForm appState={appState} setAppState={setAppState} />
          }}
        </Route>
        <Route exact path="/">
          {(props) => {
            if (appState.appPage !== 'ChatList')
              setAppState({ ...appState, appPage: 'ChatList', prevAppPage: appState.appPage })
            return <DialogList appState={appState} setAppState={setAppState} />
          }}
        </Route>
        <Route path="/profile/">
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
