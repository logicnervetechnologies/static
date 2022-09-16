import { useEffect } from 'react';
import Head from 'next/head';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { ContactForm } from '../components/contact/contact-form';
import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
import { Mail as MailIcon } from '../icons/mail';
import { gtm } from '../lib/gtm';
import NextLink from 'next/link';

const Contact = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Contact | Logic Nerve
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(2, 1fr)',
            xs: 'repeat(1, 1fr)'
          },
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.default',
            py: 8
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pl: {
                lg: 15
              }
            }}
          >
            <NextLink
              href="/dashboard"
              passHref
            >
              <Button
                component="a"
                startIcon={<ArrowLeftIcon fontSize="small" />}
              >
                Dashboard
              </Button>
            </NextLink>
            <Typography
              variant="h3"
              sx={{ mt: 3 }}
            >
              Contact
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                mb: 6,
                mt: 8
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  mr: 2
                }}
                variant="rounded"
              >
                <MailIcon fontSize="small" />
              </Avatar>
              <Typography variant="overline">
                Contact sales
              </Typography>
            </Box>
            <Typography variant="h1">
              Talk to our account expert
            </Typography>
            <Typography
              sx={{ py: 3 }}
              variant="body1"
            >
              Have questions about using our product, integrating our APIs, or using a device on our network? Fill out the form
              and one of our experts will get in touch with you.
            </Typography>
            <Typography
              sx={{ color: 'primary.main' }}
              variant="h6"
            >
              Join 3,000+ forward-thinking companies:
            </Typography>
            <Box sx={{ pt: 2 }}>
              <img
                alt="logoipsum1"
                src="/static/contact/contact_logos.svg"
                style={{ maxWidth: '100%' }}
              />
            </Box>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            px: 6,
            py: 15
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15
              }
            }}
          >
            <Typography
              sx={{ pb: 3 }}
              variant="h6"
            >
              Fill the form below
            </Typography>
            <ContactForm />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Contact;