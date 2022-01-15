import type { FC, FormEvent } from 'react';
import {
  Box,
  Button,
  Grid,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

const ContactForm: FC = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Full Name *
          </Typography>
          <TextField
            fullWidth
            name="name"
            required
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Company Name*
          </Typography>
          <TextField
            fullWidth
            name="company"
            required
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Work Email *
          </Typography>
          <TextField
            fullWidth
            name="email"
            type="email"
            required
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Phone Number *
          </Typography>
          <TextField
            fullWidth
            name="phone"
            required
            type="tel"
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Company Size
          </Typography>
          <Select
            fullWidth
            variant="outlined"
          >
            <MenuItem value="1-10">1-10</MenuItem>
            <MenuItem value="11-30">11-30</MenuItem>
            <MenuItem value="31-50">31-50</MenuItem>
            <MenuItem value="50+">50+</MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Team
          </Typography>
          <Select
            fullWidth
            variant="outlined"
          >
            <MenuItem value="medical_practitioner">Medical Practitioner</MenuItem>
            <MenuItem value="health_bio_researcher">Health/Bio Researcher</MenuItem>
            <MenuItem value="volunteer">Volunteer Healthcare Provider</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Practice Revenue *
          </Typography>
          <Select
            fullWidth
            required
            variant="outlined"
          >
            <MenuItem value={0}>$0+</MenuItem>
            <MenuItem value={1000}>$1,000+</MenuItem>
            <MenuItem value={20000}>$20,000+</MenuItem>
            <MenuItem value={50000}>$50,000+</MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Message
          </Typography>
          <TextField
            fullWidth
            name="message"
            required
            multiline
            rows={6}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3
        }}
      >
        <Button
          color="primary"
          fullWidth
          size="large"
          variant="contained"
        >
          Let&apos;s Talk
        </Button>
      </Box>
      <Typography
        color="textSecondary"
        sx={{ mt: 3 }}
        variant="body2"
      >
        By submitting this, you agree to the
        {' '}
        <Link
          color="textPrimary"
          href="#"
          underline="always"
          variant="subtitle2"
        >
          Privacy Policy
        </Link>
        {' '}
        and
        {' '}
        <Link
          color="textPrimary"
          href="#"
          underline="always"
          variant="subtitle2"
        >
          Cookie Policy
        </Link>
        .
      </Typography>
    </form>
  );
};

export default ContactForm;
