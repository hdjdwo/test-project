import React, { FC } from 'react';
import { ICharacter } from './types/types';
import { useNavigate, useParams, data } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../store/api';

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
    <div>
      <div>
        <h2>{character?.name}</h2>
        <div>
          <p>
            Персонаж <strong>{character?.name}</strong> принадлежит к <span>{character?.species}</span>. В данный момент{' '}
            {character?.name} имеет статус <span>{character?.status}</span>
          </p>
        </div>
        <div>
          <img src={character?.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CardPage;
