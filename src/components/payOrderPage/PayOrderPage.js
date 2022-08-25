import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

const PayOrderPage = () => {
   const location = useLocation();

   if (location.state?.from?.pathname !== '/cart') {
      return <Navigate to="/" />;
   }

   return <h1>Pay order</h1>;
};

export default PayOrderPage;
