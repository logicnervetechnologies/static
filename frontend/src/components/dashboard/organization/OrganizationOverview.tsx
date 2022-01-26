import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import type { Organization } from '../../../types/organization';
import OrganizationBrief from './OrganizationBrief';

interface OverviewProps {
  organization: Organization;
}

const OrganizationOverview: FC<OverviewProps> = (props) => {
  const { organization, ...other } = props;
  const ownerUid = organization.owner[0];
  const uidObject = organization.uidMap[ownerUid];
  const { fName, lName } = uidObject;

  return (
    <Grid
      container
      spacing={3}
      {...other}
    >
      <Grid
        item
        lg={8}
        xl={9}
        xs={12}
      >
        <OrganizationBrief
          title={organization.orgName}
          description={organization.address}
          owner={`${fName} ${lName}`}
        />
      </Grid>
    </Grid>
  );
};

OrganizationOverview.propTypes = {
  // @ts-ignore
  organization: PropTypes.object.isRequired
};

export default OrganizationOverview;
