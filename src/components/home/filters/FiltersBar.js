import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar } from 'swiper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { useDispatch, useSelector } from 'react-redux';
import { activeFilterBarChanged } from '../../../slices/filtersSlice';

import { filtersBarItems } from '../../../utils/settings';

const FiltersBarItem = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   color: 'gray',
   cursor: 'pointer',
}));

const FiltersBar = () => {
   const dispatch = useDispatch();
   const activeFilterBar = useSelector(
      (state) => state.filters.activeFilterBar
   );

   return (
      <Swiper
         slidesPerView={3}
         spaceBetween={0}
         freeMode={true}
         scrollbar={true}
         modules={[FreeMode, Scrollbar]}
         style={{ paddingBottom: 10 }}
         breakpoints={{
            1300: {
               slidesPerView: 9,
            },
            1020: {
               slidesPerView: 7,
            },
            800: {
               slidesPerView: 5,
            },
            412: {
               slidesPerView: 4,
            },
         }}
      >
         {filtersBarItems.map(({ name, icon }, i) => (
            <SwiperSlide
               key={i}
               onClick={() => {
                  dispatch(activeFilterBarChanged(name));
               }}
            >
               <FiltersBarItem
                  sx={{
                     fontSize: {
                        xs: '10px',
                        md: '16px',
                     },
                     color: activeFilterBar === name ? '#2264D1' : null,
                     transition: '0.3s',
                  }}
               >
                  {icon}
                  <p style={{ margin: '5px 0' }}>{name}</p>
               </FiltersBarItem>
            </SwiperSlide>
         ))}
      </Swiper>
   );
};

export default FiltersBar;
