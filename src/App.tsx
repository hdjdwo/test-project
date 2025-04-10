import React from 'react';
import './App.css';
import CardList from './components/CardList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardPage from './components/CardPage';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink style={{ fontSize: '3rem', marginLeft: '20rem', color: '#13678A' }} to="/cards">
          Cards
        </NavLink>
      </nav>
      <Routes>
        <Route path="/cards" element={<CardList />} />
        <Route path="/cards/:id" element={<CardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
