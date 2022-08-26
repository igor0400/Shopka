import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Navigate, useLocation, Link as RouterLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

// material-ui
import {
   Button,
   FormHelperText,
   Grid,
   InputLabel,
   OutlinedInput,
   Stack,
   Typography,
   Container,
   Checkbox,
   Box,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

const PayOrderPage = () => {
   const [paymentChacked, setPaymentChacked] = useState('sistem')
   const { userAuth } = useSelector((state) => state.user);

   const location = useLocation();

   if (!userAuth || location.state?.from?.pathname !== '/cart') {
      return <Navigate to="/" />;
   }

   const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

   return (
      <Container maxWidth="sm">
         <Typography
            variant="h5"
            sx={{ fontWeight: '700', textAlign: 'center' }}
         >
            Pay order
         </Typography>
         <Formik
            initialValues={{
               firstName: '',
               lastName: '',
               phone: '',
               address: '',
               city: '',
               country: '',
               postCode: '',
               submit: null,
            }}
            validationSchema={Yup.object().shape({
               firstName: Yup.string()
                  .max(30)
                  .required('First name is required'),
               lastName: Yup.string().max(30).required('Last name is required'),
               phone: Yup.string()
                  .matches(phoneRegExp, 'Phone number is not valid')
                  .required('Phone number is required'),
               address: Yup.string().max(255).required('Address is required'),
               city: Yup.string().max(50).required('City is required'),
               country: Yup.string().max(50).required('Country is required'),
               postCode: Yup.number().min(6).required('Post code is required'),
            })}
            onSubmit={async (
               values,
               { setErrors, setStatus, setSubmitting }
            ) => {
               try {
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
                           <InputLabel htmlFor="firstName-login">
                              First name
                           </InputLabel>
                           <OutlinedInput
                              id="firstName-login"
                              type="firstName"
                              value={values.firstName}
                              name="firstName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Enter first name"
                              fullWidth
                              error={Boolean(
                                 touched.firstName && errors.firstName
                              )}
                           />
                           {touched.firstName && errors.firstName && (
                              <FormHelperText
                                 error
                                 id="standard-weight-helper-text-firstName-login"
                              >
                                 {errors.firstName}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>

                     <Grid item xs={12}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="lastName-login">
                              Last name
                           </InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(
                                 touched.lastName && errors.lastName
                              )}
                              id="-lastName-login"
                              type={'text'}
                              value={values.lastName}
                              name="lastName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Enter last name"
                           />
                           {touched.lastName && errors.lastName && (
                              <FormHelperText
                                 error
                                 id="standard-weight-helper-text-lastName-login"
                              >
                                 {errors.lastName}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>

                     <Grid item xs={12}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="phone-login">Phone</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.phone && errors.phone)}
                              id="-phone-login"
                              type={'number'}
                              value={values.phone}
                              name="phone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Enter phone"
                           />
                           {touched.phone && errors.phone && (
                              <FormHelperText
                                 error
                                 id="standard-weight-helper-text-phone-login"
                              >
                                 {errors.phone}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>

                     <Grid item xs={12}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="address-login">
                              Address
                           </InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.address && errors.address)}
                              id="-address-login"
                              type={'text'}
                              value={values.address}
                              name="address"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Enter address"
                           />
                           {touched.address && errors.address && (
                              <FormHelperText
                                 error
                                 id="standard-weight-helper-text-address-login"
                              >
                                 {errors.address}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>

                     <Grid item xs={12}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="city-login">City</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.city && errors.city)}
                              id="-city-login"
                              type={'text'}
                              value={values.city}
                              name="city"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Enter city"
                           />
                           {touched.city && errors.city && (
                              <FormHelperText
                                 error
                                 id="standard-weight-helper-text-city-login"
                              >
                                 {errors.city}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>

                     <Grid item xs={12}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="country-login">
                              Country
                           </InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.country && errors.country)}
                              id="-country-login"
                              type={'text'}
                              value={values.country}
                              name="country"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Enter country"
                           />
                           {touched.country && errors.country && (
                              <FormHelperText
                                 error
                                 id="standard-weight-helper-text-country-login"
                              >
                                 {errors.country}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>

                     <Grid item xs={12}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="postCode-login">
                              Post code
                           </InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(
                                 touched.postCode && errors.postCode
                              )}
                              id="-postCode-login"
                              type={'number'}
                              value={values.postCode}
                              name="postCode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Enter post code"
                           />
                           {touched.postCode && errors.postCode && (
                              <FormHelperText
                                 error
                                 id="standard-weight-helper-text-postCode-login"
                              >
                                 {errors.postCode}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>

                     <Grid item xs={12}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="paymentMethod-login">
                              Choose payment method
                           </InputLabel>
                           <Grid
                              container
                              columns={9}
                              sx={{ justifyContent: 'space-between' }}
                           >
                              <Grid
                                 item
                                 xs={4}
                                 sx={{ background: '#D8E6FF' }}
                                 onClick={() => setPaymentChacked('sistem')}
                              >
                                 <Stack direction="row" spacing={1}>
                                    <Checkbox
                                       checked={paymentChacked === 'sistem'}
                                    />
                                    <Box>
                                       <Typography variant='body1' component='p'>Pay by Payment Systems</Typography>
                                       <Stack direction='row'>
                                          {/* сюда картинки систем */}
                                       </Stack>
                                    </Box>
                                 </Stack>
                              </Grid>
                              <Grid
                                 item
                                 xs={4}
                                 sx={{ background: '#D8E6FF' }}
                                 onClick={() => setPaymentChacked('card')}
                              >
                                 <Stack direction="row" spacing={1}>
                                    <Checkbox
                                       checked={paymentChacked === 'card'}
                                    />
                                    <Box>Pay by Credit Card</Box>
                                 </Stack>
                              </Grid>
                           </Grid>
                        </Stack>
                     </Grid>

                     {errors.submit && (
                        <Grid item xs={12}>
                           <FormHelperText error>
                              {errors.submit}
                           </FormHelperText>
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
                           Pay
                        </Button>
                     </Grid>
                  </Grid>
               </form>
            )}
         </Formik>
      </Container>
   );
};

export default PayOrderPage;
