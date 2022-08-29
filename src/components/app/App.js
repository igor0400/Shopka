import { useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import {
   clearDontAuthCart,
   clearDontAuthLiked,
   clearErrors,
   userAuthFetched,
} from '../../slices/userSlice';
import {
   useGetUserCartQuery,
   usePostUserCartMutation,
   useGetUserLikedQuery,
   usePostUserLikedMutation,
} from '../../slices/firebaseSlice';

import Header from '../header';
import AppRoutes from './Routes';

function App() {
   const { user, userAuth, userErrors, dontAuthCart, dontAuthLiked } =
      useSelector((state) => state.user);

   const dispatch = useDispatch();
   const notify = (value) => toast.error(value);

   // ******************** POST CART IF USER AUTH ************************** //

   const userId = user ? user.localId : undefined;

   const {
      data: userCart = [],
      isUninitialized: isCartUninitialized,
      isFetching: isCartFetching,
      isLoading: isCartLoading,
      isError: isCartError,
   } = useGetUserCartQuery(userId);
   const {
      data: userLiked = [],
      isUninitialized: isLikedUninitialized,
      isFetching: isLikedFetching,
      isLoading: isLikedLoading,
      isError: isLikedError,
   } = useGetUserLikedQuery(userId);

   const [postUserCart] = usePostUserCartMutation();
   const [postUserLiked] = usePostUserLikedMutation();

   const postCart = useCallback((value) => {
      postUserCart(value);
   }, []);
   const postLiked = useCallback((value) => {
      postUserLiked(value);
   }, []);

   useEffect(() => {
      if (localStorage.getItem('user')) {
         const user = JSON.parse(localStorage.getItem('user'));
         dispatch(userAuthFetched(user));
      }
   }, [])

   useEffect(() => {
      if (
         userAuth &&
         !isCartUninitialized &&
         !isCartFetching &&
         !isCartLoading &&
         !isCartError
      ) {
         let dontAuthCartLength = 0;
         for (let key in dontAuthCart) {
            dontAuthCartLength += 1;
         }

         if (dontAuthCartLength > 0) {
            postCart({
               userId,
               data: Object.assign({}, userCart, dontAuthCart),
            });
            dispatch(clearDontAuthCart());
         }
      }
   }, [userAuth, userCart, isCartFetching]);

   useEffect(() => {
      if (
         userAuth &&
         !isLikedUninitialized &&
         !isLikedFetching &&
         !isLikedLoading &&
         !isLikedError
      ) {
         let dontAuthLikedLength = 0;
         for (let key in dontAuthLiked) {
            dontAuthLikedLength += 1;
         }

         if (dontAuthLikedLength > 0) {
            postLiked({
               userId,
               data: Object.assign({}, userLiked, dontAuthLiked),
            });
            dispatch(clearDontAuthLiked());
         }
      }
   }, [userAuth, userLiked, isLikedFetching]);

   // ************************************************************ //

   // ********************** NOTIFY IF ERROR *********************** //
   useEffect(() => {
      if (userErrors.length > 0) {
         userErrors.map((item) => notify(item));
         dispatch(clearErrors());
      }
   }, [userErrors]);

   // *************************************************************** //

   return (
      <div className="App">
         <Header />
         <main style={{ padding: '90px 0 20px' }}>
            <AppRoutes userAuth={userAuth} />
         </main>
         <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </div>
   );
}

export default App;
