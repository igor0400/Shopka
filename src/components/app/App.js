import { Routes, Route } from 'react-router-dom';

import Header from '../header/Header';
import Home from '../pages/home';
import Cart from '../pages/cart';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
   return (
      <div className="App">
         <Header />
         <main style={{ padding: '90px 0 20px' }}>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="cart" element={<Cart />} />
            </Routes>
         </main>
      </div>
   );
}

export default App;
