import NextLink from 'next/link';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const HomeDevelopers = (props) => {
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
            sm={8}
            xs={12}
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
                src={`/developers_${theme.palette.mode}.png`}
              />
            </Box>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <div>
              <Typography variant="h3">
                For Developers
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ my: 3 }}
                variant="subtitle1"
              >
                Allows developers to build on top of our platform to develop their own devices and
                makes analytics easy to understand by visualizing data, showing logs, and giving insights
                into device utilization.
              </Typography>
              {/* <NextLink
                href="/browse"
                passHref
              >
                <Button
                  size="large"
                  component="a"
                  variant="contained"
                >
                  Browse Components
                </Button>
              </NextLink> */}
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
