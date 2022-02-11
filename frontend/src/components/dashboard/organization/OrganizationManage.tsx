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
  Table,
  TableBody,
  TableCell,
  TableHead,
  // TablePagination,
  TableRow,
  // Tabs,
  // TextField,
  // Typography
} from '@material-ui/core';
// import ArrowRightIcon from '../../../icons/ArrowRight';
// import PencilAltIcon from '../../../icons/PencilAlt';
// import SearchIcon from '../../../icons/Search';
import type { Organization } from '../../../types/organization';
import type { User } from '../../../types/user';
import type { Customer } from '../../../types/customer';
// import getInitials from '../../../utils/getInitials';
// import Scrollbar from '../../Scrollbar';
import OrganizationMemberListTable from './OrganizationMemberListTable';

interface OrganizationManageProps {
  organization: Organization;
  user: User;
  members: Customer[];
}

const OrganizationManage: FC<OrganizationManageProps> = (props) => {
  const { organization, user, members, ...other } = props;

  const adminTable = (
    <Card {...other}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Admins
            </TableCell>
          </TableRow>
        </TableHead>
        <CardContent>
          <TableBody>
            {organization.admins.map((admin) => (
              <TableRow
                hover
                key={admin}
              >
                {admin}
              </TableRow>
            ))}
          </TableBody>
        </CardContent>
      </Table>
    </Card>
  );

  const rolesTable = (
    organization.roles.map((entry) => (
      <>
        <Card {...other}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {entry.role}
                </TableCell>
              </TableRow>
            </TableHead>
            <CardContent>
              <TableBody>
                {entry.users.map((roleUser) => (
                  <TableRow
                    hover
                    key={roleUser}
                  >
                    {roleUser}
                  </TableRow>
                ))}
              </TableBody>
            </CardContent>
          </Table>
        </Card>
        <br />
      </>
    ))
  );

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
        {adminTable}
        <br />
        {rolesTable}
        <br />
        <OrganizationMemberListTable members={members} showActions />

      </Grid>
    </Grid>
  );
};

OrganizationManage.propTypes = {
  // @ts-ignore
  organization: PropTypes.object.isRequired,
  user: PropTypes.any.isRequired,
  members: PropTypes.array.isRequired
};

export default OrganizationManage;
