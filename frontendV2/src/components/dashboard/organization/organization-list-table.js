import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';

export const OrganizationListTable = (props) => {
  const {
    organizations,
    organizationsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);

  // Reset selected organizations when organizations change
  useEffect(() => {
      if (selectedOrganizations.length) {
        setSelectedOrganizations([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [organizations]);

  const handleSelectAllOrganizations = (event) => {
    setSelectedOrganizations(event.target.checked
      ? organizations.map((organization) => organization.id)
      : []);
  };

  const handleSelectOneOrganization = (event, organizationId) => {
    if (!selectedOrganizations.includes(organizationId)) {
      setSelectedOrganizations((prevSelected) => [...prevSelected, organizationId]);
    } else {
      setSelectedOrganizations((prevSelected) => prevSelected.filter((id) => id !== organizationId));
    }
  };

  const enableBulkActions = selectedOrganizations.length > 0;
  const selectedSomeOrganizations = selectedOrganizations.length > 0
    && selectedOrganizations.length < organizations.length;
  const selectedAllOrganizations = selectedOrganizations.length === organizations.length;

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.mode === 'dark'
            ? 'neutral.800'
            : 'neutral.100',
          display: enableBulkActions ? 'block' : 'none',
          px: 2,
          py: 0.5
        }}
      >
        <Checkbox
          checked={selectedAllOrganizations}
          indeterminate={selectedSomeOrganizations}
          onChange={handleSelectAllOrganizations}
        />
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Delete
        </Button>
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllOrganizations}
                  indeterminate={selectedSomeOrganizations}
                  onChange={handleSelectAllOrganizations}
                />
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Location
              </TableCell>
              <TableCell>
                Orders
              </TableCell>
              <TableCell>
                Spent
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.map((organization) => {
              const isOrganizationSelected = selectedOrganizations.includes(organization.id);

              return (
                <TableRow
                  hover
                  key={organization.id}
                  selected={isOrganizationSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isOrganizationSelected}
                      onChange={(event) => handleSelectOneOrganization(event, organization.id)}
                      value={isOrganizationSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href="/dashboard/organizations/1"
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {organization.orgName}
                          </Link>
                        </NextLink>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {organization.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${organization.city}, ${organization.state}, ${organization.country}`}
                  </TableCell>
                  <TableCell>
                    {organization.totalOrders}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      {numeral(organization.totalAmountSpent).format(`${organization.currency}0,0.00`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href="/dashboard/organizations/1/edit"
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href="/dashboard/organizations/1"
                      passHref
                    >
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={organizationsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

OrganizationListTable.propTypes = {
  organizations: PropTypes.array.isRequired,
  organizationsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
