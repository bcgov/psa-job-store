/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: Record<string, any> | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('action: ', action);

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    },
  },
});

export const { setUser } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
