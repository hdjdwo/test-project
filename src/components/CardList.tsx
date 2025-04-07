import React from 'react';
import { useGetCharacterQuery } from '../store/api';
import { data, useNavigate } from 'react-router-dom';
import Card from './Card';
import List, { ICharacter } from './types/types';
import style from './CardList.module.css';

const CardList = () => {
  const { data, error, isLoading } = useGetCharacterQuery();
  const characters = data?.results;
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      {characters && (
        <List
          item={characters}
          renderItem={(character: ICharacter) => (
            <Card onClick={() => navigate(`/cards/${character.id}`)} character={character} key={character.id} />
          )}
        />
      )}
    </div>
  );
};

export default CardList;
