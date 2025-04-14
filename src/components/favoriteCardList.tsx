import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import List, { ICharacter, ICharacterProps } from './types/types';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { useGetCharacterQuery } from '../store/api';
import style from './CardList.module.css';

const FavoriteCardList = () => {
  const { data, error, isLoading, isSuccess } = useGetCharacterQuery();
  const storage = localStorage.getItem('filter') ?? '';
  const [filter, setFilter] = useState<ICharacterProps[]>(data ? data.results : []);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data?.results) {
      setFilter(data.results);
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    const savedData = localStorage.getItem('characters');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFilter(parsedData);
    }
  }, [dispatch]);

  if (isLoading) {
    return <div>Идет загрузка</div>; // Показываем индикатор загрузки
  }

  if (error) {
    return <div>Произошла ошибка при загрузке данных</div>;
  }

  const filterHandler = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    if (data?.results) {
      e.stopPropagation();
      setFilter(filter.map(item => (item.id === id ? { ...item, isDelete: true } : item)));
      localStorage.setItem(
        'filter',
        JSON.stringify(filter.map(item => (item.id === id ? { ...item, isDelete: true } : item))),
      );
    }
  };
  const likeHandler = (e: React.MouseEvent<SVGSVGElement>, id: number) => {
    if (data?.results) {
      e.stopPropagation();
      setFilter(filter.map(item => (item.id === id ? { ...item, favorite: !item.favorite } : item)));
      localStorage.setItem(
        'filter',
        JSON.stringify(filter.map(item => (item.id === id ? { ...item, favorite: !item.favorite } : item))),
      );
      console.log(filter);
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
