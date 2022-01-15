import type { FC } from 'react';
import { useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Card, Container, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import FinishCreateUserForm from '../components/FinishCreateUserForm';
import gtm from '../lib/gtm';

const FinishCreatingUser: FC = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Finish Creating User | Logic Nerve</title>
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
            variant={mobileDevice ? 'h4' : 'h2'}
          >
            Finish Setting Up Your Account
          </Typography>
          <Box
            sx={{
              m: 2
            }}
          />
          <Card>
            <FinishCreateUserForm />
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default FinishCreatingUser;
