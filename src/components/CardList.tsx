import React from 'react';
import { useGetCharacterQuery } from '../store/api';
import { data } from 'react-router-dom';
import List from './types/types';
import Card from './Card';

const CardList = () => {
  const { data: characters } = useGetCharacterQuery();
  return (
    <div>
      {characters?.results.map(character => (
        <List item={characters} renderItem={(item = { character }) => <Card />} />
      ))}
    </div>
  );
};

export default CardList;
