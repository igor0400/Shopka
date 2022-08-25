export const returnArrfromObj = (obj) => {
   const arr = [];

   for (let key in obj) {
      arr.push(obj[key]);
   }

   return arr;
};
