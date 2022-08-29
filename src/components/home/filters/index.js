import { useState, useEffect } from 'react';

import FiltersAccordion from './FiltersAccordion';

import { Box } from '@mui/material';

import { useGetProductsQuery } from '../../../slices/apiSlice';

const Filters = () => {
   const [filtersSettings, setFiltersSettings] = useState([]);

   const { data: products = [], isLoading, isError } = useGetProductsQuery();

   useEffect(() => {
      if (products && !isLoading && !isError) {
         const filters = products.reduce(
            (accumulator, currentValue, index, array) => {
               const brands = accumulator?.brands;
               const { brand } = currentValue;

               if (brands) {
                  if (!brands.indexOf(brand)) {
                     return accumulator;
                  } else {
                     return { brands: [...brands, brand] };
                  }
               } else {
                  return { brands: [brand] };
               }
            },
            {}
         );

         const filtersArr = [];

         for (let key in filters) {
            filtersArr.push({ name: key, listItems: filters[key] });
         }

         setFiltersSettings(filtersArr);
      }
   }, [products]);

   return (
      <Box sx={{ width: '300px' }}>
         {filtersSettings.map((item, i) => (
            <FiltersAccordion key={i} {...item}  />
         ))}
      </Box>
   );
};

export default Filters;
