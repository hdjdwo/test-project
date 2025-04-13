import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import List, { ICharacter } from './types/types';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { useGetCharacterQuery } from '../store/api';
import { deleteCard } from '../store/CardSlice';
import style from './CardList.module.css';

const FavoriteCardList = () => {
  const { data, error, isLoading } = useGetCharacterQuery();
  const characters = data?.results;

  const storageValueFavorite = localStorage.getItem('favorite') ?? ' ';
  const [filterCharacters, setFilterCharacters] = useState<ICharacter[]>(characters ? characters : []);
  const [favoriteCharacters, setFavoriteCharacters] = useState<ICharacter[]>(
    JSON.parse(storageValueFavorite) ? JSON.parse(storageValueFavorite) : [],
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const filterHandler = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
  };

  const likeHandler = (e: React.MouseEvent<SVGSVGElement>, id: number) => {
    e.stopPropagation();
  };

  return (
    <div className={style.container}>
      {favoriteCharacters && (
        <List
          item={favoriteCharacters}
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
