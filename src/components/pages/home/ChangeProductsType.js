import Typography from '@mui/material/Typography';
import { useState } from 'react';

const ChangeProductsType = () => {
   const items = ['Show all', 'Auction', 'Buy now'];
   const [active, setActive] = useState(items[0]);

   return (
      <div
         className="flex"
         style={{
            background: '#EBF2FF',
            borderRadius: '4px',
            marginRight: '20px',
         }}
      >
         {items.map((item) => (
            <Typography
               variant="body2"
               component="div"
               style={{
                  padding: 'auto 15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  borderRadius: '4px',
                  background: active === item ? '#fff' : null,
                  boxShadow:
                     active === item
                        ? '0px 1px 2px rgba(27, 78, 163, 0.24), 0px 2px 4px rgba(41, 121, 255, 0.24)'
                        : null,
                  transition: '0.3s',
               }}
               onClick={() => setActive(item)}
            >
               {item}
            </Typography>
         ))}
      </div>
   );
};

export default ChangeProductsType;
