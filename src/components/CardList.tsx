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
  const storageValue = localStorage.getItem('deleted') ?? ' ';
  const characters = data?.results;
  const [filterCharacters, setFilterCharacters] = useState<ICharacter[]>(
    JSON.parse(storageValue) ? JSON.parse(storageValue) : characters,
  );

  const dispatch = useAppDispatch();
  const deleteId = useAppSelector(state => state.cardSlice.deletedId);

  console.log(characters);

  const navigate = useNavigate();
  useEffect(() => {
    if (characters) {
      localStorage.setItem('deleted', JSON.stringify(filterCharacters));
      setFilterCharacters(JSON.parse(storageValue).filter((character: ICharacter) => !deleteId.includes(character.id)));
    }
  }, [characters, deleteId, storageValue]);

  const resetToInitial = () => {
    setFilterCharacters(characters ? characters : []);
    localStorage.setItem('deleted', JSON.stringify(characters));
  };

  const filterHandler = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    dispatch(deleteCard(id));
  };

  return (
    <div>
      <button onClick={resetToInitial} className={style.btn}>
        Сбросить к исходному состоянию(вернуть удаленные файлы!)
      </button>
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
    </div>
  );
};

export default CardList;
