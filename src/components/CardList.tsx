import React from 'react';
import { useGetCharacterQuery } from '../store/api';
import { data } from 'react-router-dom';
import Card from './Card';
import List, { ICharacter } from './types/types';

const CardList = () => {
  const { data, error, isLoading } = useGetCharacterQuery();
  const characters = data?.results;

  console.log(data);
  return (
    <div>
      {characters && <List item={characters} renderItem={(character: ICharacter) => <Card character={character} />} />}
    </div>
  );
};

export default CardList;
