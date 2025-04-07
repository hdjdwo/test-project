import React from 'react';
import { useGetCharacterQuery } from '../store/api';
import { data } from 'react-router-dom';
import Card from './Card';
import { IResults } from './types/types';

const CardList = () => {
  const { data: characters } = useGetCharacterQuery();

  console.log(characters?.results);
  return (
    <div>
      {characters?.results.map((character: IResults) => (
        <Card character={character} />
      ))}
    </div>
  );
};

export default CardList;
