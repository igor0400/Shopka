import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

import { useSelector, useDispatch } from 'react-redux';
import { removeFilter } from '../../../utils/fliters';

const ProductsRelated = () => {
   const { activeFilters } = useSelector((state) => state.filters);
   const dispatch = useDispatch();

   const handleDelete = (target) => {
      removeFilter(dispatch, target);
   };

   return (
      <>
         {activeFilters.length === 0 ? null : (
            <Box sx={{ paddingBottom: '15px' }}>
               <b style={{ margin: '0 0 5px 0' }}>Related</b>
               {activeFilters.map((item, i) => (
                  <Chip
                     key={i}
                     label={item.name}
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
