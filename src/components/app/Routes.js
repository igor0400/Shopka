import { Routes, Route } from 'react-router-dom';

import Home from '../home';
import ProductPage from '../home/products/ProductPage';
import Cart from '../cart';
import Error404 from '../errors/Error404';
import Register from '../authentication/Register';
import Login from '../authentication/Login';
import Orders from '../orders';
import OrderPage from '../orders/OrderPage';
import Liked from '../liked';
import Profile from '../profile';
import PayOrderPage from '../payOrderPage';

import RequireAuth from '../../hoc/RequireAuth';

const AppRoutes = ({ userAuth }) => {
   return (
      <Routes>
         <Route index element={<Home />} />
         <Route path="cart" element={<Cart />} />
         <Route path="liked" element={<Liked />} />
         <Route path="products/:id" element={<ProductPage />} />
         <Route
            path="profile"
            element={
               <RequireAuth>
                  <Profile />
               </RequireAuth>
            }
         />
         <Route
            path="orders"
            element={
               <RequireAuth>
                  <Orders />
               </RequireAuth>
            }
         />
         <Route
            path="orders/:id"
            element={
               <RequireAuth>
                  <OrderPage />
               </RequireAuth>
            }
         />
         <Route path="payorder" element={<PayOrderPage />} />
         {userAuth ? null : (
            <>
               <Route path="register" element={<Register />} />
               <Route path="login" element={<Login />} />
            </>
         )}
         <Route path="*" element={<Error404 />} />
      </Routes>
   );
};

export default AppRoutes;
