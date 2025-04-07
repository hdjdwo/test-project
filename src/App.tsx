import React from 'react';
import './App.css';
import CardList from './components/CardList';

function App() {
  const windowInnerWidth = window.innerWidth;
  const windowInnerHeight = window.innerHeight;

  return (
    <div className="App" style={{ height: windowInnerHeight, width: windowInnerWidth }}>
      <div>
        <CardList />
      </div>
    </div>
  );
}

export default App;
