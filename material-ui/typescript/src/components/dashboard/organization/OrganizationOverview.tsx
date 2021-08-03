import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Grid } from '@material-ui/core';
import type { Organization } from '../../../types/organization';
import OrganizationBrief from './OrganizationBrief';

interface OverviewProps {
  organization: Organization;
}

const OrganizationOverview: FC<OverviewProps> = (props) => {
  const { organization, ...other } = props;
  const test = ['tag1', 'tag2'];
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
          tags={test}
          description="example"
        />
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              Admins:
              <br />
              {organization.admins.map((admin) => admin)}
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              mb: -1,
              mt: 2,
              mx: -1
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        lg={4}
        xl={3}
        xs={12}
      >
        <h3>TestFiller</h3>
        {/* <ProjectMetadata
          authorAvatar={project.author.avatar}
          authorName={project.author.name}
          budget={project.budget}
          currency={project.currency}
          endDate={project.endDate}
          updatedAt={project.updatedAt}
        />
        <Box sx={{ mt: 3 }}>
          <ProjectMembers members={project.members} />
        </Box> */}
      </Grid>
    </Grid>
  );
};

OrganizationOverview.propTypes = {
  // @ts-ignore
  organization: PropTypes.object.isRequired
};

export default OrganizationOverview;
