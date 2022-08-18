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

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

import Header from '../header/Header';
import Home from '../home/Home';
import Cart from '../cart/Cart';
import Error404 from '../error404/Error404';
import Register from '../authentication/Register';
import Login from '../authentication/Login';
import Orders from '../orders/Orders';
import Profile from '../profile/Profile';

// надо сделать карты товаров
// если пользователь не авторизован отправлять товары в dontAuthCart, то же самое с liked

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

   const userId = user ? user.localId : user;

   const {
      data: userCart = [],
      isCartLoading,
      isCartError,
   } = useGetUserCartQuery(userId);
   const {
      data: userLiked = [],
      isLikedLoading,
      isLikedError,
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
      onAuthStateChanged(auth, (userData) => {
         if (
            userData &&
            dontAuthCart &&
            dontAuthCart.length > 0 &&
            !isCartLoading &&
            !isCartError &&
            userCart
         ) {
            const uid = userData.uid;

            postCart({ url: uid, data: [...dontAuthCart, ...userCart] });
            dispatch(clearDontAuthCart());
            console.log(dontAuthCart, userCart);
         }
      });
   }, [userCart]);

   // useEffect(() => {
   //    onAuthStateChanged(auth, (userData) => {
   //       if (
   //          userData &&
   //          dontAuthLiked &&
   //          dontAuthLiked.length > 0 &&
   //          !isLikedLoading &&
   //          !isLikedError &&
   //          userLiked
   //       ) {
   //          const uid = userData.uid;

   //          postLiked({ url: uid, data: [...dontAuthLiked, ...userLiked] });
   //          dispatch(clearDontAuthLiked());
   //       }
   //    });
   // }, [userLiked]);

   useEffect(() => {
      if (userAuthStatus === 'error' || userLoguotStatus === 'error') {
         userErrors.map((item) => notify(item));
         dispatch(clearErrors());
      }
   }, [userAuthStatus, userLoguotStatus]);

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
