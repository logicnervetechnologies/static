// import { useState } from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import valid from 'card-validator';
// import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import {
  Box,
  Button,
  Card,
  Grid,
  // Switch,
  TextField
  // Typography
} from '@material-ui/core';
// import PlusIcon from '../../../icons/Plus';
import axios from 'axios';
import { userDataService } from '../../../contexts/LNurl';

axios.defaults.withCredentials = true;

interface OrganizationDetailsProps {
  onBack?: () => void;
  onNext?: () => void;
}

const OrganizationDetailsForm: FC<OrganizationDetailsProps> = (props) => {
  const { onBack, onNext, ...other } = props;

  return (
    <Formik
      initialValues={{
        orgName: '',
        city: '',
        state_region: '',
        country: '',
        streetAddress1: '',
        streetAddress2: '',
        phoneNumber: '',
        billingAddress: '',
        cardOwner: '',
        cardNumber: '',
        cardExpirationDate: '',
        cardSecurityCode: '',
        cardPostalCode: '',
        submit: null
      }}
      validationSchema={
        Yup
          .object()
          .shape({
            orgName: Yup
              .string()
              .min(3, 'Must be at least 3 characters')
              .max(255)
              .required('Required'),
            city: Yup
              .string()
              .min(1, 'Must be at least 1 character')
              .max(255)
              .required('Required'),
            state_region: Yup
              .string()
              .min(3, 'Must be at least 3 characters')
              .max(255)
              .required('Required'),
            country: Yup
              .string()
              .min(3, 'Must be at least 3 characters')
              .max(255)
              .required('Required'),
            streetAddress1: Yup
              .string()
              .min(3, 'Must be at least 3 characters')
              .max(255)
              .required('Required, if no address applicable, put \'N/A\' or \'NA\' '),
            streetAddress2: Yup
              .string()
              .max(255),
            phoneNumber: Yup
              .string()
              .min(3, 'Must be at least 3 characters')
              .max(255)
              .required('Required'),
            billingAddress: Yup
              .string()
              .min(3, 'Please enter billing street address')
              .max(255),
            cardOwner: Yup
              .string()
              .min(3, 'Please enter billing street address')
              .required('Please enter full name on card'),
            cardNumber: Yup
              .string()
              .test('test-number', // this is used internally by yup
                'Credit Card number is invalid', // validation message
                (value) => valid.number(value).isValid) // return true false based on validation
              .required(),
            cardExpirationDate: Yup
              .string()
              .test('test-number', // this is used internally by yup
                'Credit Card expiration date is invalid', // validation message
                (value) => valid.expirationDate(value).isValid) // return true false based on validation
              .required(),
            cardSecurityCode: Yup
              .string()
              .test('test-number', // this is used internally by yup
                'Credit Card security code is invalid', // validation message
                (value) => valid.cvv(value).isValid) // return true false based on validation
              .required(),
            cardPostalCode: Yup
              .string()
              .test('test-number', // this is used internally by yup
                'Credit Card postal code is invalid', // validation message
                (value) => valid.postalCode(value).isValid) // return true false based on validation
              .required()
          })
      }
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }): Promise<void> => {
        console.log('Entered finish');
        try {
          // Call API to store step data in server session
          console.log(values);
          const response = await axios.post(userDataService('createOrganization'), values);
          console.log(response);
          // It is important to have it on server to be able to reuse it if user
          // decides to continue later.
          setStatus({ success: true });
          setSubmitting(false);
          if (onNext) {
            onNext();
          }
        } catch (err) {
          console.error(err);
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
        // setFieldValue,
        // setFieldTouched,
        touched,
        values
      }): JSX.Element => (
        <form
          onSubmit={handleSubmit}
          {...other}
        >
          <Card sx={{ p: 3 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(touched.orgName && errors.orgName)}
                  fullWidth
                  helperText={touched.orgName && errors.orgName}
                  label="Organization Name"
                  name="orgName"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.orgName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  error={Boolean(touched.country && errors.country)}
                  helperText={touched.country && errors.country}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.country}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="State/Region"
                  name="state_region"
                  error={Boolean(touched.state_region && errors.state_region)}
                  helperText={touched.state_region && errors.state_region}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.state_region}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(touched.city && errors.city)}
                  fullWidth
                  helperText={touched.city && errors.city}
                  label="City Name"
                  name="city"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Address 1"
                  name="streetAddress1"
                  error={Boolean(touched.streetAddress1 && errors.streetAddress1)}
                  helperText={touched.streetAddress1 && errors.streetAddress1}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.streetAddress1}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Address 2"
                  name="streetAddress2"
                  error={Boolean(touched.streetAddress2 && errors.streetAddress2)}
                  helperText={touched.streetAddress2 && errors.streetAddress2}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.streetAddress2}
                  placeholder="Unit #2"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Phone number"
                  name="phoneNumber"
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid
              mt={6}
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Billing Address"
                  name="billingAddress"
                  error={Boolean(touched.billingAddress && errors.billingAddress)}
                  helperText={touched.billingAddress && errors.billingAddress}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.billingAddress}
                  variant="outlined"
                  placeholder="123 Banana Drive, Raleigh, NC"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Card Owner"
                  name="cardOwner"
                  error={Boolean(touched.cardOwner && errors.cardOwner)}
                  helperText={touched.cardOwner && errors.cardOwner}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cardOwner}
                  variant="outlined"
                  placeholder="Winston Churchill"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  error={Boolean(touched.cardNumber && errors.cardNumber)}
                  helperText={touched.cardNumber && errors.cardNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cardNumber}
                  variant="outlined"
                  placeholder="XXXXXXXXXXXXXXXX"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Card Expiration Date"
                  name="cardExpirationDate"
                  error={Boolean(touched.cardExpirationDate && errors.cardExpirationDate)}
                  helperText={touched.cardExpirationDate && errors.cardExpirationDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cardExpirationDate}
                  variant="outlined"
                  placeholder="MM/YY"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Security Code"
                  name="cardSecurityCode"
                  error={Boolean(touched.cardSecurityCode && errors.cardSecurityCode)}
                  helperText={touched.cardSecurityCode && errors.cardSecurityCode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cardSecurityCode}
                  variant="outlined"
                  placeholder="XXX or XXXX"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Postal Code"
                  name="cardPostalCode"
                  error={Boolean(touched.cardPostalCode && errors.cardPostalCode)}
                  helperText={touched.cardPostalCode && errors.cardPostalCode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cardPostalCode}
                  variant="outlined"
                  placeholder="XXXXX"
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              {onBack && (
                <Button
                  color="primary"
                  onClick={onBack}
                  size="large"
                  variant="text"
                >
                  Previous
                </Button>
              )}
              <Button
                color="primary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Next
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

OrganizationDetailsForm.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func
};

export default OrganizationDetailsForm;
