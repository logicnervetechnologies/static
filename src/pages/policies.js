import { useEffect } from 'react';
import Head from 'next/head';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { ContactForm } from '../components/contact/contact-form';
import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
import { Mail as MailIcon } from '../icons/mail';
import { gtm } from '../lib/gtm';
import NextLink from 'next/link';

const Policies = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Privacy and Cookie Policy | Logic Nerve
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
              href="/"
              passHref
            >
              <Button
                component="a"
                startIcon={<ArrowLeftIcon fontSize="small" />}
              >
                Home
              </Button>
            </NextLink>
            <Typography
              variant="h6"
              sx={{ mt: 2,
                    pb: 3 }}
            >
              Privacy Policy
            </Typography>
            <Typography
              sx={{ py: 3 }}
              variant="body1"
            >
            At LogicNerve, we take security around protected health information seriously. We will never use or disclose PHI without the express written consent of the individual. We will also ensure that all PHI is accurate and complete before it is used or disclosed. We will carefully monitor all PHI and take any necessary steps to protect it from unauthorized access, use, or disclosure. We will also maintain all records containing PHI for as long as required by law.
            <br/> <br/>
            We are also committed to providing a secure environment for PHI. We will use appropriate physical, administrative, and technical safeguards to protect PHI from unauthorized access and use. All employees and contractors who handle PHI will be trained on HIPAA regulations and will follow all applicable laws and regulations.
            <br/><br/>
            We will regularly review our policies and procedures to ensure compliance with HIPAA regulations. We will also periodically audit our internal processes and procedures to confirm that we are in compliance with the law. If any violations of HIPAA regulations occur, we will take immediate steps to rectify the situation and prevent similar violations in the future.
            <br/><br/>
            We are committed to providing our customers with the highest quality of service and to protecting their privacy. We strive to ensure that our customers&apos; confidential information is always kept secure and confidential.
            </Typography>
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
              Cookie Policy
            </Typography>
            <Typography
              sx={{ py: 3 }}
              variant="body1"
            >
At LogicNerve, we take the privacy of our customers seriously. We use cookies on our website to provide a better user experience and to improve our services. Our cookies are used to collect anonymous information about how our customers use our website and to help us improve our services. We do not use cookies to track or collect any personally identifiable information.
<br/><br/>
We may also use third-party services to track the performance of our website and to provide additional services. These third-party services may place cookies on our customers&apos; computers and we do not have control over these cookies.
<br/><br/>
We will never sell or rent any of our customers&apos; personal information to any third parties. We also do not store any credit card information on our website.
<br/><br/>
We will always strive to ensure that our website is secure and that our customers&apos; data is always kept safe. We regularly review our security measures and update them as needed to protect our customers&apos; data. Additionally, we will delete any cookies from our website upon request.
<br/><br/>
If you have any questions or concerns about our cookie policy, please contact us.
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Policies;
