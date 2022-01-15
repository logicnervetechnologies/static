import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  FormHelperText,
  Paper,
  Radio,
  Typography
} from '@material-ui/core';

interface OrganizationOwnerFormProps {
  onNext?: () => void;
  onBack?: () => void;
}

const typeOptions = [
  {
    description: 'I\'m the owner/head of this organization.',
    title: 'I\'m the owner',
    value: 'organizationOwner'
  },
  {
    description: 'I\'m an administrator of the organization and am creating this on behalf of the owner.',
    title: 'I\'m an admin',
    value: 'organizationAdmin'
  },
  {
    description: 'I\'m creating this organiztion on behalf of my employer, but am not an administrator of the organization.',
    title: 'I\'m neither admin nor owner',
    value: 'affiliate'
  }
];

const OrganizationOwnerForm: FC<OrganizationOwnerFormProps> = (props) => {
  const { onBack, onNext, ...other } = props;
  const [type, setType] = useState<string>(typeOptions[0].value);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newType: string): void => {
    setType(newType);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      // NOTE: Make API request

      if (onNext) {
        onNext();
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
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
          Select profession
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          What role do you play in the structure of this organization?
        </Typography>
        <Box sx={{ mt: 2 }}>
          {typeOptions.map((typeOption) => (
            <Paper
              key={typeOption.value}
              sx={{
                alignItems: 'flex-start',
                display: 'flex',
                mb: 2,
                padding: 2
              }}
              variant="outlined"
            >
              <Radio
                checked={type === typeOption.value}
                color="primary"
                onClick={(): void => handleChange(typeOption.value)}
              />
              <Box sx={{ ml: 2 }}>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  {typeOption.title}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {typeOption.description}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
        {error && (
          <Box sx={{ mt: 2 }}>
            <FormHelperText error>
              {error}
            </FormHelperText>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            mt: 6
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
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="primary"
            disabled={isSubmitting}
            type="submit"
            variant="contained"
          >
            Next
          </Button>
        </Box>
      </Card>
    </form>
  );
};

OrganizationOwnerForm.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func
};

export default OrganizationOwnerForm;
