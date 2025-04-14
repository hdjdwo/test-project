import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import List, { ICharacter, ICharacterProps } from './types/types';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { useGetCharacterQuery } from '../store/api';
import style from './CardList.module.css';

const FavoriteCardList = () => {
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
    <div className={style.container}>
      {filter && (
        <List
          item={filter.filter(item => !item.isDelete && item.favorite)}
          renderItem={(character: ICharacter) => (
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
  );
};

export default FavoriteCardList;
