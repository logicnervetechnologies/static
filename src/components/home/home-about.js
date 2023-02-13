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
                We level the playing field by providing biotech startups with the infrastructure to develop and manage their devices, 
                while simultaneously allowing patients&apos; data to easily uploaded and viewed by medical providers.
We believe that unifying patients&apos; medical data through a single application will ultimately lead to better patient care.
Therefore, our goal is to become the primary platform to develop and deploy medical devices. 
              </Typography>
            </div>
          </Grid>
          {/* <Grid
            item
            md={6}
            sm={8}
            xs={12}
            sx={{
              order: {
                xs: 1,
                md: 2
              }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                pt: 'calc(960 / 1225 * 100%)',
                '& img': {
                  height: 'auto',
                  position: 'absolute',
                  top: 0,
                  width: '100%'
                }
              }}
            >
              <img
                alt="For developers"
                src={`https://diversido.io/wp-content/uploads/2022/08/fitness-watch.png`}
              />
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
};
