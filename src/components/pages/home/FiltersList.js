import React, { useEffect } from 'react';
import FiltersListItem from './FiltersListItem';
import Skeleton from '@mui/material/Skeleton';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFiltersList } from '../../../slices/filtersSlice';

const FiltersList = () => {
   const { filtersList, filtersListLoadingStatus } = useSelector(
      (state) => state.filters
   );
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchFiltersList());
   }, []);

   const renderItems = (status) => {
      if (status === 'loading') {
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
      } else if (status === 'error') {
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
         {renderItems(filtersListLoadingStatus)}
      </div>
   );
};

export default FiltersList;
