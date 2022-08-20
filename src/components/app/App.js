import { useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import {
   clearDontAuthCart,
   clearDontAuthLiked,
   clearErrors,
} from '../../slices/userSlice';
import {
   useGetUserCartQuery,
   usePostUserCartMutation,
   useGetUserLikedQuery,
   usePostUserLikedMutation,
} from '../../firebase/firebaseSlice';

import Header from '../header/Header';
import Home from '../home/Home';
import Cart from '../cart/Cart';
import Error404 from '../error404/Error404';
import Register from '../authentication/Register';
import Login from '../authentication/Login';
import Orders from '../orders/Orders';
import Profile from '../profile/Profile';

// надо сделать карты товаров

function App() {
   const {
      user,
      userAuth,
      userAuthStatus,
      userLoguotStatus,
      userErrors,
      dontAuthCart,
      dontAuthLiked,
   } = useSelector((state) => state.user);

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
      if (
         userAuth &&
         dontAuthCart.length > 0 &&
         !isCartUninitialized &&
         !isCartFetching &&
         !isCartLoading &&
         !isCartError
      ) {
         if (userCart) {
            postCart({ url: userId, data: [...dontAuthCart, ...userCart] });
            console.log('post with user cart');
         } else {
            postCart({ url: userId, data: [...dontAuthCart] });
            console.log('post with out user cart');
         }
         dispatch(clearDontAuthCart());
      }
   }, [userAuth, userCart, isCartFetching]);

   useEffect(() => {
      if (
         userAuth &&
         dontAuthLiked.length > 0 &&
         !isLikedUninitialized &&
         !isLikedFetching &&
         !isLikedLoading &&
         !isLikedError
      ) {
         if (userLiked) {
            postLiked({ url: userId, data: [...dontAuthLiked, ...userLiked] });
         } else {
            postLiked({ url: userId, data: [...dontAuthLiked] });
         }
         dispatch(clearDontAuthLiked());
      }
   }, [userAuth, userLiked, isLikedFetching]);

   // ************************************************************ //

   // ********************** NOTIFY IF ERROR *********************** //
   useEffect(() => {
      if (userAuthStatus === 'error' || userLoguotStatus === 'error') {
         userErrors.map((item) => notify(item));
         dispatch(clearErrors());
      }
   }, [userAuthStatus, userLoguotStatus]);

   // *************************************************************** //

   return (
      <div className="App">
         <Header />
         <main style={{ padding: '90px 0 20px' }}>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="cart" element={<Cart />} />
               {userAuth ? (
                  <>
                     <Route path="profile" element={<Profile />} />
                     <Route path="orders" element={<Orders />} />
                  </>
               ) : (
                  <>
                     <Route path="register" element={<Register />} />
                     <Route path="login" element={<Login />} />
                  </>
               )}
               <Route path="*" element={<Error404 />} />
            </Routes>
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
