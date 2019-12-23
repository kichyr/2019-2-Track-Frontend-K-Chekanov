import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TownList from './components/ListPage/TownList';


const App = (props) => {
  useEffect(() => {
    if (!Array.isArray(JSON.parse(localStorage.getItem('DialogList')))) localStorage.clear()
  }, [])

  window.publicUrl = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : ''

  return (
    <Router>
        <Route exac path={`/`}>
          {(props) => {
            return <TownList/>
          }}
        </Route>
    </Router>
  );
}

export default App;
