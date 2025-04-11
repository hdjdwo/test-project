import React from 'react';
import './App.css';
import CardList from './components/CardList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardPage from './components/CardPage';
import { NavLink } from 'react-router-dom';
import FavoriteCardList from './components/FavoriteCardList';

function App() {
  return (
    <BrowserRouter basename="/test-project">
      <nav>
        <NavLink style={{ fontSize: '3rem', marginLeft: '20rem', color: '#13678A' }} to="/cards">
          Cards
        </NavLink>
        <NavLink style={{ fontSize: '3rem', marginLeft: '20rem', color: '#13678A' }} to="/favorite">
          Favorite
        </NavLink>
      </nav>
      <Routes>
        <Route path="/cards" element={<CardList />} />
        <Route path="/cards/:id" element={<CardPage />} />
        <Route path="/favorite" element={<FavoriteCardList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
