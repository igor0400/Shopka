import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
   Typography,
   Stack,
   Skeleton,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CartProduct = ({ name, imgs, price, amount, id, removeItem }) => {
   const [imgLoad, setImgLoad] = useState(false);
   const [isItemDeleted, setIsItemDeleted] = useState(false);

   return (
      <Stack
         direction="row"
         spacing={2}
         sx={{ position: 'relative' }}
         // className={isItemDeleted ? 'animate__animated animate__zoomOut' : null}
      >
         <Link to={`/products/${id}`}>
            <img
               src={imgs[0]}
               alt={name}
               style={{
                  display: imgLoad ? null : 'none',
                  height: '140px',
                  width: '140px',
                  animationDuration: '0.5s',
               }}
               onLoad={() => setImgLoad(true)}
               className="animate__animated animate__fadeIn"
            />

            {imgLoad ? null : (
               <Skeleton
                  variant="rounded"
                  width={140}
                  height={140}
                  animation="wave"
                  style={{ borderRadius: '3px' }}
               />
            )}
         </Link>
         <Stack>
            <Typography variant="h6">${price}</Typography>
            <Link to={`/products/${id}`}>
               <Typography variant="body1" sx={{color: '#000'}}>{name}</Typography>
            </Link>

            <SelectAmount amount={amount} />
         </Stack>
         <CloseIcon
            sx={{
               fontSize: '28px',
               position: 'absolute',
               top: 0,
               right: 0,
               cursor: 'pointer',
            }}
            onClick={() => removeItem(id, setIsItemDeleted)}
         />
      </Stack>
   );
};

function SelectAmount({ amount }) {
   const [qty, setQty] = useState(amount);

   const handleChange = (event) => {
      setQty(event.target.value);
   };

   return (
      <FormControl size="small" style={{ width: '70px', margin: 'auto 0 0 0' }}>
         <InputLabel id="demo-select-small">Qty</InputLabel>
         <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={qty}
            label="Qty"
            onChange={handleChange}
         >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
               <MenuItem key={item} value={item}>
                  {item}
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   );
}

export default CartProduct;
