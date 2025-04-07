import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICharacter } from '../components/types/types';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  endpoints: build => ({
    getCharacter: build.query<ICharacter, void>({
      query: () => 'character',
    }),
  }),
});

export const { useGetCharacterQuery } = api;
