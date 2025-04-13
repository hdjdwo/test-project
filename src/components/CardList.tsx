import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { useGetCharacterQuery } from '../store/api';
import { data, useNavigate } from 'react-router-dom';
import Card from './Card';
import List, { ICharacter, ICharacterProps } from './types/types';
import style from './CardList.module.css';
import { useAppDispatch, useAppSelector } from '../hooks';
import cardSlice, { deleteCard, addCharacters } from '../store/CardSlice';
import { useSelector } from 'react-redux';

const CardList = () => {
  const { data, error, isLoading } = useGetCharacterQuery();
  const characterList = useAppSelector(state => state.cardSlice.characters);
  const storage = localStorage.getItem('delete') ?? '';
  const [filter, setFilter] = useState<ICharacterProps[]>(data ? data.results : []);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.results) {
      dispatch(addCharacters(data ? data.results : []));
      setFilter(JSON.parse(storage));
      console.log('1');
    }
  }, [isLoading]);
  const resetToInitial = () => {
    if (data?.results) setFilter(data?.results);
  };

  const filterHandler = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    if (data?.results) {
      e.stopPropagation();
      dispatch(deleteCard(id));
      setFilter(filter.map(item => (item.id === id ? { ...item, isDelete: true } : item)));
      localStorage.setItem('delete', JSON.stringify(filter));
      console.log(filter);
    }
  };

  const likeHandler = (e: React.MouseEvent<SVGSVGElement>, id: number) => {
    e.stopPropagation();
  };
  return (
    <div>
      <button onClick={resetToInitial} className={style.btn}>
        Сбросить к исходному состоянию(вернуть удаленные файлы!)
      </button>
      <div className={style.container}>
        {filter && (
          <List
            item={filter.filter(item => !item.isDelete)}
            renderItem={(character: ICharacterProps) => (
              <Card
                deleteCard={(e, id) => filterHandler(e, id)}
                likeCard={(e, id) => likeHandler(e, id)}
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
