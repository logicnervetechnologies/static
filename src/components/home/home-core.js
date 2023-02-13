import { Box, Button, Card, Container, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';

export const HomeCore = (props) => (
<Box
  sx={{
    backgroundColor: 'background.paper',
    py: 15
  }}
  {...props}>
  <Container maxWidth="lg">
    <Typography
      align="center"
      sx={{ pb: 6 }}
      variant="h3"
    >
      Our Strengths
    </Typography>
    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        md={6}
        xs={12}
      >
        <Card
          sx={{
            height: '100%',
            p: 3,
            position: 'relative'
          }}
          variant="outlined"
        >
          <Typography
            sx={{ color: 'textPrimary' }}
            variant="h5"
          >
            Private & Secure
          </Typography>
          <Typography
            sx={{
              color: 'textPrimary',
              py: 2
            }}
            variant="body2"
          >
            We ensure products we publicaly release are HIPAA and SOC 2 Compliant. 
            Patients and providers can take comfort in the fact their data isn't publicly accessible. 
          </Typography>
        </Card>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <Card
          sx={{
            height: '100%',
            p: 3,
            position: 'relative'
          }}
          variant="outlined"
        >
          <Typography
            sx={{ color: 'textPrimary' }}
            variant="h5"
          >
            Business-Centric
          </Typography>
          <Typography
            sx={{
              color: 'textPrimary',
              py: 2
            }}
            variant="body2"
          >
            Focus on your innovations. Don't worry about spending valuable time and resources on cloud infrastructure, compliance requirements, and software interfaces for handling the data. 
            We&apos;ll handle that for you. 
          </Typography>
        </Card>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <Card
          sx={{
            height: '100%',
            p: 3,
            position: 'relative'
          }}
          variant="outlined"
        >
          <Typography
            sx={{ color: 'textPrimary' }}
            variant="h5"
          >
            Patient Data Transparency
          </Typography>
          <Typography
            sx={{
              color: 'textPrimary',
              py: 2
            }}
            variant="body2"
          >
            Patients can easily log in and view the data collected about them in an easily digestible manner. 
          </Typography>
        </Card>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <Card
          sx={{
            height: '100%',
            p: 3,
            position: 'relative'
          }}
          variant="outlined"
        >
          <Typography
            sx={{ color: 'textPrimary' }}
            variant="h5"
          >
            Low-Code
          </Typography>
          <Typography
            sx={{
              color: 'textPrimary',
              py: 2
            }}
            variant="body2"
          >
            Don&apos;t have much coding experience? Don&apos;t worry, we&apos;re all about making it easy for developers
            to interface their devices with our platform. 
          </Typography>
        </Card>
      </Grid>
    </Grid>
  </Container>
  <Container maxWidth='lg'>
  <Grid
        item
        md={6}
        xs={12}
        spacing={3}
        mt={4}
      >
        <Card
          sx={{
            height: '100%',
            p: 3,
            position: 'relative'
          }}
          variant="outlined"
        >
          <Typography
            sx={{ color: 'textPrimary' }}
            variant="h5"
          >
            Contact Us
          </Typography>
          <Typography
            sx={{
              color: 'textPrimary',
              py: 2
            }}
            variant="body2"
          >
            We're currently under development, but if you want to be on the waitlist for this technology, reach out and contact us!  

          </Typography>
          <NextLink
              href="/contact"
              passHref
              ml={4}
            >
              <Button
                component="a"
                size="small"
                variant="contained"
              >
                Contact Us
              </Button>
            </NextLink>
        </Card>
      </Grid>
  </Container>
</Box>
);
