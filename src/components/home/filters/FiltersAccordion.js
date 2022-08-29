import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { postFilter, removeFilter } from '../../../utils/fliters';

import FiltersAccordionView from './FiltersAccordionView';

const FiltersAccordion = ({ name, listItems, type }) => {
   const { activeFilters } = useSelector((state) => state.filters);

   const [expanded, setExpanded] = useState(name);
   const [checked, setChecked] = useState([]);

   const dispatch = useDispatch();

   useEffect(() => {
      const newChecked = [];

      activeFilters.forEach((filter) => {
         newChecked.push(filter.name);
      });

      setChecked(newChecked);
   }, [activeFilters]);

   const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);

      if (currentIndex === -1) {
         postFilter(dispatch, { name: value, type });
      } else {
         removeFilter(dispatch, { name: value, type });
      }
   };

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   return (
      <FiltersAccordionView
         name={name}
         listItems={listItems}
         expanded={expanded}
         checked={checked}
         handleToggle={handleToggle}
         handleChange={handleChange}
      />
   );
};

export default FiltersAccordion;
