import React from 'react';

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface ListProps<T> {
  item: T[];
  renderItem: (item: T) => React.ReactNode;
}

export default function List<T>(props: ListProps<T>) {
  return <div>{props.item.map(props.renderItem)}</div>;
}
