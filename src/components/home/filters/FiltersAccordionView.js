import {
   Typography,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Checkbox,
} from '@mui/material';

import { Accordion, AccordionDetails, AccordionSummary } from './CustomAccordionItems';

const FiltersAccordionView = ({
   name,
   listItems,
   expanded,
   checked,
   handleToggle,
   handleChange,
}) => {
   return (
      <Accordion expanded={expanded === name} onChange={handleChange(name)}>
         <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            sx={{ minHeight: '35px', height: '35px', width: '300px' }}
         >
            <Typography sx={{ fontWeight: 700 }}>{name}</Typography>
         </AccordionSummary>
         <AccordionDetails sx={{ padding: '0 0 0 16px' }}>
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
         </AccordionDetails>
      </Accordion>
   );
};

export default FiltersAccordionView;
