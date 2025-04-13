import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacterProps } from '../components/types/types';

interface cardSlice {
  characters: ICharacterProps[];
}

const initialState: cardSlice = {
  characters: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    deleteCard: (state, action: PayloadAction<number>) => {
      const index = state.characters.findIndex(char => char.id === action.payload);

      if (index !== -1) {
        state.characters[index] = {
          ...state.characters[index],
          isDelete: true,
        };
      }
    },
    addCharacters: (state, action: PayloadAction<ICharacterProps[]>) => {
      state.characters = action.payload;
    },
  },
});

export const { deleteCard, addCharacters } = cardSlice.actions;
export default cardSlice.reducer;
