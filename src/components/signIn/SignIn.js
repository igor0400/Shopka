import { useDispatch } from 'react-redux';
import { userSignIn } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';

const SignIn = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   return (
      <Container maxWidth="xl">
         <h1>SignIn</h1>
         <button
            onClick={() =>
               userSignIn(dispatch, navigate, {
                  email: 'ulan.08060806@gmail.com',
                  password: '12355555',
               })
            }
         >
            sign in
         </button>
      </Container>
   );
};

export default SignIn;
