import React, { FC } from 'react';
import { ICharacter } from './types/types';
import { useNavigate, useParams, data } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../store/api';
import style from './CardPage.module.css';

const CardPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: character,
    error,
    isError,
  } = useGetCharacterByIdQuery(id ?? '', {
    skip: !id,
  });

  return (
    <div className={style.page}>
      <div className={style.btn}>
        <button onClick={() => navigate(-1)} className={style.back}>
          Назад
        </button>
      </div>

      <div>
        <h2 className={style.name}>{character?.name}</h2>

        <img src={character?.image} alt="" />
      </div>
      <div>
        <p>
          <strong>Характеристики:</strong> <br />
          <i>Имя персонажа:</i> {character?.name} <br />
          <i>Pасса: </i> <span>{character?.species}</span> <br /> Статус: {character?.name} имеет статус{' '}
          <span
            className={
              character?.status === 'Dead'
                ? style.dead
                : character?.status === 'Alive'
                ? style.alive
                : character?.status === 'unknown'
                ? style.unknown
                : ''
            }>
            {character?.status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CardPage;
