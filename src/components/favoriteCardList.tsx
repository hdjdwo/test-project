import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import List, { ICharacter } from './types/types';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { useGetCharacterQuery } from '../store/api';
import { deleteCard, toggleToFavorite } from '../store/CardSlice';
import style from './CardList.module.css';

const FavoriteCardList = () => {
  const { data, error, isLoading } = useGetCharacterQuery();
  const characters = data?.results;
  const [filterCharacters, setFilterCharacters] = useState<ICharacter[]>(characters ? characters : []);
  const [favoriteCharacters, setFavoriteCharacters] = useState<ICharacter[]>([]);
  const deleteId = useAppSelector(state => state.cardSlice.deletedId);

  const favoriteId = useAppSelector(state => state.cardSlice.favoriteId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (characters) {
      setFavoriteCharacters(
        characters.filter(character => !deleteId.includes(character.id) && favoriteId.includes(character.id)),
      );
    }
  }, [characters, deleteId, favoriteId]);

  const favoriteHandler = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    dispatch(toggleToFavorite(id));
  };

  return (
    <div className={style.container}>
      {favoriteCharacters && (
        <List
          item={favoriteCharacters}
          renderItem={(character: ICharacter) => (
            <Card
              deleteCard={(e, id) => favoriteHandler(e, id)}
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
