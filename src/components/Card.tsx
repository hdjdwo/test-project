import React, { FC, useEffect, useRef, useState } from 'react';
import { ICharacter } from './types/types';
import style from './Card.module.css';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  character: ICharacter;
  onClick: (character: ICharacter) => void;
}

const Card: FC<CardProps> = ({ character, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      setShowReadMore(element.scrollHeight > element.clientHeight);
    }
  }, [textRef]);
  return (
    <div onClick={() => onClick(character)} className={style.container}>
      <div className={style.card}>
        <h3>{character.name}</h3>
        <img className={style.img} src={character.image} alt="" />
        <div>
          <p ref={textRef} className={isExpanded ? [style.text, style.expanded].join(' ') : style.text}>
            Персонаж <strong>{character.name}</strong> принадлежит к <i>{character.species}</i>. В данный момент{' '}
            {character.name} имеет статус{' '}
            <span
              className={
                character.status === 'Dead'
                  ? style.dead
                  : character.status === 'Alive'
                  ? style.alive
                  : character.status === 'unknown'
                  ? style.unknown
                  : ''
              }>
              {character.status}
            </span>
          </p>
          {showReadMore && !isExpanded && (
            <button className={style.read_more} onClick={() => onClick(character)}>
              Читать далее
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
