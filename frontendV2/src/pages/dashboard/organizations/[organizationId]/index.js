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

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Members', value: 'members' },
  { label: 'Logs', value: 'logs' }
];

const OrganizationDetails = () => {
  const isMounted = useMounted();
  const [organization, setOrganization] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');
  const splithref = window.location.href.split('/');
  const organizationId = splithref[splithref.length - 1];
  console.log(organizationId)
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getOrganization = useCallback(async () => {
    try {
      //const data = await customerApi.getCustomer();
      const data = await udsApi.getOrganization(organizationId);
      
      if (isMounted()) {
        setOrganization(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getOrganization();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!organization) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Organization Details | Material Kit Pro
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
                href="/dashboard/organizations"
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
                    Organizations
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
                  src={organization.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  {getInitials(organization.orgName)}
                </Avatar>
                <div>
                  <Typography variant="h4">
                    {organization.orgName}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="subtitle2">
                      orgId:
                    </Typography>
                    <Chip
                      label={organizationId}
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
                  href={"/dashboard/organizations/" + organizationId + "/edit"}
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
                    Edit
                  </Button>
                </NextLink>
                <Button
                  endIcon={(
                    <ChevronDownIcon fontSize="small" />
                  )}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Actions
                </Button>
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
                  <OrganizationBasicDetails
                    address1={organization.address.street1}
                    address2={organization.address.street2}
                    country={organization.address.country}
                    email={organization.contact.email}
                    city={organization.address.city}
                    isVerified={true}
                    phone={organization.contact.number}
                    state={organization.address.state_prov}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <CustomerPayment />
                </Grid>
                <Grid
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
                </Grid>
              </Grid>
            )}
            {currentTab === 'members' && <OrganizationMembers
              members={organization.members}
              udsMap={organization.udsMap}
            />}
            {currentTab === 'logs' && <CustomerLogs />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

OrganizationDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default OrganizationDetails;

