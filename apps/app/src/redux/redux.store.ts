import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { graphqlApi } from './services/graphql-api';

export const store = configureStore({
  reducer: {
    [graphqlApi.reducerPath]: graphqlApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(graphqlApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
