import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useState } from 'react';

const ProductsRelated = () => {
   const [items, setItems] = useState([
      'worldwide shipping',
      'under $50',
      'kitten',
      'plastic plugs',
      'pucker shoes',
      'vintage typewriter',
   ]);

   const handleDelete = (target) => {
      setItems((state) => state.filter((item) => item !== target));
   };

   return (
      <>
         {items.length === 0 ? null : (
            <Box sx={{ paddingBottom: '15px' }}>
               <b style={{ margin: '0 0 5px 0' }}>Related</b>
               {items.map((item, i) => (
                  <Chip
                     key={i}
                     label={item}
                     onDelete={() => handleDelete(item)}
                     sx={{ margin: ' 0 0 5px 5px' }}
                  />
               ))}
            </Box>
         )}
      </>
   );
};

export default ProductsRelated;
