import ViewModuleIcon from '@mui/icons-material/ViewModule';
import GridViewIcon from '@mui/icons-material/GridView';

import { useDispatch, useSelector } from 'react-redux';
import { setProductsItemMode } from '../../../slices/filtersSlice';

const ChangeCardsModeSwitch = () => {
   const { productsItemMode } = useSelector((state) => state.filters);
   const dispatch = useDispatch();

   return (
      <div
         className="flex"
         style={{
            background: '#EBF2FF',
            borderRadius: '4px',
            alignItems: 'center',
         }}
      >
         <GridViewIcon
            style={{
               padding: '0 15px',
               cursor: 'pointer',
               height: '100%',
               borderRadius: '4px',
               background: productsItemMode === 'big' ? '#fff' : null,
               boxShadow:
                  productsItemMode === 'big'
                     ? '0px 1px 2px rgba(27, 78, 163, 0.24), 0px 2px 4px rgba(41, 121, 255, 0.24)'
                     : null,
               transition: '0.3s',
            }}
            onClick={() => dispatch(setProductsItemMode('big'))}
         />
         <ViewModuleIcon
            style={{
               padding: '0 15px',
               cursor: 'pointer',
               height: '100%',
               borderRadius: '4px',
               background: productsItemMode === 'small' ? '#fff' : null,
               boxShadow:
                  productsItemMode === 'small'
                     ? '0px 1px 2px rgba(27, 78, 163, 0.24), 0px 2px 4px rgba(41, 121, 255, 0.24)'
                     : null,
               transition: '0.3s',
            }}
            onClick={() => dispatch(setProductsItemMode('small'))}
         />
      </div>
   );
};

export default ChangeCardsModeSwitch;
