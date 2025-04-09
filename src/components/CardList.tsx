import React from 'react';
import { useGetCharacterQuery } from '../store/api';
import { data, useNavigate } from 'react-router-dom';
import Card from './Card';
import List, { ICharacter } from './types/types';
import style from './CardList.module.css';
import { useAppDispatch, useAppSelector } from '../hooks';
import cardSlice from '../store/CardSlice';

const CardList = () => {
  const { data, error, isLoading } = useGetCharacterQuery();
  const characters = data?.results;
  const dispatch = useAppDispatch();
  const deleteId = useAppSelector(state => state.cardSlice.deletedId);
  const navigate = useNavigate();

  const filteredCharacters = (e: React.MouseEvent<HTMLButtonElement>) => {
    characters?.filter(characters => !deleteId.includes(characters.id));
    e.stopPropagation();
  };

  return (
    <div className={style.container}>
      {characters && (
        <List
          item={characters}
          renderItem={(character: ICharacter) => (
            <Card
              
              onClick={() => navigate(`/cards/${character.id}`)}
              character={character}
              key={character.id}
            />
          )}
        />
      )}
    </div>
  );
};

export default CardList;
