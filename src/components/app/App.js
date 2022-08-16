import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../header/Header';
import Home from '../home/Home';
import Cart from '../cart/Cart';
import Error404 from '../error404/Error404';

import Register from '../authentication/Register';
import Login from '../authentication/Login';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'animate.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
   const userAuth = useSelector((state) => state.user.userAuth);

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
      </div>
   );
}

export default App;
