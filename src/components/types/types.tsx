import React from 'react';

export interface IResults {
  id: number;
}

export interface ICharacter {
  results: IResults[];
}

interface ListProps<T> {
  item: T[];
  renderItem: (item: T) => React.ReactNode;
}

export default function List<T>(props: ListProps<T>) {
  return <div>{props.item.map(props.renderItem)}</div>;
}
