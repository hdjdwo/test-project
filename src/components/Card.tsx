import React, { FC } from 'react';
import { IResults } from './types/types';

interface CardProps {
  character: IResults;
}

const Card: FC<CardProps> = ({ character }) => {
  return <div>{character}</div>;
};

export default Card;
