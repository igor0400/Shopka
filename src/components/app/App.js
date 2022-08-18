import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../slices/userSlice';

import Header from '../header/Header';
import Home from '../home/Home';
import Cart from '../cart/Cart';
import Error404 from '../error404/Error404';

import Register from '../authentication/Register';
import Login from '../authentication/Login';

import {
   useGetUserDataQuery,
   usePostUserDataMutation,
} from '../../firebase/firebaseSlice';
import { useCallback } from 'react';

function App() {
   const { user, userAuth, userAuthStatus, userLoguotStatus, userErrors } =
      useSelector((state) => state.user);

   const dispatch = useDispatch();
   const notify = (value) => toast.error(value);

   useEffect(() => {
      if (userAuthStatus === 'error' || userLoguotStatus === 'error') {
         userErrors.map((item) => notify(item));
         dispatch(clearErrors());
      }
   }, [userAuthStatus, userLoguotStatus]);

   // auth data post to user

   // надо записать userData в user при авторизации

   const userPath = user ? user.localId : user;
   const {
      data: userData = {},
      isLoading,
      isError,
   } = useGetUserDataQuery(`/users/${userPath}`);
   const [postUserData] = usePostUserDataMutation();

   const postUserEmail = useCallback((value) => {
      postUserData(value);
   }, []);

   useEffect(() => {
      if (!isLoading && !isError) {
         console.log(userData);
      }

      // if (userAuth) {
      //    postUserEmail({
      //       url: `/users/${userPath}/orders`,
      //       data: {
      //          email: 'some@gmail.com',
      //       },
      //    });
      // }
   }, [userData]);

   return (
      <div className="App">
         <Header />
         <main style={{ padding: '90px 0 20px' }}>
            <Routes>
               {userAuth ? (
                  <>
                     <Route path="/" element={<Home />} />
                     <Route path="cart" element={<Cart />} />
                  </>
               ) : (
                  <>
                     <Route path="/" element={<Home />} />
                     <Route path="cart" element={<Cart />} />
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
