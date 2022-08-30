import FiltersSelect from './FiltersSelect';

import { useDispatch, useSelector } from 'react-redux';

import { setSortedBy } from '../../../slices/filtersSlice';

const FiltersSelects = () => {
   const { sortedBy } = useSelector((state) => state.filters);
   const dispatch = useDispatch();

   const items = [
      {
         name: 'Sort by',
         options: [
            {
               name: 'To lowest price',
               sortedFunc: () => dispatch(setSortedBy('To lowest price')),
            },
            {
               name: 'To highest price',
               sortedFunc: () => dispatch(setSortedBy('To highest price')),
            },
            {
               name: 'To lowest rating',
               sortedFunc: () => dispatch(setSortedBy('To lowest rating')),
            },
            {
               name: 'To highest rating',
               sortedFunc: () => dispatch(setSortedBy('To highest rating')),
            },
         ],
         defaultValue: sortedBy,
      },
   ];

   return (
      <div
         style={{
            display: 'grid',
            gap: '10px',
            gridTemplateColumns: '1fr 1fr 1fr',
         }}
      >
         {items.map((item, i) => (
            <FiltersSelect {...item} key={i} />
         ))}
      </div>
   );
};

export default FiltersSelects;
