import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { useGetCharacterQuery } from '../store/api';
import { data, useNavigate } from 'react-router-dom';
import Card from './Card';
import List, { ICharacter, ICharacterProps } from './types/types';
import style from './CardList.module.css';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useSelector } from 'react-redux';

const CardList = () => {
  const { data, error, isLoading } = useGetCharacterQuery();
  const [filter, setFilter] = useState<ICharacterProps[]>([]);
  const storage: ICharacterProps[] =
    localStorage.getItem('filter') !== 'undefined' && localStorage.getItem('filter') !== null
      ? JSON.parse(localStorage.getItem('filter') ?? '')
      : data?.results;

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('filter') !== 'undefined' && localStorage.getItem('filter') !== null) {
      setFilter(prev => (prev = storage));
    } else {
      localStorage.setItem('filter', JSON.stringify(data?.results));
      setFilter(prev => (prev = storage));
    }
  }, [isLoading, data]);

  const resetToInitial = () => {
    if (data?.results) {
      setFilter(data?.results);
      localStorage.setItem('filter', JSON.stringify(data.results));
    }
  };
  const filterHandler = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    if (data?.results) {
      e.stopPropagation();
      setFilter(storage.map(item => (item.id === id ? { ...item, isDelete: true } : item)));
      localStorage.setItem(
        'filter',
        JSON.stringify(storage.map(item => (item.id === id ? { ...item, isDelete: true } : item))),
      );
    }
  };

  const likeHandler = (e: React.MouseEvent<SVGSVGElement>, id: number) => {
    if (data?.results) {
      e.stopPropagation();
      setFilter(storage.map(item => (item.id === id ? { ...item, favorite: !item.favorite } : item)));
      localStorage.setItem(
        'filter',
        JSON.stringify(storage.map(item => (item.id === id ? { ...item, favorite: !item.favorite } : item))),
      );
    }
  };
  return (
    <div>
      <button onClick={resetToInitial} className={style.btn}>
        Сбросить к исходному состоянию(Изначальное API)
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
