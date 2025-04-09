import { createSlice } from '@reduxjs/toolkit';
import { ICharacter } from '../components/types/types';

interface cardSlice {
  characters: ICharacter | ICharacter[] | undefined;
}

const initialState: cardSlice = {
  characters: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setSum1: (state, action: PayloadAction<ICharacter>) => {},
  },
});
