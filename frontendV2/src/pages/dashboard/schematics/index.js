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
import { dsiApi } from '../../../__real-api__/dsiApi';
import { SchematicListTable } from '../../../components/dashboard/schematic/schematic-list-table';

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

const applyFilters = (schematics, filters) => schematics.filter((schem) => {
  console.log(schem);

  if (filters.query) {
    let queryMatched = false;
    //const properties = ['email', 'name'];
    const properties = ['type'];
    properties.forEach((property) => {
      if ((schem[property]).toLowerCase().includes(filters.query.toLowerCase())) {
        queryMatched = true;
      }
    });

    if (!queryMatched) {
      return false;
    }
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

const OrganizationList = () => {
  const isMounted = useMounted();
  const isMounted2 = useMounted();
  const queryRef = useRef(null);
  const [organizations, setOrganizations] = useState([]);
  const [filteredSchematics, setFilteredSchematics] = useState([])
  const [sortedSchematics, setSortedSchematics] = useState([])
  const [paginatedSchematics, setPaginatedSchematics] = useState([])
  const [schematics, setSchematics] = useState([]);
  const [selectOrg, setSelectOrg] = useState(organizations[0] || " ");
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [table, setTable] = useState(<SchematicListTable
    schematics={paginatedSchematics}
    schematicsCount={filteredSchematics.length}
    onPageChange={handlePageChange}
    onRowsPerPageChange={handleRowsPerPageChange}
    rowsPerPage={rowsPerPage}
    page={page}
  />);
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
  const getSchematics = useCallback(async () => {
    try {
      // const data = await organizationApi.getOrganizations();
      if (isMounted) {
        const data = await dsiApi.getSchemasOrg(selectOrg);
        console.log(data)
        console.log(data)
        if (data == null) data = [];
        // const data2 = await udsApi.
        console.log(data)
        if (isMounted() && isMounted2()) {
          setSchematics(data);
        }
      }

    } catch (err) {
      console.error(err);
    }
  }, [isMounted2]);

  useEffect(() => {
      getOrganizations();
      getSchematics();
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
    let f = filters
    f.query = queryRef.current?.value
    setFilters(f);
    const fS = applyFilters(schematics, f)
    console.log(filters)
    setFilteredSchematics(fS);
    console.log("s:")
    console.log(fS)
    const sS = applySort(fS, sort)
    setSortedSchematics(sS);
    console.log(sortedSchematics)
    const pS = applyPagination(sS, page, rowsPerPage)
    setPaginatedSchematics(pS);
    handleTableChange(pS, fS)
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleTableChange = (pS, fS) =>{
    setTable(            <SchematicListTable
      schematics={pS}
      schematicsCount={fS.length}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowsPerPage={rowsPerPage}
      page={page}
    />)
  }

  const handleSelectOrgChange = async (event) => {
    setSelectOrg(event.target.value);
    console.log(event)
    const data = await dsiApi.getSchemasOrg(event.target.value);
    setSchematics(data)
    console.log("filters")
    const fS = applyFilters(data, filters)
    setFilteredSchematics(fS);
    console.log("s:")
    console.log(schematics)
    const sS = applySort(fS, sort)
    setSortedSchematics(sS);
    console.log(sortedSchematics)
    const pS = applyPagination(sS, page, rowsPerPage)
    setPaginatedSchematics(pS);
    handleTableChange(pS, fS)

    console.log(data)
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  // const filteredSchematics = applyFilters(schematics, filters);
  // const sortedSchematics = applySort(filteredSchematics, sort);
  // const paginatedSchematics = applyPagination(sortedSchematics, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Dashboard: Schematics List
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
                  Schematics
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                m: -1,
                mt: 3
              }}
            >
              <TextField
                label="Organization"
                name="sort"
                onChange={handleSelectOrgChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={selectOrg}
              >
                {organizations.map((org) => (
                  <option
                    key={org.orgId}
                    value={org.orgId}
                  >
                    {org.orgName}
                  </option>
                ))}
              </TextField>
              {/* <Button
                startIcon={<UploadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                Import
              </Button>
              <Button
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                Export
              </Button> */}

            </Box>
          </Box>
          <Card>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ px: 3 }}
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
                m: -1.5,
                p: 3
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search Schematics"
                />
              </Box>
              <TextField
                label="Sort By"
                name="sort"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={sort}
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>{
              table
            }
          </Card>
        </Container>
      </Box>
    </>
  );
};

OrganizationList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default OrganizationList;
