import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar } from 'swiper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// icons
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AttractionsIcon from '@mui/icons-material/Attractions';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PetsIcon from '@mui/icons-material/Pets';
import FlatwareIcon from '@mui/icons-material/Flatware';
import ExploreIcon from '@mui/icons-material/Explore';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import BoltIcon from '@mui/icons-material/Bolt';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import ToysIcon from '@mui/icons-material/Toys';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

const FiltersBarItem = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   color: 'gray',
   cursor: 'pointer',
}));

const FiltersBar = () => {
   const items = [
      {
         name: 'Clothing & Shoes',
         icon: <CheckroomIcon />,
      },
      {
         name: 'Entertainment',
         icon: <AttractionsIcon />,
      },
      {
         name: 'Music',
         icon: <MusicNoteIcon />,
      },
      {
         name: 'Sport & Lifestyle',
         icon: <FitnessCenterIcon />,
      },
      {
         name: 'Pets',
         icon: <PetsIcon />,
      },
      {
         name: 'Kitchen Accessories',
         icon: <FlatwareIcon />,
      },
      {
         name: 'Travel Equipment',
         icon: <ExploreIcon />,
      },
      {
         name: 'Growing & Garden',
         icon: <LocalFloristIcon />,
      },
      {
         name: 'Electrical Tools',
         icon: <BoltIcon />,
      },
      {
         name: 'Mother Care',
         icon: <ChildFriendlyIcon />,
      },
      {
         name: 'Toys & Entertainment',
         icon: <ToysIcon />,
      },
      {
         name: 'Vintage',
         icon: <TwoWheelerIcon />,
      },
   ];

   return (
      <Swiper
         slidesPerView={3}
         spaceBetween={0}
         freeMode={true}
         scrollbar={true}
         modules={[FreeMode, Scrollbar]}
         style={{ paddingBottom: 10 }}
         breakpoints={{
            1275: {
               slidesPerView: 8,
            },
            800: {
               slidesPerView: 5,
            },
            412: {
               slidesPerView: 4,
            },
         }}
      >
         {items.map(({ name, icon }, i) => (
            <SwiperSlide key={i}>
               <FiltersBarItem sx={{ fontSize: { xs: '10px', md: '16px' } }}>
                  {icon}
                  <p style={{ margin: '5px 0' }}>{name}</p>
               </FiltersBarItem>
            </SwiperSlide>
         ))}
      </Swiper>
   );
};

export default FiltersBar;
