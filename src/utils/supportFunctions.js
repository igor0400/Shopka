export const returnArrfromObj = (obj) => {
   const arr = [];

   for (let key in obj) {
      arr.push(obj[key]);
   }

   return arr;
};

function plusZero(value) {
   if (value < 10) {
      value = '0' + value;
   }
   return value;
}

export const getDateTime = () => {
   const now = new Date();
   const day = plusZero(now.getUTCDate());
   const month = plusZero(now.getUTCMonth() + 1);
   const year = now.getUTCFullYear();
   const hours = plusZero(now.getUTCHours());
   const minutes = plusZero(now.getUTCMinutes());

   return `${hours}:${minutes} ${day}.${month}.${year} `;
};

export const getObjLength = (obj) => {
   let count = 0;
   for (let key in obj) {
      count += 1;
   }
   return count;
};
