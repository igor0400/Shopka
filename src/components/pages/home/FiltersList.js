import React from 'react';
import FiltersListItem from './FiltersListItem';

const items = [
   {
      type: 'accordion',
      name: 'Electronics',
      items: [
         {
            type: 'accordion',
            name: 'Cell Phones & Smartphones',
            items: [
               {
                  type: 'item',
                  name: 'Cell Phone Accessories',
               },
               {
                  type: 'item',
                  name: 'Cell Phone Gatgets',
               },
               {
                  type: 'accordion',
                  name: 'New accordion',
                  items: [
                     {
                        type: 'item',
                        name: 'Cell Phone Accessories',
                     },
                     {
                        type: 'item',
                        name: 'Cell Phone Gatgets',
                     },
                     {
                        type: 'item',
                        name: 'Applications',
                     },
                     {
                        type: 'item',
                        name: 'Smart Watches',
                     },
                  ],
               },
               {
                  type: 'item',
                  name: 'Applications',
               },
               {
                  type: 'item',
                  name: 'Smart Watches',
               },
            ],
         },
         {
            type: 'item',
            name: 'Iphones',
         },
         {
            type: 'item',
            name: 'Androids',
         },
      ],
   },
   {
      type: 'accordion',
      name: 'Business & Industrial',
      items: [
         {
            type: 'item',
            name: 'Cell Phone Accessories',
         },
         {
            type: 'item',
            name: 'Cell Phone Gatgets',
         },
         {
            type: 'item',
            name: 'Applications',
         },
         {
            type: 'item',
            name: 'Smart Watches',
         },
      ],
   },
   {
      type: 'accordion',
      name: 'Computers',
      items: [
         {
            type: 'item',
            name: 'Cell Phone Accessories',
         },
         {
            type: 'item',
            name: 'Cell Phone Gatgets',
         },
         {
            type: 'item',
            name: 'Applications',
         },
         {
            type: 'item',
            name: 'Smart Watches',
         },
      ],
   },
   {
      type: 'accordion',
      name: 'Consumer Electroinics',
      items: [
         {
            type: 'item',
            name: 'Cell Phone Accessories',
         },
         {
            type: 'item',
            name: 'Cell Phone Gatgets',
         },
         {
            type: 'item',
            name: 'Applications',
         },
         {
            type: 'item',
            name: 'Smart Watches',
         },
      ],
   },
   {
      type: 'accordion',
      name: 'Home & Garden',
      items: [
         {
            type: 'item',
            name: 'Cell Phone Accessories',
         },
         {
            type: 'item',
            name: 'Cell Phone Gatgets',
         },
         {
            type: 'item',
            name: 'Applications',
         },
         {
            type: 'item',
            name: 'Smart Watches',
         },
      ],
   },
   {
      type: 'accordion',
      name: 'Collectibles',
      items: [
         {
            type: 'item',
            name: 'Cell Phone Accessories',
         },
         {
            type: 'item',
            name: 'Cell Phone Gatgets',
         },
         {
            type: 'item',
            name: 'Applications',
         },
         {
            type: 'item',
            name: 'Smart Watches',
         },
      ],
   },
];

const FiltersList = () => {
   return (
      <div style={{ width: '300px', paddingBottom: '30px' }}>
         {items.map((item, i) => (
            <React.Fragment key={i}>
               {item.type === 'accordion' ? (
                  <FiltersListItem {...item} />
               ) : null}
            </React.Fragment>
         ))}
      </div>
   );
};

export default FiltersList;
