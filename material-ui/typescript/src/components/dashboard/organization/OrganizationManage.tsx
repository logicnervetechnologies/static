// import { useState } from 'react';
import type {
  // ChangeEvent,
  FC,
  // MouseEvent
} from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  // Avatar,
  // Box,
  // Button,
  Card,
  CardContent,
  // Checkbox,
  // Divider,
  // IconButton,
  // InputAdornment,
  Grid,
  // Link,
  // Tab,
  // Table,
  // TableBody,
  // TableCell,
  // TableHead,
  // TablePagination,
  // TableRow,
  // Tabs,
  // TextField,
  // Typography
} from '@material-ui/core';
// import ArrowRightIcon from '../../../icons/ArrowRight';
// import PencilAltIcon from '../../../icons/PencilAlt';
// import SearchIcon from '../../../icons/Search';
import type { Organization } from '../../../types/organization';
// import getInitials from '../../../utils/getInitials';
// import Scrollbar from '../../Scrollbar';

interface OrganizationManageProps {
  organization: Organization;
}

const OrganizationManage: FC<OrganizationManageProps> = (props) => {
  const { organization, ...other } = props;

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
        <Card {...other}>
          <CardContent>
            Admins:
            <br />
            Test
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

OrganizationManage.propTypes = {
  // @ts-ignore
  organization: PropTypes.object.isRequired
};

export default OrganizationManage;
