import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter } from '../components/types/types';
import { useGetCharacterQuery } from './api';

const { data, error, isLoading } = useGetCharacterQuery();
const characters = data?.results;

interface cardSlice {
  characters: ICharacter | ICharacter[] | undefined;
}

const initialState: cardSlice = {
  characters: characters,
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    deleteCard: (state, action: PayloadAction<ICharacter[]>) => {
      return state;
    },
  },
});

export const { deleteCard } = cardSlice.actions;
export default cardSlice.reducer;
