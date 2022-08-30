import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
} from './CustomAccordionItems';

import { Stack, Typography, TextField, Button } from '@mui/material';

import { setFilterPrice } from '../../../slices/filtersSlice';

const FiltersAccordionPrice = ({ name, type }) => {
   const { filterPrice } = useSelector((state) => state.filters);

   const [expanded, setExpanded] = useState(name);
   const [values, setValues] = useState({ from: 0, to: 0 });

   const dispatch = useDispatch();

   // useEffect(() => {
   //    const newChecked = [];

   //    activeFilters.forEach((filter) => {
   //       newChecked.push(filter.name);
   //    });

   //    setChecked(newChecked);
   // }, [activeFilters]);

   const handleSubmit = () => {
      if (values.from === filterPrice.from && values.to === filterPrice.to) {
         return;
      }

      dispatch(setFilterPrice(values));
   };

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   return (
      <Accordion expanded={expanded === name} onChange={handleChange(name)}>
         <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            sx={{ minHeight: '35px', height: '35px', width: '300px' }}
         >
            <Typography sx={{ fontWeight: 700 }}>{name}</Typography>
         </AccordionSummary>
         <AccordionDetails sx={{ padding: '10px 0 0 25px' }}>
            <Stack direction="row" sx={{ width: '300px' }} spacing={0.5}>
               <TextField
                  label="form"
                  id="outlined-size-small"
                  size="small"
                  type="number"
                  sx={{ width: '130px' }}
                  onChange={(event) => {
                     const value = +event.target.value;

                     if (value >= 0) {
                        setValues((state) => ({
                           ...state,
                           from: value,
                        }));
                     }
                  }}
               />
               <TextField
                  label="to"
                  id="outlined-size-small"
                  size="small"
                  type="number"
                  sx={{ width: '130px' }}
                  onChange={(event) => {
                     const value = +event.target.value;

                     if (value >= 0) {
                        setValues((state) => ({
                           ...state,
                           to: value,
                        }));
                     }
                  }}
               />
            </Stack>
            <Button
               variant="contained"
               size="small"
               sx={{ width: '265px', marginTop: '10px' }}
               onClick={handleSubmit}
            >
               submit
            </Button>
         </AccordionDetails>
      </Accordion>
   );
};

export default FiltersAccordionPrice;
