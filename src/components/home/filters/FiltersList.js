import React from 'react';
import FiltersListItem from './FiltersListItem';
import Skeleton from '@mui/material/Skeleton';

import { useGetFiltersListQuery } from '../../../slices/apiSlice';

const FiltersList = () => {
   const {
      data: filtersList = [],
      isFetching,
      isLoading,
      isError,
   } = useGetFiltersListQuery();

   const renderItems = () => {
      if (isLoading || isFetching) {
         return (
            <>
               {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton
                     key={i}
                     animation="wave"
                     variant="text"
                     sx={{ fontSize: '30px' }}
                  />
               ))}
            </>
         );
      } else if (isError) {
         return <h3>Loading error</h3>;
      } else {
         return (
            <>
               {filtersList.map((item, i) => (
                  <React.Fragment key={i}>
                     {item.type === 'accordion' ? (
                        <FiltersListItem {...item} />
                     ) : null}
                  </React.Fragment>
               ))}
            </>
         );
      }
   };

   return (
      <div style={{ width: '300px', paddingBottom: '30px' }}>
         {renderItems()}
      </div>
   );
};

export default FiltersList;
