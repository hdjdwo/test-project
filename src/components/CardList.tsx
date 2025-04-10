import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { useGetCharacterQuery } from '../store/api';
import { data, useNavigate } from 'react-router-dom';
import Card from './Card';
import List, { ICharacter } from './types/types';
import style from './CardList.module.css';
import { useAppDispatch, useAppSelector } from '../hooks';
import cardSlice, { deleteCard } from '../store/CardSlice';

const CardList = () => {
  const { data, error, isLoading } = useGetCharacterQuery();
  const characters = data?.results;
  const [filterCharacters, setFilterCharacters] = useState<ICharacter[]>(characters ? characters : []);

  const dispatch = useAppDispatch();
  const deleteId = useAppSelector(state => state.cardSlice.deletedId);

  const navigate = useNavigate();

  useEffect(() => {
    if (characters) {
      setFilterCharacters(characters.filter(character => !deleteId.includes(character.id)));
    }
  }, [characters, deleteId]);

  const filterHandler = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    dispatch(deleteCard(id));
  };

  return (
    <div className={style.container}>
      {filterCharacters && (
        <List
          item={filterCharacters}
          renderItem={(character: ICharacter) => (
            <Card
              deleteCard={(e, id) => filterHandler(e, id)}
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
