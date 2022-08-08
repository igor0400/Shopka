import { styled } from '@mui/material/styles';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useState } from 'react';

const ChangeCardsModeSwitch = () => {
   const [active, setActive] = useState('grid');

   return (
      <div
         className="flex"
         style={{
            background: '#EBF2FF',
            borderRadius: '4px',
            alignItems: 'center',
         }}
      >
         <ViewListIcon
            style={{
               padding: '0 15px',
               cursor: 'pointer',
               height: '100%',
               borderRadius: '4px',
               background: active === 'list' ? '#fff' : null,
               boxShadow:
                  active === 'list'
                     ? '0px 1px 2px rgba(27, 78, 163, 0.24), 0px 2px 4px rgba(41, 121, 255, 0.24)'
                     : null,
            }}
            onClick={() => setActive('list')}
         />
         <ViewModuleIcon
            style={{
               padding: '0 15px',
               cursor: 'pointer',
               height: '100%',
               borderRadius: '4px',
               background: active === 'grid' ? '#fff' : null,
               boxShadow:
                  active === 'grid'
                     ? '0px 1px 2px rgba(27, 78, 163, 0.24), 0px 2px 4px rgba(41, 121, 255, 0.24)'
                     : null,
            }}
            onClick={() => setActive('grid')}
         />
      </div>
   );
};

export default ChangeCardsModeSwitch;
