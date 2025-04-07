import React, { FC } from 'react';
import { ICharacter } from './types/types';

interface CardProps {
  character: ICharacter;
}

const Card: FC<CardProps> = ({ character }) => {
  return (
    <div>
      <h2>{character.name}</h2>
      <img src={character.image} alt="" />
    </div>
  );
};

export default Card;
