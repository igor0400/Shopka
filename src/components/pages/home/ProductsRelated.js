import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const items = [
   'worldwide shipping',
   'under $50',
   'kitten',
   'plastic plugs',
   'pucker shoes',
   'vintage typewriter',
];

const ProductsRelated = () => {
   const handleDelete = () => {
      console.log('Delete');
   };

   return (
      <>
         {items.length === 0 ? null : (
            <Box sx={{ paddingBottom: '20px' }}>
               <b>Related</b>
               {items.map((item, i) => (
                  <Chip
                     key={i}
                     label={item}
                     onDelete={handleDelete}
                     sx={{ marginLeft: '5px' }}
                  />
               ))}
            </Box>
         )}
      </>
   );
};

export default ProductsRelated;
