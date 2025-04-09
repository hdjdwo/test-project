import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import cardSlice from './CardSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  cardSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;
