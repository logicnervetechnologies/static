// import { useState } from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
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

interface OrganizationDetailsProps {
  onBack?: () => void;
  onNext?: () => void;
}

const OrganizationDetailsForm: FC<OrganizationDetailsProps> = (props) => {
  const { onBack, onNext, ...other } = props;

  return (
    <Formik
      initialValues={{
        fName: '',
        lName: '',
        submit: null
      }}
      validationSchema={
        Yup
          .object()
          .shape({
            fName: Yup
              .string()
              .min(1, 'Must be at least 1 character')
              .max(255)
              .required('Required'),
            lName: Yup
              .string()
              .min(1, 'Must be at least 1 character')
              .max(255)
              .required('Required'),
          })
      }
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }): Promise<void> => {
        try {
          // Call API to store step data in server session
          // It is important to have it on server to be able to reuse it if user
          // decides to continue later.
          axios.post('http://localhost:8000/createUserTmp', {
            fName: values.fName,
            lName: values.lName,
          }).then((result) => {
            if (result.status === 201) {
              window.location.reload();
            }
          });

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
                  error={Boolean(touched.fName && errors.fName)}
                  fullWidth
                  helperText={touched.fName && errors.fName}
                  label="First Name"
                  name="fName"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fName}
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
                  label="Last Name"
                  name="lName"
                  error={Boolean(touched.lName && errors.lName)}
                  helperText={touched.lName && errors.lName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lName}
                  variant="outlined"
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
