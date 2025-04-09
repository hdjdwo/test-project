import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface cardSlice {
  deletedId: number[];
}

const initialState: cardSlice = {
  deletedId: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    deleteCard: (state, action: PayloadAction<number>) => {
      state.deletedId.push(action.payload);
    },
  },
});

export const { deleteCard } = cardSlice.actions;
export default cardSlice.reducer;
