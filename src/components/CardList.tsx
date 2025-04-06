import React from 'react';
import { useGetCharacterQuery } from '../store/api';
import { data } from 'react-router-dom';

const CardList = () => {
  const { data: character = [], error, isLoading } = useGetCharacterQuery();

  return <div>{character.map(item => item.name)}</div>;
};

export default CardList;
