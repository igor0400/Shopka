import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
   Button,
   Divider,
   FormHelperText,
   Grid,
   Link,
   IconButton,
   InputAdornment,
   InputLabel,
   OutlinedInput,
   Stack,
   Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import { userLogin } from '../../../firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const AuthLogin = () => {
   const [showPassword, setShowPassword] = useState(false);
   const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   const fromPage = location.state?.from?.pathname || '/';

   return (
      <Formik
         initialValues={{
            email: '',
            password: '',
            submit: null,
         }}
         validationSchema={Yup.object().shape({
            email: Yup.string()
               .email('Must be a valid email')
               .max(255)
               .required('Email is required'),
            password: Yup.string().max(255).required('Password is required'),
         })}
         onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
               userLogin(dispatch, navigate, values, fromPage);
               setStatus({ success: false });
               setSubmitting(false);
            } catch (err) {
               setStatus({ success: false });
               setErrors({ submit: err.message });
               setSubmitting(false);
            }
         }}
      >
         {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
         }) => (
            <form noValidate onSubmit={handleSubmit}>
               <Grid container spacing={3}>
                  <Grid item xs={12}>
                     <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">
                           Email Address
                        </InputLabel>
                        <OutlinedInput
                           id="email-login"
                           type="email"
                           value={values.email}
                           name="email"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           placeholder="Enter email address"
                           fullWidth
                           error={Boolean(touched.email && errors.email)}
                        />
                        {touched.email && errors.email && (
                           <FormHelperText
                              error
                              id="standard-weight-helper-text-email-login"
                           >
                              {errors.email}
                           </FormHelperText>
                        )}
                     </Stack>
                  </Grid>
                  <Grid item xs={12}>
                     <Stack spacing={1}>
                        <InputLabel htmlFor="password-login">
                           Password
                        </InputLabel>
                        <OutlinedInput
                           fullWidth
                           error={Boolean(touched.password && errors.password)}
                           id="-password-login"
                           type={showPassword ? 'text' : 'password'}
                           value={values.password}
                           name="password"
                           onBlur={handleBlur}
                           onChange={handleChange}
                           endAdornment={
                              <InputAdornment position="end">
                                 <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="large"
                                 >
                                    {showPassword ? (
                                       <EyeOutlined />
                                    ) : (
                                       <EyeInvisibleOutlined />
                                    )}
                                 </IconButton>
                              </InputAdornment>
                           }
                           placeholder="Enter password"
                        />
                        {touched.password && errors.password && (
                           <FormHelperText
                              error
                              id="standard-weight-helper-text-password-login"
                           >
                              {errors.password}
                           </FormHelperText>
                        )}
                     </Stack>
                  </Grid>

                  <Grid item xs={12} sx={{ mt: -1, textAlign: 'right' }}>
                     <Link
                        variant="h6"
                        component={RouterLink}
                        to=""
                        color="text.primary"
                     >
                        Forgot Password?
                     </Link>
                  </Grid>
                  {errors.submit && (
                     <Grid item xs={12}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                     </Grid>
                  )}
                  <Grid item xs={12}>
                     <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                     >
                        Login
                     </Button>
                  </Grid>
                  <Grid item xs={12}>
                     <Divider>
                        <Typography variant="caption"> Login with</Typography>
                     </Divider>
                  </Grid>
                  <Grid item xs={12}>
                     <FirebaseSocial fromPage={fromPage} />
                  </Grid>
               </Grid>
            </form>
         )}
      </Formik>
   );
};

export default AuthLogin;
