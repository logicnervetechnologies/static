import { Box, Card, Container, Grid, Link, Typography } from '@mui/material';

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
      Core Competencies
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
            HIPAA & SOC 2 Compliant
          </Typography>
          <Typography
            sx={{
              color: 'textPrimary',
              py: 2
            }}
            variant="body2"
          >
            Private and Secure
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
            Business focused
          </Typography>
          <Typography
            sx={{
              color: 'textPrimary',
              py: 2
            }}
            variant="body2"
          >
            Allows business to focus on their innovations without having to spend resources managing the deployment of their devices
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
            Patient data transparency
          </Typography>
          <Typography
            sx={{
              color: 'textPrimary',
              py: 2
            }}
            variant="body2"
          >
            Allows patients and healthcare providers to easily view their data
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
            Low Code
          </Typography>
          <Typography
            sx={{
              color: 'textPrimary',
              py: 2
            }}
            variant="body2"
          >
            Easy for developers to use
          </Typography>
        </Card>
      </Grid>
    </Grid>
  </Container>
</Box>
);
