import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardHeader, Divider, useMediaQuery } from '@mui/material';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';

export const SchematicParameters = (props) => {
  const { parameters } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
    <Card {...props}>
      <CardHeader title="Parameters" />
      <Divider />
      <PropertyList>
        {console.log("parameters")}
        {console.log(Object.keys(parameters))}
        {Object.keys(parameters).map(param => {
         return(
         <PropertyListItem
            align={align}
            divider
            label={param}
            value={parameters[param]}
          />)
        })}
      </PropertyList>
      <Divider />
      <CardActions
        sx={{
          flexWrap: 'wrap',
          px: 3,
          py: 2,
          m: -1
        }}
      >
        {/* <Button
          sx={{ m: 1 }}
          variant="outlined"
        >
          Create Invoice
        </Button>
        <Button sx={{ m: 1 }}>
          Resend Due Invoices
        </Button> */}
      </CardActions>
    </Card>
  );
};

SchematicParameters.propTypes = {
  parameters: PropTypes.object
};
