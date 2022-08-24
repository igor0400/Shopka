import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
   userAuth: false,
   userAuthStatus: 'idle',
   userLoguotStatus: 'idle',
   userErrors: [],
   dontAuthCart: {},
   dontAuthLiked: {},
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

         for (let key in dontAuthCart) {
            if (key === action.payload) {
               findedItem = key;
            }
         }

         if (!findedItem) {
            state.dontAuthCart[action.payload] = {
               id: action.payload,
               amount: 1,
            };
         }
      },
      changeDontAuthCartItemAmount: (state, action) => {
         const { itemId, amount } = action.payload;

         state.dontAuthCart[itemId].amount = amount;
      },
      removeFromDontAuthCart: (state, action) => {
         const cart = JSON.parse(JSON.stringify(state.dontAuthCart));
         delete cart[action.payload];
         state.dontAuthCart = cart;
      },
      clearDontAuthCart: (state) => {
         state.dontAuthCart = {};
      },
      addDontAuthLiked: (state, action) => {
         const { dontAuthLiked } = state;
         let findedItem = false;

         for (let key in dontAuthLiked) {
            if (key === action.payload) {
               findedItem = key;
            }
         }

         if (!findedItem) {
            state.dontAuthLiked[action.payload] = { id: action.payload };
         }
      },
      removeFromDontAuthLiked: (state, action) => {
         const liked = JSON.parse(JSON.stringify(state.dontAuthLiked));
         delete liked[action.payload];
         state.dontAuthLiked = liked;
      },
      clearDontAuthLiked: (state) => {
         state.dontAuthLiked = {};
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
   changeDontAuthCartItemAmount,
   clearDontAuthCart,
   addDontAuthLiked,
   clearDontAuthLiked,
   removeFromDontAuthCart,
   removeFromDontAuthLiked,
} = actions;

export default reducer;

export const { selectAll } = userAdapter.getSelectors((state) => state.user);
