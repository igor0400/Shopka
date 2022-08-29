import {
   Typography,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Checkbox,
} from '@mui/material';

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { styled } from '@mui/material/styles';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

const Accordion = styled((props) => (
   <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
   '&:before': {
      display: 'none',
   },
}));

const AccordionSummary = styled((props) => (
   <MuiAccordionSummary
      expandIcon={
         <ArrowForwardIosSharpIcon
            sx={{ fontSize: '0.9rem', color: '#76A9FF' }}
         />
      }
      {...props}
   />
))(({ theme }) => ({
   flexDirection: 'row-reverse',
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
   },
   '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
   },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
   padding: theme.spacing(2),
}));

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
            sx={{ minHeight: '35px', height: '35px' }}
         >
            <Typography sx={{fontWeight: 700}}>{name}</Typography>
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
