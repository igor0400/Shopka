import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
   userAuth: false,
   userAuthStatus: 'idle',
   userLoguotStatus: 'idle',
   userErrors: [],
});

const errorMessageValidate = (action) => {
   const { error, email } = action;
   const filteredError = error
      .match(/(\w*-)|(\w*)\)/gi)
      .join(' ')
      .replace(/-|\)/gi, '');

   if (email) {
      return `${filteredError}: ${email}`;
   } else {
      return filteredError;
   }
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      userAuthFetching: (state) => {
         state.userAuthStatus = 'loading';
      },
      userAuthFetched: (state, action) => {
         const { displayName, email, localId, photoUrl } = action.payload;
         const user = { displayName, email, localId, photoUrl };
         state.user = user;
         state.userAuth = true;
         state.userAuthStatus = 'idle';
      },
      userAuthFetchingError: (state, action) => {
         state.userAuthStatus = 'error';
         state.userErrors.push(errorMessageValidate(action.payload));
      },
      userLogoutFetching: (state) => {
         state.userLoguotStatus = 'loading';
      },
      userLogoutFetched: (state) => {
         state.user = {};
         state.userAuth = false;
         state.userLoguotStatus = 'idle';
      },
      userLogoutFetchingError: (state, action) => {
         state.userLoguotStatus = 'error';
         state.userErrors.push(errorMessageValidate(action.payload));
      },
      clearErrors: (state) => {
         state.userErrors = [];
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
   clearErrors,
} = actions;

export default reducer;

export const { selectAll } = userAdapter.getSelectors((state) => state.user);
