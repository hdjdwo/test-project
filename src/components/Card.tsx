import React, { FC, useEffect, useRef, useState } from 'react';
import { ICharacter } from './types/types';
import style from './Card.module.css';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  character: ICharacter;
  onClick: (character: ICharacter) => void;
  delete: (id: number) => void;
}

const Card: FC<CardProps> = ({ character, onClick, delete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [like, setLike] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      setShowReadMore(element.scrollHeight > element.clientHeight);
    }
  }, [textRef]);

  const likeHandler = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    like === true ? setLike(false) : setLike(true);
    console.log(like);
    e.stopPropagation();
  };

  return (
    <div onClick={() => onClick(character)} className={style.container}>
      <button onClick={() => delete(character.id)}>delete</button>
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

          <div className={style.card_footer}>
            <div>
              {showReadMore && !isExpanded && (
                <button className={style.read_more} onClick={() => onClick(character)}>
                  Читать далее
                </button>
              )}
            </div>
            <svg
              onClick={likeHandler}
              className={like === false ? style.svg : [style.svg, style.active].join(' ')}
              xmlns="http://www.w3.org/2000/svg"
              width="4rem"
              height="4rem"
              viewBox="0 0 24 24"
              fill="none">
              <path
                d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
