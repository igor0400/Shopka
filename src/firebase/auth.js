import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   signInWithPopup,
   GoogleAuthProvider,
   GithubAuthProvider,
   OAuthProvider,
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
      })
      .catch((error) => {
         const errorMessage = error.message;
         dispatch(userAuthFetchingError({ error: errorMessage }));
      });
};

export const userLogin = async (
   dispatch,
   navigate,
   { email, password },
   fromPage
) => {
   dispatch(userAuthFetching());
   await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         navigate(fromPage, { replace: true });
         const user = userCredential.user.reloadUserInfo;
         dispatch(userAuthFetched(user));
      })
      .catch((error) => {
         const errorMessage = error.message;
         dispatch(userAuthFetchingError({ error: errorMessage }));
      });
};

export const userLogout = async (dispatch, navigate) => {
   dispatch(userLogoutFetching());
   await signOut(auth)
      .then(() => {
         navigate('/');
         dispatch(userLogoutFetched());
      })
      .catch((error) => {
         const errorMessage = error.message;
         dispatch(userLogoutFetchingError({ error: errorMessage }));
      });
};

const googleProvider = new GoogleAuthProvider();

export const userAuthGoogle = async (dispatch, navigate, fromPage = '/') => {
   dispatch(userAuthFetching());
   signInWithPopup(auth, googleProvider)
      .then((result) => {
         navigate(fromPage);
         const user = result.user.reloadUserInfo;
         dispatch(userAuthFetched(user));
      })
      .catch((error) => {
         const errorMessage = error.message;
         const email = error.customData.email;
         dispatch(userAuthFetchingError({ error: errorMessage, email }));
      });
};

const githibProvider = new GithubAuthProvider();

export const userAuthGithub = async (dispatch, navigate, fromPage = '/') => {
   dispatch(userAuthFetching());
   signInWithPopup(auth, githibProvider)
      .then((result) => {
         navigate(fromPage);
         const user = result.user.reloadUserInfo;
         dispatch(userAuthFetched(user));
      })
      .catch((error) => {
         const errorMessage = error.message;
         const email = error.customData.email;
         dispatch(userAuthFetchingError({ error: errorMessage, email }));
      });
};

const yahooProvider = new OAuthProvider('yahoo.com');

export const userAuthYahoo = async (dispatch, navigate, fromPage = '/') => {
   dispatch(userAuthFetching());
   signInWithPopup(auth, yahooProvider)
      .then((result) => {
         navigate(fromPage);
         const user = result.user.reloadUserInfo;
         dispatch(userAuthFetched(user));
      })
      .catch((error) => {
         const errorMessage = error.message;
         const email = error.customData.email;
         dispatch(userAuthFetchingError({ error: errorMessage, email }));
      });
};
