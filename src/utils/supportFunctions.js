export const getSomethingItems = (products, idsArr) => {
   const cartItems = [];
   products.forEach((product) => {
      for (let key in idsArr) {
         if (idsArr[key].id === product.id) {
            cartItems.push({ ...product, ...idsArr[key] });
         }
      }
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
