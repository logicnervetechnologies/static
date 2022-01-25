import { useCallback, useState, useEffect } from 'react';
import type { FC, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
// import { formatDistanceToNowStrict } from 'date-fns';
import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from '@material-ui/core';
import { organizationApi } from '../../__realApi__/organizationApi';
import { customerApi } from '../../__fakeApi__/customerApi';
// import {
//   ProjectActivities,
//   ProjectApplicants,
//   ProjectApplicationModal,
//   ProjectOverview,
//   ProjectReviews
// } from '../../components/dashboard/project';
import {
  OrganizationOverview,
  OrganizationMemberListTable,
  OrganizationManage
} from '../../components/dashboard/organization';
import useMounted from '../../hooks/useMounted';
import useSettings from '../../hooks/useSettings';
// import CalendarIcon from '../../icons/Calendar';
// import CheckIcon from '../../icons/Check';
// import ExclamationIcon from '../../icons/Exclamation';
import gtm from '../../lib/gtm';
import type { Organization } from '../../types/organization';
import type { Customer } from '../../types/customer';
import useAuth from '../../hooks/useAuth';

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Members', value: 'members' },
  { label: 'Activity', value: 'activity' },
  { label: 'Detail / Manage', value: 'manage' }
];

const OrganizationDetails: FC = () => {
  const auth = useAuth();
  const mounted = useMounted();
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const basicOrgsDef = {};
  auth.user.organizations.forEach((org) => {
    basicOrgsDef[org] = org;
  });
  const [orgBasicInfo, setOrgBasicInfo] = useState<Object | null>(basicOrgsDef);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [orgPos, setOrgPos] = useState(0);
  // const [isApplicationOpen, setIsApplicationOpen] = useState<boolean>(false);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getOrganization = useCallback(async (orgNum: number) => {
    try {
      const data : Organization = await organizationApi.getOrganization(auth.user.organizations[orgNum]);
      console.log(data);
      if (mounted.current && data !== null) {
        console.log('setting data');
        console.log(data);
        setOrganization(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  const getBasicOrgInfoArray = useCallback(async (orgIds: any) => {
    try {
      const data : any = await organizationApi.getOrganizationsBasic(orgIds);
      console.log(data.orgs);
      if (data !== null) {
        setOrgBasicInfo(data.orgs);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getOrganization(0);
    getBasicOrgInfoArray(auth.user.organizations);
  }, [getOrganization, getBasicOrgInfoArray]);

  // TEMP CUSTORMERS MUST BE DEPRECATED IN FUTURE
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomers = useCallback(async () => {
    try {
      const data = await customerApi.getCustomers();

      if (mounted.current) {
        setCustomers(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  // const handleApplyModalOpen = (): void => {
  //   setIsApplicationOpen(true);
  // };

  // const handleApplyModalClose = (): void => {
  //   setIsApplicationOpen(false);
  // };

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const changeOrg = (event) => {
    console.log(event);
    getOrganization(event.target.value);
    setOrgPos(event.target.value);
    console.log(orgPos);
  };

  if (!organization) {
    console.log('No org');
    return null;
  }
  if (!auth.user) {
    console.log('No user obj');
  }

  return (
    <>
      <Helmet>
        <title>Dashboard: Organization Details | Logic Nerve</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <FormControl
                fullWidth
                variant="outlined"
              >
                <InputLabel>
                  Organization
                </InputLabel>
                <Select
                  defaultValue="0"
                  label="Organization"
                  onChange={changeOrg}
                  sx={{
                    mb: 2
                  }}
                >
                  {auth.user.organizations.map((org, index) => (
                    <MenuItem value={index}>
                      {orgBasicInfo[org]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box
                sx={{
                  alignItems: 'center',
                  color: 'text.secondary',
                  display: 'flex',
                  flexWrap: 'wrap',
                  mb: -2,
                  mx: -2
                }}
              >
                {/* <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    m: 2
                  }}
                >
                  {organization.isActive ? <CheckIcon fontSize="small" />
                    : <ExclamationIcon fontSize="small" />}
                  <Typography
                    color="inherit"
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                  >
                    {organization.isActive ? 'Active' : 'Inactive'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    m: 2
                  }}
                >
                  <CalendarIcon fontSize="small" />
                  <Typography
                    color="inherit"
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                  >
                    {`Deadline in ${formatDistanceToNowStrict(organization.endDate)}`}
                  </Typography>
                </Box> */}
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
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
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'overview'
            && <OrganizationOverview organization={organization} />}
            {currentTab === 'members'
            && <OrganizationMemberListTable members={customers} />}
            {/* {currentTab === 'activity'
            && <ProjectActivities activities={organization.activities} />} */}
            {currentTab === 'manage'
            && (
              <OrganizationManage
                organization={organization}
                user={auth.user}
              />
            )}
          </Box>
        </Container>
      </Box>
      {/* <ProjectApplicationModal
        authorAvatar={organization.author.avatar}
        authorName={organization.admins[0]}
        onApply={handleApplyModalClose}
        onClose={handleApplyModalClose}
        open={isApplicationOpen}
      /> */}
    </>
  );
};

export default OrganizationDetails;
