import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';

export const HomeMission = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
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
          {/* <Grid
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
                alt="For designers"
                src={`/static/home/designers_${theme.palette.mode}.png`}
              />
            </Box>
          </Grid> */}
          <Grid
            item
            md={6}
            xs={12}
          >
            <Typography variant="h3">
              Our Mission
            </Typography>
            <Typography
              color="textSecondary"
              sx={{ my: 3 }}
              variant="subtitle1"
            >
              We want to solve the issue of patient data transparency in a world where smart-health devices are becoming increasingly prevalent.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
