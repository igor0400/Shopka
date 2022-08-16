import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
   userAuth: false,
   userAuthStatus: 'idle',
});

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      userAuthTrue: (state) => {
         state.userAuth = true;
      },
      userAuthFalse: (state) => {
         state.userAuth = false;
      },
      userAuthStatusFetching: (state) => {
         state.userAuthStatus = 'loading';
      },
      userAuthStatusFetched: (state, action) => {
         state.user = action.payload;
         state.userAuth = true;
         state.userAuthStatus = 'idle';
      },
      userAuthStatusFetchingError: (state) => {
         state.userAuthStatus = 'error';
      },
   },
});

const { actions, reducer } = userSlice;

export const {
   userAuthTrue,
   userAuthFalse,
   userAuthStatusFetching,
   userAuthStatusFetched,
   userAuthStatusFetchingError,
} = actions;

export const userSignUp = async (dispatch, navigate, { email, password }) => {
   dispatch(userAuthStatusFetching());
   await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         navigate('/');
         const user = userCredential.user.reloadUserInfo;
         dispatch(userAuthStatusFetched(user));
         console.log(user);
      })
      .catch(() => {
         dispatch(userAuthStatusFetchingError());
      });
};

export const userSignIn = async (dispatch, navigate, { email, password }) => {
   dispatch(userAuthStatusFetching());
   await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         navigate('/');
         const user = userCredential.user.reloadUserInfo;
         dispatch(userAuthStatusFetched(user));
         console.log(user);
      })
      .catch(() => {
         dispatch(userAuthStatusFetchingError());
      });
};

export default reducer;

export const { selectAll } = userAdapter.getSelectors((state) => state.user);
