import React from 'react';

export interface IApiResponse {
  results: ICharacter[];
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface ListProps<T> {
  item: T[];
  renderItem: (item: T) => React.ReactNode;
}

export default function List<T>(props: ListProps<T>) {
  return <>{props.item.map(props.renderItem)}</>;
}
