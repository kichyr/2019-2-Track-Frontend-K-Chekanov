import React from 'react';
import logo from './logo.svg';
import './App.css';
import Translater from './Translater';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>TT Translater</h1>
      <Translater />
    </div>
  );
}

export default App;
