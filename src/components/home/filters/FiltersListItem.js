import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

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

const FiltersListItem = ({ name, items }) => {
   const [expanded, setExpanded] = useState('panel1');
   const [checked, setChecked] = useState([0]);

   const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
   };

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

   return (
      <Accordion expanded={expanded === name} onChange={handleChange(name)}>
         <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            sx={{ minHeight: '35px', height: '35px' }}
         >
            <Typography>{name}</Typography>
         </AccordionSummary>
         <AccordionDetails sx={{padding: '0 0 0 16px'}}>
            {items.map((value) => {
               const labelId = `checkbox-list-label-${value.name}`;

               if (value.type === 'accordion') {
                  return <FiltersListItem {...value} key={value.name} />;
               } else {
                  return (
                     <ListItem key={value.name} disablePadding>
                        <ListItemButton
                           role={undefined}
                           onClick={handleToggle(value.name)}
                           dense
                           sx={{
                              py: 0,
                              minHeight: 32,
                           }}
                        >
                           <ListItemIcon sx={{ minWidth: '20px' }}>
                              <Checkbox
                                 edge="start"
                                 checked={checked.indexOf(value.name) !== -1}
                                 tabIndex={-1}
                                 disableRipple
                                 inputProps={{
                                    'aria-labelledby': labelId,
                                 }}
                              />
                           </ListItemIcon>
                           <ListItemText id={labelId} primary={value.name} />
                        </ListItemButton>
                     </ListItem>
                  );
               }
            })}
         </AccordionDetails>
      </Accordion>
   );
};

export default FiltersListItem;
