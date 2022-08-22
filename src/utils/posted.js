export const postItemToSome = (where, mainArray, id, postFunc, userId) => {
   if (mainArray) {
      let findedItem = false;

      if (where === 'cart') {
         mainArray.forEach((item) => {
            if (item.id === id) {
               findedItem = item;
            }
         });
      } else {
         mainArray.forEach((item) => {
            if (item === id) {
               findedItem = item;
            }
         });
      }

      if (!findedItem) {
         postFunc({
            url: userId,
            data:
               where === 'cart'
                  ? [...mainArray, { id: id, amount: 1 }]
                  : [...mainArray, id],
         });
      }
   } else {
      postFunc({
         url: userId,
         data: where === 'cart' ? [{ id: id, amount: 1 }] : [id],
      });
   }
};

export const postItemsToSome = (
   mainArray,
   postedArray,
   postFunc,
   userId,
   findedItemsFunc,
   filteredMainArrayFunc
) => {
   if (mainArray) {
      const findedItems = findedItemsFunc(mainArray, postedArray);
      const filteredMainArray = filteredMainArrayFunc(mainArray, postedArray);

      if (findedItems.length !== 0 && filteredMainArray.length !== 0) {
         postFunc({
            url: userId,
            data: [...filteredMainArray, ...findedItems],
         });
      } else if (findedItems.length === 0) {
         postFunc({
            url: userId,
            data: [...mainArray, ...postedArray],
         });
      }
   } else {
      postFunc({ url: userId, data: postedArray });
   }
};
