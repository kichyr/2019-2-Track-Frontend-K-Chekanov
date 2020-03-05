import React, {  useEffect } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import TownList from './components/ListPage/TownList';
import TownInfo from './components/TownInfo/TownInfo';


const App = (props) => {
  useEffect(() => {
    if (!Array.isArray(JSON.parse(localStorage.getItem('DialogList')))) localStorage.clear()
  }, []);

  window.publicUrl = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : '';

  return (
    <Router>
      <Switch>
        <Route path={`/town/:townId`}>
          {(props) => {
            return <TownInfo/>
          }}
        </Route>
        <Route exac path={`/`}>
          {(props) => {
            return <TownList/>
          }}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
