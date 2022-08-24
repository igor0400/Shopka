export const getCartItems = (products, cart) => {
   const cartItems = [];
   products.forEach((product) => {
      cart.forEach((cartItem) => {
         if (cartItem.id === product.id) {
            cartItems.push({ ...product, ...cartItem });
         }
      });
   });
   return cartItems;
};

export const returnArrfromObj = (obj) => {
   const arr = [];

   for (let key in obj) {
      arr.push(obj[key]);
   }

   return arr;
};
