import { useState } from 'react';
import type { ChangeEvent, FC, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Divider,
  InputAdornment,
  Link,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core';
import SearchIcon from '../../../icons/Search';
import type { Customer } from '../../../types/customer';
import getInitials from '../../../utils/getInitials';
import Scrollbar from '../../Scrollbar';

interface OrganizationMemberListTableProps {
  members: Customer[];
}

const tabs = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Admins',
    value: 'hasAcceptedMarketing'
  },
  {
    label: 'Medical Providers',
    value: 'isProspect'
  },
  {
    label: 'Has Clients',
    value: 'isReturning'
  }
];

const applyFilters = (
  members: Customer[],
  query: string,
  filters: any
): Customer[] => members
  .filter((member) => {
    let matches = true;

    if (query) {
      const properties = ['email', 'name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (member[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && member[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });

const applyPagination = (
  customers: Customer[],
  page: number,
  limit: number
): Customer[] => customers
  .slice(page * limit, page * limit + limit);

const OrganizationMemberListTable: FC<OrganizationMemberListTableProps> = (props) => {
  const { members: customers, ...other } = props;
  const [currentTab, setCurrentTab] = useState<string>('all');
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<any>({
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null
  });

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    const updatedFilters = {
      ...filters,
      hasAcceptedMarketing: null,
      isProspect: null,
      isReturning: null
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  const filteredCustomers = applyFilters(customers, query, filters);
  const paginatedCustomers = applyPagination(filteredCustomers, page, limit);
  return (
    <Card {...other}>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          m: -1,
          p: 2
        }}
      >
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 500
          }}
        >
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            onChange={handleQueryChange}
            placeholder="Search Members"
            value={query}
            variant="outlined"
          />
        </Box>
      </Box>
      <Scrollbar>
        <Box sx={{ minWidth: 700 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell align="right">
                  Roles
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <Link
                          color="inherit"
                          component={RouterLink}
                          to="/dashboard/customers/1"
                          variant="subtitle2"
                        >
                          {customer.name}
                        </Link>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {customer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    TODO
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={filteredCustomers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Card>
  );
};

OrganizationMemberListTable.propTypes = {
  members: PropTypes.array.isRequired
};

export default OrganizationMemberListTable;
