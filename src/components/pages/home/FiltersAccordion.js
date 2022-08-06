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

   const items = [
      {
         name: 'Collapsed filters',
         listItems: [
            'list item 1',
            'list item 2',
            'list item 3',
            'list item 4',
         ],
      },
      {
         name: 'Expanded Filters',
         listItems: [
            'Recommended',
            'Recently Added',
            'Expiring Soon',
            'Most Rated',
            'Price: Low → High',
            'Price: High → Low',
         ],
      },
      {
         name: 'Year of manufacturing',
         listItems: [
            '1954',
            '1955',
            '1956',
            '1957',
            '1958',
            '1959',
            '1960',
            '1961',
            '1962-2022',
         ],
      },
   ];

   return (
      <div style={{ width: '300px' }}>
         {items.map(({ name, listItems }) => (
            <Accordion
               expanded={expanded === name}
               onChange={handleChange(name)}
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
               <AccordionDetails>
                  <List>
                     {listItems.map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                           <ListItem key={value} disablePadding>
                              <ListItemButton
                                 role={undefined}
                                 onClick={handleToggle(value)}
                                 dense
                              >
                                 <ListItemIcon>
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
