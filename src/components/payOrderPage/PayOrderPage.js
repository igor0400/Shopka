import { useCallback } from 'react';
import {
   useGetUserOrdersQuery,
   usePostUserOrdersMutation,
   usePostUserCartMutation,
} from '../../slices/firebaseSlice';
import { v4 as uuidv4 } from 'uuid';


// const {
//    data: userOrders = [],
//    isOrdersLoading,
//    isOrdersError,
// } = useGetUserOrdersQuery(userId);

// const [postUserOrders] = usePostUserOrdersMutation();
// const [postUserCart] = usePostUserCartMutation();

// const postOrder = useCallback((value) => {
//    postUserOrders(value);
// }, []);
// const clearCart = useCallback((value) => {
//    postUserCart(value);
// }, []);

// const postOrderData = () => {
//    // поместить эту функцию в utils/posted
//    // отследить есть ли userOrders
//    postOrder({
//       url: userId,
//       data: [
//          ...userOrders,
//          {
//             id: uuidv4(),
//             email: user.email,
//          },
//       ],
//    });
//    clearCart({ url: userId, data: [] });
// };

// КНОПКА DISABLED ЕСЛИ isOrdersLoading ИЛИ isOrdersError,
