import { Routes, Route } from 'react-router-dom';

import Home from '../home/Home';
import ProductPage from '../home/products/ProductPage';
import Cart from '../cart/Cart';
import Error404 from '../error404/Error404';
import Register from '../authentication/Register';
import Login from '../authentication/Login';
import Orders from '../orders/Orders';
import OrderPage from '../orders/OrderPage';
import Liked from '../liked/Liked';
import Profile from '../profile/Profile';

const AppRoutes = ({ userAuth }) => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="cart" element={<Cart />} />
         <Route path="liked" element={<Liked />} />
         <Route path="products/:id" element={<ProductPage />} />
         {userAuth ? (
            <>
               <Route path="profile" element={<Profile />} />
               <Route path="orders" element={<Orders />} />
               <Route path="orders/:id" element={<OrderPage />} />
            </>
         ) : (
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
