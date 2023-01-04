import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { customerApi } from '../../../../__fake-api__/customer-api';
import { udsApi } from '../../../../__real-api__/udsApi';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { OrganizationBasicDetails } from '../../../../components/dashboard/organization/organization-basic-details';
import { SchematicParameters } from '../../../../components/dashboard/schematic/schematic-parameters';
import { CustomerDataManagement } from '../../../../components/dashboard/customer/customer-data-management';
import { CustomerEmailsSummary } from '../../../../components/dashboard/customer/customer-emails-summary';
import { OrganizationMembers } from '../../../../components/dashboard/organization/organization-members';
import { CustomerPayment } from '../../../../components/dashboard/customer/customer-payment';
import { CustomerLogs } from '../../../../components/dashboard/customer/customer-logs';
import { useMounted } from '../../../../hooks/use-mounted';
import { ChevronDown as ChevronDownIcon } from '../../../../icons/chevron-down';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { dsiApi } from '../../../../__real-api__/dsiApi';
import { SchematicBasicDetails } from '../../../../components/dashboard/schematic/schematic-basic-details';

const tabs = [
  { label: 'Details', value: 'details' },
  // { label: 'Members', value: 'members' },
  // { label: 'Logs', value: 'logs' }
];

const SchematicDetails = () => {
  const isMounted = useMounted();
  const [schematic, setSchematic] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');
  const splithref = window.location.href.split('/');
  const schematicId = splithref[splithref.length - 1];
  console.log(schematicId)
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getSchematic = useCallback(async () => {
    try {
      //const data = await customerApi.getCustomer();
      const data = await dsiApi.getSchema(schematicId)
      
      if (isMounted()) {
        setSchematic(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getSchematic();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!schematic) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {schematic.type}: Schematic Details
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <div>
            <Box sx={{ mb: 4 }}>
              <NextLink
                href="/dashboard/schematics"
                passHref
              >
                <Link
                  color="textPrimary"
                  component="a"
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <ArrowBackIcon
                    fontSize="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="subtitle2">
                    Schematics
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden'
                }}
              >
                <Avatar
                  src={schematic.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  {getInitials(schematic.type)}
                </Avatar>
                <div>
                  <Typography variant="h4">
                    {schematic.type}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="subtitle2">
                      schematicId:
                    </Typography>
                    <Chip
                      label={schematicId}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </div>
              </Grid>
              <Grid
                item
                sx={{ m: -1 }}
              >
                <NextLink
                  href={"/dashboard/schematics/" + schematicId + "/testDeploy"}
                  passHref
                >
                  <Button
                    component="a"
                    endIcon={(
                      <PencilAltIcon fontSize="small" />
                    )}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Create Test Deployment
                  </Button>
                </NextLink>
                {/* <Button
                  endIcon={(
                    <ChevronDownIcon fontSize="small" />
                  )}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Actions
                </Button> */}
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
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
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'details' && (
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                >
                  <SchematicBasicDetails
                    schemaId={schematicId}
                    orgId={schematic.orgId}
                    author={schematic.author}
                    type={schematic.type}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >

                  <SchematicParameters
                    parameters={schematic.parameters}
                  />
                </Grid>
                {/* <Grid
                  item
                  xs={12}
                >
                  <CustomerEmailsSummary />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <CustomerDataManagement />
                </Grid> */}
              </Grid>
            )}
            {/* {currentTab === 'members' && <OrganizationMembers
              members={schematic.members}
              udsMap={schematic.udsMap}
            />}
            {currentTab === 'logs' && <CustomerLogs />} */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

SchematicDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default SchematicDetails;

