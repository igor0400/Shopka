import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { filtersAccordionItems } from '../../../utils/settings';

const FiltersAccordion = () => {
   const [expanded, setExpanded] = useState(false);
   const [checked, setChecked] = useState([0]);

   const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
         newChecked.push(value);
      } else {
         newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
   };

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   return (
      <div style={{ width: '300px' }}>
         {filtersAccordionItems.map(({ name, listItems }) => (
            <Accordion
               expanded={expanded === name}
               onChange={handleChange(name)}
               key={name}
            >
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
               >
                  <Typography
                     sx={{ width: '33%', flexShrink: 0, whiteSpace: 'nowrap' }}
                  >
                     {name}
                  </Typography>
               </AccordionSummary>
               <AccordionDetails sx={{ padding: '0 16px 16px' }}>
                  <List sx={{ padding: '0 0 8px 0' }}>
                     {listItems.map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                           <ListItem key={value} disablePadding>
                              <ListItemButton
                                 role={undefined}
                                 onClick={handleToggle(value)}
                                 dense
                                 sx={{
                                    py: 0,
                                    minHeight: 32,
                                 }}
                              >
                                 <ListItemIcon sx={{ minWidth: '20px' }}>
                                    <Checkbox
                                       edge="start"
                                       checked={checked.indexOf(value) !== -1}
                                       tabIndex={-1}
                                       disableRipple
                                       inputProps={{
                                          'aria-labelledby': labelId,
                                       }}
                                    />
                                 </ListItemIcon>
                                 <ListItemText id={labelId} primary={value} />
                              </ListItemButton>
                           </ListItem>
                        );
                     })}
                  </List>
               </AccordionDetails>
            </Accordion>
         ))}
      </div>
   );
};

export default FiltersAccordion;
