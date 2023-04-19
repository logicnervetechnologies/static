import NextLink from 'next/link';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const HomeAbout = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        py: 15
      }}
      {...props}>
      <Container maxWidth="lg">
        <Grid
          alignItems="center"
          container
          justifyContent="center"
          spacing={3}
        >
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              order: {
                xs: 2,
                md: 1
              }
            }}
          >
            <div>
              <Typography variant="h3">
                What do we do?
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ my: 3 }}
                variant="subtitle1"
              >
                Invici automates the invoice process for businesses by leveraging existing AI tools to collect data from invoices and generating the remaining data necessary for businesses to properly advertise their products online.
              </Typography>
            </div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};
