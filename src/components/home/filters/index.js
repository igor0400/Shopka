import { useState, useEffect } from 'react';

import FiltersAccordion from './FiltersAccordion';
import FiltersAccordionPrice from './FiltersAccordionPrice';

import { Stack, Skeleton } from '@mui/material';

import { useGetProductsQuery } from '../../../slices/apiSlice';

const getFilteredObj = (mainObj, item, arrName, type, name, accumulator) => {
   if (mainObj) {
      if (!mainObj.items.indexOf(item)) {
         return accumulator;
      } else {
         return { [arrName]: { items: [...mainObj.items, item], type, name } };
      }
   } else {
      return { [arrName]: { items: [item], type, name } };
   }
};

const Filters = () => {
   const [filtersSettings, setFiltersSettings] = useState([]);

   const { data: products = [], isLoading, isError } = useGetProductsQuery();

   useEffect(() => {
      if (products && !isLoading && !isError) {
         const filters = products.reduce((accumulator, currentValue) => {
            const brands = accumulator?.brands;
            const { brand } = currentValue;

            return {
               ...getFilteredObj(
                  brands,
                  brand,
                  'brands',
                  'brand',
                  'Brand',
                  accumulator
               ),
            };
         }, {});

         const filtersArr = [];

         for (let key in filters) {
            filtersArr.push({
               name: filters[key].name,
               listItems: filters[key].items,
               type: filters[key].type,
            });
         }

         setFiltersSettings(filtersArr);
      }
   }, [products]);

   return (
      <Stack sx={{ width: '300px' }} spacing={1}>
         {isLoading || isError ? (
            <Stack>
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <Skeleton
                     key={i}
                     animation="wave"
                     variant="text"
                     sx={{ fontSize: '30px', width: '300px' }}
                  />
               ))}
            </Stack>
         ) : (
            <>
               {filtersSettings.map((item, i) => (
                  <FiltersAccordion key={i} {...item} />
               ))}
               <FiltersAccordion
                  name="Rating"
                  type="rating"
                  listItems={[
                     '1 star',
                     '2 stars',
                     '3 stars',
                     '4 stars',
                     '5 stars',
                  ]}
               />
               <FiltersAccordionPrice name="Price, $" type="price" />
            </>
         )}
      </Stack>
   );
};

export default Filters;
