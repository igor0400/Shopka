import { useDispatch } from 'react-redux';
import { userSignUp } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';

const SignUp = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   return (
      <Container maxWidth="xl">
         <h1>SignUp</h1>
         <button
            onClick={() =>
               userSignUp(dispatch, navigate, {
                  email: 'ulan.08060806@gmail.com',
                  password: '12355555',
               })
            }
         >
            Sign up
         </button>
      </Container>
   );
};

export default SignUp;
