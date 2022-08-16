import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
   userAuth: false,
   userAuthStatus: 'idle',
   userLoguotStatus: 'idle',
});

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      userAuthFetching: (state) => {
         state.userAuthStatus = 'loading';
      },
      userAuthFetched: (state, action) => {
         state.user = action.payload;
         state.userAuth = true;
         state.userAuthStatus = 'idle';
      },
      userAuthFetchingError: (state) => {
         state.userAuthStatus = 'error';
      },
      userLogoutFetching: (state) => {
         state.userLoguotStatus = 'loading';
      },
      userLogoutFetched: (state) => {
         state.user = {};
         state.userAuth = false;
         state.userLoguotStatus = 'idle';
      },
      userLogoutFetchingError: (state) => {
         state.userLoguotStatus = 'error';
      },
   },
});

const { actions, reducer } = userSlice;

export const {
   userAuthFetching,
   userAuthFetched,
   userAuthFetchingError,
   userLogoutFetching,
   userLogoutFetched,
   userLogoutFetchingError,
} = actions;

export default reducer;

export const { selectAll } = userAdapter.getSelectors((state) => state.user);
