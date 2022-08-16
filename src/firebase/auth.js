import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

import {
   userAuthFetching,
   userAuthFetched,
   userAuthFetchingError,
   userLogoutFetching,
   userLogoutFetched,
   userLogoutFetchingError,
} from '../slices/userSlice';

export const userRegister = async (dispatch, navigate, { email, password }) => {
   dispatch(userAuthFetching());
   await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         navigate('/');
         const user = userCredential.user.reloadUserInfo;
         dispatch(userAuthFetched(user));
         console.log(user);
      })
      .catch(() => {
         dispatch(userAuthFetchingError());
      });
};

export const userLogin = async (dispatch, navigate, { email, password }) => {
   dispatch(userAuthFetching());
   await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         navigate('/');
         const user = userCredential.user.reloadUserInfo;
         dispatch(userAuthFetched(user));
         console.log(user);
      })
      .catch(() => {
         dispatch(userAuthFetchingError());
      });
};

export const userLogout = async (dispatch) => {
   dispatch(userAuthFetching());
   await signOut(auth)
      .then(() => dispatch(userLogoutFetched()))
      .catch(() => dispatch(userAuthFetchingError()));
};
