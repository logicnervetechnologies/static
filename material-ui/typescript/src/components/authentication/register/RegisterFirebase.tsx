import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import useMounted from '../../../hooks/useMounted';

// function equalTo(ref: any, msg: any) {
//   return Yup.mixed().test({
//     name: 'equalTo',
//     exclusive: false,
//     message: msg || 'Passwords must be the same',
//     params: {
//       reference: ref.path,
//     },
//     test: (value) => value === this.resolve(ref)
//   });
// }

// Yup.addMethod(Yup.string, 'equalTo', equalTo);

const RegisterFirebase: FC = (props) => {
  const mounted = useMounted();
  const { createUserWithEmailAndPassword } = useAuth() as any;
  // signInWithGoogle
  /*
  const handleGoogleClick = async (): Promise<void> => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };
  */

  return (
    <>
      {/*
      <Button
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        sx={{
          backgroundColor: 'common.white',
          color: 'common.black',
          '&:hover': {
            backgroundColor: 'common.white',
            color: 'common.black'
          }
        }}
        variant="contained"
      >
        <Box
          alt="Google"
          component="img"
          src="/static/icons/google.svg"
          sx={{ mr: 1 }}
        />
        Google
      </Button>
      */}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mt: 0
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Divider orientation="horizontal" />
        </Box>
        <Typography
          color="textSecondary"
          sx={{ m: 2 }}
          variant="body1"
        >
          Create Account
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Divider orientation="horizontal" />
        </Box>
      </Box>
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordVerify: '',
          policy: false,
          submit: null
        }}
        validationSchema={
          Yup
            .object()
            .shape({
              email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup
                .string()
                .min(7)
                .max(255)
                .required('Password is required'),
              passwordVerify: Yup
                .string()
                .min(7)
                .max(255)
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
              policy: Yup
                .boolean()
                .oneOf([true], 'You must agree to the Logic Nerve terms of agreement to create an account.')
            })
        }
        onSubmit={async (values, {
          setErrors,
          setStatus,
          setSubmitting
        }): Promise<void> => {
          try {
            if (values.password !== values.passwordVerify) {
              setStatus({ success: false });
              setSubmitting(false);
              setErrors({ submit: 'Passwords must match' });
            }
            await createUserWithEmailAndPassword(values.email, values.password)
              .then((result) => {
                result.user.sendEmailVerification();
              });

            if (mounted.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (mounted.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
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
          values
        }): JSX.Element => (
          <form
            noValidate
            onSubmit={handleSubmit}
            {...props}
          >
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.passwordVerify && errors.passwordVerify)}
              fullWidth
              helperText={touched.passwordVerify && errors.passwordVerify}
              label="Verify Password"
              margin="normal"
              name="passwordVerify"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.passwordVerify}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1,
                mt: 2
              }}
            >
              <Checkbox
                checked={values.policy}
                color="primary"
                name="policy"
                onChange={handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                I have read the
                {' '}
                <Link
                  color="primary"
                  component="a"
                  href="#"
                >
                  Terms and Conditions
                </Link>
              </Typography>
            </Box>
            {Boolean(touched.policy && errors.policy) && (
              <FormHelperText error>
                {errors.policy}
              </FormHelperText>
            )}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegisterFirebase;
