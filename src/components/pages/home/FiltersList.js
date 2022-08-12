import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FiltersListItem from './FiltersListItem';
import Skeleton from '@mui/material/Skeleton';

const FiltersList = () => {
   const [items, setItems] = useState([]);
   const [itemsLoadingStatus, setItemsLoadingStatus] = useState('loading');

   useEffect(() => {
      axios
         .get('http://localhost:3100/filtersList')
         .then((res) => {
            setItems(res.data);
            setItemsLoadingStatus('idle');
         })
         .catch(() => setItemsLoadingStatus('error'));
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
               {items.map((item, i) => (
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
         {renderItems(itemsLoadingStatus)}
      </div>
   );
};

export default FiltersList;
