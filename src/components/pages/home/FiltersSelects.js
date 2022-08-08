import FiltersSelect from './Select';

const FiltersSelects = () => {
   const items = [
      {
         name: 'Sort by',
         options: ['Useless first', 'Uselees last', 'Something'],
      },
      {
         name: 'Condition',
         options: ['Useless first', 'Uselees last', 'Something'],
      },
      {
         name: 'Delivery options',
         options: ['Useless first', 'Uselees last', 'Something'],
      },
   ];

   return (
      <div style={{display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr 1fr'}}>
         {items.map((item, i) => (
            <FiltersSelect {...item} key={i} />
         ))}
      </div>
   );
};

export default FiltersSelects;
