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
import { useMounted } from '../../../hooks/use-mounted';
import { Plus as PlusIcon } from '../../../icons/plus';
import { Search as SearchIcon } from '../../../icons/search';
import { gtm } from '../../../lib/gtm';
import { useAuth } from '../../../hooks/use-auth';
import { dsiApi } from '../../../__real-api__/dsiApi';
import { SchematicListTable } from '../../../components/dashboard/schematic/schematic-list-table';
import { TestDeploymentsListTable } from '../../../components/dashboard/testDeployments/test-deployments-list-table';

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
    const properties = ['dsid'];
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
  const queryRef = useRef(null);
  const [organizations, setOrganizations] = useState([]);
  const [filteredTestDeployments, setFilteredTD] = useState([])
  const [sortedTestDeployments, setSortedTD] = useState([])
  const [paginatedTestDeployments, setPaginatedTD] = useState([])
  const [testDeployments, setTDs] = useState([]);
  const [selectOrg, setSelectOrg] = useState(organizations[0] || " ");
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [table, setTable] = useState(<TestDeploymentsListTable
    tds={paginatedTestDeployments}
    tdsCount={filteredTestDeployments.length}
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

  const getTDs = useCallback(async () => {
    try {
      // const data = await organizationApi.getOrganizations();
      const res = await udsApi.getMyUserData();
      console.log('data')
      console.log(res)
      var tds = []
      if (res != null && 'testDsids' in res.data) tds = res.data['testDsids']
      if (isMounted()) {
        setTDs(tds);

        let f = filters
        f.query = queryRef.current?.value
        setFilters(f);
        const fS = applyFilters(tds, f)
        console.log(filters)
        setFilteredTD(fS);
        console.log("s:")
        console.log(fS)
        const sS = applySort(fS, sort)
        setSortedTD(sS);
        console.log(sortedTestDeployments)
        const pS = applyPagination(sS, page, rowsPerPage)
        setPaginatedTD(pS);
        handleTableChange(pS, fS)
        // setTable(<TestDeploymentsListTable
        //   tds={paginatedTestDeployments}
        //   tdsCount={filteredTestDeployments.length}
        //   onPageChange={handlePageChange}
        //   onRowsPerPageChange={handleRowsPerPageChange}
        //   rowsPerPage={rowsPerPage}
        //   page={page}
        // />)

        console.log(tds)
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);


  useEffect(() => {
      getTDs();
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
    const fS = applyFilters(testDeployments, f)
    console.log(filters)
    setFilteredTD(fS);
    console.log("s:")
    console.log(fS)
    const sS = applySort(fS, sort)
    setSortedTD(sS);
    console.log(sortedTestDeployments)
    const pS = applyPagination(sS, page, rowsPerPage)
    setPaginatedTD(pS);
    handleTableChange(pS, fS)
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleTableChange = (pTDS, fTDS) =>{
    setTable(<TestDeploymentsListTable
      tds={pTDS}
      tdsCount={fTDS.length}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowsPerPage={rowsPerPage}
      page={page}
    />);
  }

  const handleSelectOrgChange = async (event) => {
    setSelectOrg(event.target.value);
    console.log(event)
    const data = await dsiApi.getSchemasOrg(event.target.value);
    setTDs(data)
    console.log("filters")
    const fS = applyFilters(data, filters)
    setFilteredTD(fS);
    console.log("s:")
    console.log(testDeployments)
    const sS = applySort(fS, sort)
    setSortedTD(sS);
    console.log(sortedTestDeployments)
    const pS = applyPagination(sS, page, rowsPerPage)
    setPaginatedTD(pS);
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
          Test Deployments List
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
                  Test Deployments
                </Typography>
              </Grid>
            </Grid>

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
                  placeholder="Search Test Deployments"
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
