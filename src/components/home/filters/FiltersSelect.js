import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FiltersSelect = ({ name, options }) => {
   const [value, setValue] = useState('');

   const handleChange = (event) => {
      setValue(event.target.value);
   };

   return (
      <Box sx={{ minWidth: 170 }} key={name} className="flex">
         <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ top: '-8px' }}>
               {name}
            </InputLabel>
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={value}
               label={name}
               onChange={handleChange}
            >
               {options.map((option, i) => (
                  <MenuItem value={option} key={i}>
                     {option}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </Box>
   );
};

export default FiltersSelect;
