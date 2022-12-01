import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardHeader, Divider, useMediaQuery } from '@mui/material';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';

export const SchematicBasicDetails = (props) => {
  const { schemaId, orgId, author, type, parameters, ...other } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <Divider />
      <PropertyList>
        <PropertyListItem
          align={align}
          divider
          label="Schematic Name"
          value={type}
        />
        <PropertyListItem
          align={align}
          divider
          label="Organization"
          value={orgId}
        />
        <PropertyListItem
          align={align}
          divider
          label="Author"
          value={author}
        />
      </PropertyList>
      <CardActions
        sx={{
          flexWrap: 'wrap',
          px: 3,
          py: 2,
          m: -1
        }}
      >
        <Button
          sx={{ m: 1 }}
          variant="outlined"
        >
          Reset &amp; Send Password
        </Button>
        <Button sx={{ m: 1 }}>
          Login as Customer
        </Button>
      </CardActions>
    </Card>
  );
};

SchematicBasicDetails.propTypes = {
  schemaId: PropTypes.string,
  orgId: PropTypes.string,
  author: PropTypes.string,
  type: PropTypes.string,
  parameters: PropTypes.array
};
