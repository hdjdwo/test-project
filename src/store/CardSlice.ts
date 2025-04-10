import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface cardSlice {
  deletedId: number[];
  favoriteId: number[];
}

const initialState: cardSlice = {
  deletedId: [],
  favoriteId: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    deleteCard: (state, action: PayloadAction<number>) => {
      state.deletedId.push(action.payload);
    },
    toggleToFavorite: (state, action: PayloadAction<number>) => {
      if (state.favoriteId.includes(action.payload)) {
        state.favoriteId.filter(id => id !== action.payload);
      } else {
        state.favoriteId.push(action.payload);
      }
    },
  },
});

export const { deleteCard, toggleToFavorite } = cardSlice.actions;
export default cardSlice.reducer;
