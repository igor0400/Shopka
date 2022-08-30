import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { styled } from '@mui/material/styles';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

export const Accordion = styled((props) => (
   <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
   '&:before': {
      display: 'none',
   },
}));

export const AccordionSummary = styled((props) => (
   <MuiAccordionSummary
      expandIcon={
         <ArrowForwardIosSharpIcon
            sx={{ fontSize: '0.9rem', color: '#76A9FF' }}
         />
      }
      {...props}
   />
))(({ theme }) => ({
   '& .MuiAccordionSummary-expandIconWrapper': {
      transform: 'rotate(90deg)',
   },
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(270deg)',
   },
   '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
   },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
   padding: theme.spacing(2),
}));
