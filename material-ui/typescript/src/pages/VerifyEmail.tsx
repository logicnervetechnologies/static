import type { FC } from 'react';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Container, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import gtm from '../lib/gtm';
import firebase from '../lib/firebase';
import useAuth from '../hooks/useAuth';

const VerifyEmail: FC = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const auth = useAuth();

  const verifyEmail = (event) => {
    event.preventDefault();
    firebase.auth().currentUser.sendEmailVerification();
  };

  const refreshToLogin = () => {
    auth.logout();
    window.location.reload();
  };

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Error: Verify Your Email | Logic Nerve</title>
      </Helmet>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          minHeight: '100%',
          px: 3,
          py: '80px'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            align="center"
            color="textPrimary"
            variant={mobileDevice ? 'h4' : 'h1'}
          >
            Please verify your email.
          </Typography>
          <Typography
            align="center"
            color="textSecondary"
            sx={{ mt: 2 }}
            variant="subtitle2"
          >
            A link was sent to you by our firebase service integration. Clicking
            on such link will verify your email and allow you to access this service. Once you have verified your email,
            come back to this page and click &apos;I Verified My Email&apos; or refresh this page.
            Click on the &apos;Resend Email Verification&apos; button below if you would like to resend your email verification link.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 1,
            }}
          >
            <Button
              color="primary"
              variant="outlined"
              onClick={verifyEmail}
              sx={{
                m: 1
              }}
            >
              Resend Email Verification
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={refreshToLogin}
              sx={{
                m: 1
              }}
            >
              I Verified My Email
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={auth.logout}
              sx={{
                m: 1
              }}
            >
              Logout
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 1
            }}
          >
            <Box
              alt="Under development"
              component="img"
              src={`/static/error/error401_${theme.palette.mode}.svg`}
              sx={{
                height: 'auto',
                maxWidth: '100%',
                width: 400
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 0.5
            }}
          >
            <Button
              color="primary"
              component={RouterLink}
              to="/"
              variant="outlined"
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default VerifyEmail;
