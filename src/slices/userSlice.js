import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
   userAuth: false,
   userAuthStatus: 'idle',
   userLoguotStatus: 'idle',
   userErrors: [],
   dontAuthCart: [],
   dontAuthLiked: [],
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
      addDontAuthCart: (state, action) => {
         const { dontAuthCart } = state;
         let findedItem = false;

         dontAuthCart.forEach((item) => {
            if (item.id === action.payload) {
               findedItem = item;
            }
         });

         if (!findedItem) {
            state.dontAuthCart = [
               ...dontAuthCart,
               { id: action.payload, amount: 1 },
            ];
         }
      },
      removeFromDontAuthCart: (state, action) => {
         state.dontAuthCart = state.dontAuthCart.filter(
            (item) => item.id !== action.payload
         );
      },
      clearDontAuthCart: (state) => {
         state.dontAuthCart = [];
      },
      addDontAuthLiked: (state, action) => {
         const { dontAuthLiked } = state;
         let findedItem = false;

         dontAuthLiked.forEach((item) => {
            if (item.id === action.payload) {
               findedItem = item;
            }
         });

         if (!findedItem) {
            state.dontAuthLiked = [...dontAuthLiked, action.payload];
         }
      },
      removeFromDontAuthLiked: (state, action) => {
         state.dontAuthLiked = state.dontAuthLiked.filter(
            (item) => item !== action.payload
         );
      },
      clearDontAuthLiked: (state) => {
         state.dontAuthLiked = [];
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
   addDontAuthCart,
   clearDontAuthCart,
   addDontAuthLiked,
   clearDontAuthLiked,
   removeFromDontAuthCart,
   removeFromDontAuthLiked,
} = actions;

export default reducer;

export const { selectAll } = userAdapter.getSelectors((state) => state.user);
