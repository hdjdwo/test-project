import React from 'react';
import './App.css';
import CardList from './components/CardList';

function App() {
  const windowInnerWidth = window.innerWidth;
  const windowInnerHeight = window.innerHeight;

  return (
    <div className="App" style={{ height: windowInnerHeight, width: windowInnerWidth }}>
      <div>
        Helloasd
        <h2>asdsad</h2>
        <CardList />
      </div>
    </div>
  );
}

export default App;
