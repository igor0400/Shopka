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
