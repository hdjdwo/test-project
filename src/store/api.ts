import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICharacters } from '../components/types/types';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  endpoints: build => ({
    getCharacter: build.query<ICharacters, void>({
      query: () => 'character',
    }),
  }),
});

export const { useGetCharacterQuery } = api;
