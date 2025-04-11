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
      const index = state.favoriteId.indexOf(action.payload);

      if (index === -1) {
        state.favoriteId.push(action.payload);
      } else {
        state.favoriteId.splice(index, 1);
      }
    },
  },
});

export const { deleteCard, toggleToFavorite } = cardSlice.actions;
export default cardSlice.reducer;
