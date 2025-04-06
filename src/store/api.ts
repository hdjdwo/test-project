import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  endpoints: build => ({
    getCharacter: build.query({
      query: () => 'character',
    }),
  }),
});

export const { useGetCharacterQuery } = api;
