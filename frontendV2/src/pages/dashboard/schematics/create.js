import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
//import { organizationApi } from '../../../__fake-api__/organization-api';
import { OrganizationCreateWizard } from '../../../components/dashboard/organization/organization-create-wizard';
import { SchematicCreateWizard } from '../../../components/dashboard/schematic/schematic-create-wizard';
import { udsApi } from '../../../__real-api__/udsApi';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { OrganizationListTable } from '../../../components/dashboard/organization/organization-list-table';
import { useMounted } from '../../../hooks/use-mounted';
import { Download as DownloadIcon } from '../../../icons/download';
import { Plus as PlusIcon } from '../../../icons/plus';
import { Search as SearchIcon } from '../../../icons/search';
import { Upload as UploadIcon } from '../../../icons/upload';
import { gtm } from '../../../lib/gtm';
import { useAuth } from '../../../hooks/use-auth';

const tabs = [
  {
    label: 'All',
    value: 'all'
  }
  // {
  //   label: 'Accepts Marketing',
  //   value: 'hasAcceptedMarketing'
  // },
  // {
  //   label: 'Prospect',
  //   value: 'isProspect'
  // },
  // {
  //   label: 'Returning',
  //   value: 'isReturning'
  // }
];

const sortOptions = [
  {
    label: 'Last update (newest)',
    value: 'updatedAt|desc'
  },
  {
    label: 'Last update (oldest)',
    value: 'updatedAt|asc'
  },
  {
    label: 'Total orders (highest)',
    value: 'totalOrders|desc'
  },
  {
    label: 'Total orders (lowest)',
    value: 'totalOrders|asc'
  }
];

const applyFilters = (organizations, filters) => organizations.filter((org) => {
  console.log(org);
  if (filters.query) {
    let queryMatched = false;
    //const properties = ['email', 'name'];
    const properties = ['orgName'];
    properties.forEach((property) => {
      if ((org[property]).toLowerCase().includes(filters.query.toLowerCase())) {
        queryMatched = true;
      }
    });

    if (!queryMatched) {
      return false;
    }
  }

  if (filters.hasAcceptedMarketing && !org.hasAcceptedMarketing) {
    return false;
  }

  if (filters.isProspect && !org.isProspect) {
    return false;
  }

  if (filters.isReturning && !org.isReturning) {
    return false;
  }

  return true;
});

const descendingComparator = (a, b, sortBy) => {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

  if (b[sortBy] < a[sortBy]) {
    return -1;
  }

  if (b[sortBy] > a[sortBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (sortDir, sortBy) => (sortDir === 'desc'
  ? (a, b) => descendingComparator(a, b, sortBy)
  : (a, b) => -descendingComparator(a, b, sortBy));

const applySort = (organizations, sort) => {
  const [sortBy, sortDir] = sort.split('|');
  const comparator = getComparator(sortDir, sortBy);
  const stabilizedThis = organizations.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const applyPagination = (organizations, page, rowsPerPage) => organizations.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

const OrganizationCreate = () => {
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const [organizations, setOrganizations] = useState([]);
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    query: '',
    hasAcceptedMarketing: undefined,
    isProspect: undefined,
    isReturning: undefined
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const { user } = useAuth();

  const getOrganizations = useCallback(async () => {
    try {
      // const data = await organizationApi.getOrganizations();
      const data = await udsApi.getBasicOrganization(user.organizations);
      console.log(data)
      if (data == null) data = [];
      // const data2 = await udsApi.
      if (isMounted()) {
        setOrganizations(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getOrganizations();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value
    }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredOrganizations = applyFilters(organizations, filters);
  const sortedOrganizations = applySort(filteredOrganizations, sort);
  const paginatedOrganizations = applyPagination(sortedOrganizations, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Create Schematic
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  New Data Schematic
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Card>

            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                m: -1.5,
                p: 3
              }}
            >
                <SchematicCreateWizard />
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

OrganizationCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default OrganizationCreate;
