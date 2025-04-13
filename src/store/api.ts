import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApiResponse, ICharacter, ICharacterProps } from '../components/types/types';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  endpoints: build => ({
    getCharacter: build.query<IApiResponse, void>({
      query: () => 'character',
    }),
    getCharacterById: build.query<ICharacterProps, string>({
      query: id => `/character/${id}`,
    }),
  }),
});

export const { useGetCharacterQuery, useGetCharacterByIdQuery } = api;
