import { Box, Button, Container, Fab, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { flexbox } from '@mui/system';
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
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <img
                alt="Our Mission"
                src={`/healthcare_graphic.png`}
                height='300'
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
              We solve the issue of inventory management through Automation and AI.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
