import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authReducer } from '../routes/auth/store/auth.slice';
import { graphqlApi } from './services/graphql-api';

// console.log('configureStore, graphqlApi: ', graphqlApi);
export const store = configureStore({
  reducer: {
    [graphqlApi.reducerPath]: graphqlApi.reducer,
    authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(graphqlApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
