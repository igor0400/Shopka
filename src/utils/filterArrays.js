export function getSameValues(arr1, arr2) {
   var result = [];
   for (var i = 0; i < arr2.length; i++) {
      var obj = arr2[i];
      var id = obj.id;
      var isExist = false;
      for (var j = 0; j < arr1.length; j++) {
         var aj = arr1[j];
         var n = aj.id;
         if (n == id) {
            isExist = true;
            break;
         }
      }
      if (isExist) {
         result.push(obj);
      }
   }
   return result;
}

export function getVariousValues(arr1, arr2) {
   var result = [];
   for (var i = 0; i < arr2.length; i++) {
      var obj = arr2[i];
      var id = obj.id;
      var isExist = false;
      for (var j = 0; j < arr1.length; j++) {
         var aj = arr1[j];
         var n = aj.id;
         if (n == id) {
            isExist = true;
            break;
         }
      }
      if (!isExist) {
         result.push(obj);
      }
   }
   return result;
}

export function getArrEqual(arr1, arr2) {
   let newArr = [];
   for (let i = 0; i < arr2.length; i++) {
      for (let j = 0; j < arr1.length; j++) {
         if (arr1[j] === arr2[i]) {
            newArr.push(arr1[j]);
         }
      }
   }
   return newArr;
}

export function getArrDifference(arr1, arr2) {
   return arr1.concat(arr2).filter(function (v, i, arr) {
      return arr.indexOf(v) === arr.lastIndexOf(v);
   });
}
