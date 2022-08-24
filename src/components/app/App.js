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
} from '../../slices/firebaseSlice';

import Header from '../header/Header';
import Home from '../home/Home';
import ProductPage from '../productPage/ProductPage';
import Cart from '../cart/Cart';
import Error404 from '../error404/Error404';
import Register from '../authentication/Register';
import Login from '../authentication/Login';
import Orders from '../orders/Orders';
import Liked from '../liked/Liked';
import Profile from '../profile/Profile';

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
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="cart" element={<Cart />} />
               <Route path="liked" element={<Liked />} />
               <Route path="products/:id" element={<ProductPage />} />
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
