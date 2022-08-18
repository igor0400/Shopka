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
import Orders from '../orders/Orders';
import Profile from '../profile/Profile';

function App() {
   const { userAuth, userAuthStatus, userLoguotStatus, userErrors } =
      useSelector((state) => state.user);

   const dispatch = useDispatch();
   const notify = (value) => toast.error(value);

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
