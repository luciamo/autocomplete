import React from 'react';
import Autocomplete from './autocomplete';
import './App.css';
import countries from './countries';

function App() {
  return (
    <div className="App">
      <Autocomplete options={countries}/>
    </div>
  );
}

export default App;
