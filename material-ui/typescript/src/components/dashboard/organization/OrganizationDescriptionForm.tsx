import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@material-ui/core';

interface OrganizationDescriptionFormProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const paymentMethods = [
  {
    label: 'Credit/Debit Card',
    value: 'card'
  },
  {
    label: 'PayPal',
    value: 'paypal'
  }
];

const OrganizationDescriptionForm: FC<OrganizationDescriptionFormProps> = (props) => {
  const { onBack, onComplete, ...other } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      // NOTE: Make API request

      if (onComplete) {
        onComplete();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      {...other}
    >
      <Card sx={{ p: 3 }}>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          Please fill out payment information for this organization.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            mt: 6
          }}
        >
          {/* <Box
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        > */}
          <Box
            sx={{
              alignItems: 'center',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              display: 'flex',
              height: 40,
              justifyContent: 'center',
              width: 40
            }}
          >
            <Typography
              color="textPrimary"
              sx={{ fontWeight: 'fontWeightBold' }}
              variant="h6"
            >
              1
            </Typography>
          </Box>
          <Typography
            color="textPrimary"
            sx={{ ml: 2 }}
            variant="h6"
          >
            Billing Address
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              sm={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Street Address"
                name="address"
              />
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Street Line 2 (optional)"
                name="optionalAddress"
              />
            </Grid>
            <Grid
              item
              sm={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="State"
                name="state"
              />
            </Grid>
            <Grid
              item
              sm={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Zip"
                name="zip"
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            mt: 6
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 20,
              display: 'flex',
              height: 40,
              justifyContent: 'center',
              width: 40
            }}
          >
            <Typography
              color="textPrimary"
              sx={{ fontWeight: 'fontWeightBold' }}
              variant="h6"
            >
              2
            </Typography>
          </Box>
          <Typography
            color="textPrimary"
            sx={{ ml: 2 }}
            variant="h6"
          >
            Payment Method
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <RadioGroup
            name="paymentMethod"
            sx={{ flexDirection: 'row' }}
          >
            {paymentMethods.map((paymentMethod) => (
              <FormControlLabel
                control={(
                  <Radio
                    color="primary"
                    sx={{ ml: 1 }}
                  />
                )}
                key={paymentMethod.value}
                label={(
                  <Typography
                    color="textPrimary"
                    variant="body1"
                  >
                    {paymentMethod.label}
                  </Typography>
                )}
                value={paymentMethod.value}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              sm={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Name on Card"
                name="cardOwner"
              />
            </Grid>
            <Grid
              item
              sm={6}
            />
            <Grid
              item
              sm={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
              />
            </Grid>
            <Grid
              item
              sm={6}
            />
            <Grid
              item
              sm={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Expire Date"
                name="cardExpirationDate"
                placeholder="MM/YY"
              />
            </Grid>
            <Grid
              item
              sm={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Security Code"
                name="cardSecurityCode"
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ m: 2 }} />
        <Box
          sx={{
            display: 'flex'
          }}
        >
          {onBack && (
            <Button
              color="primary"
              onClick={onBack}
              size="large"
              variant="text"
            >
              Previous
            </Button>
          )}
          <Button
            color="primary"
            disabled={isSubmitting}
            sx={{
              justifyContent: 'flex-end'
            }}
            type="submit"
            variant="contained"
          >
            Complete
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        {/* </Box> */}
      </Card>
    </form>
  );
};

OrganizationDescriptionForm.propTypes = {
  onBack: PropTypes.func,
  onComplete: PropTypes.func
};

export default OrganizationDescriptionForm;
