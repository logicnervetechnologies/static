import { useCallback, useState, useEffect } from 'react';
import type { FC, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
// import { formatDistanceToNowStrict } from 'date-fns';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
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
  OrganizationMemberListTable
} from '../../components/dashboard/organization';
import useMounted from '../../hooks/useMounted';
import useSettings from '../../hooks/useSettings';
// import CalendarIcon from '../../icons/Calendar';
// import CheckIcon from '../../icons/Check';
// import ExclamationIcon from '../../icons/Exclamation';
import ShareIcon from '../../icons/Share';
import gtm from '../../lib/gtm';
import type { Organization } from '../../types/organization';
import type { Customer } from '../../types/customer';
import useAuth from '../../hooks/useAuth';

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Members', value: 'members' },
  { label: 'Activity', value: 'activity' },
  { label: 'Applicants', value: 'applicants' }
];

const OrganizationDetails: FC = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [orgPos, setOrgPos] = useState(0);
  // const [isApplicationOpen, setIsApplicationOpen] = useState<boolean>(false);
  const auth = useAuth();

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

  useEffect(() => {
    getOrganization(0);
  }, [getOrganization]);

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
                      Org_
                      {index}
                      _
                      {org}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                {organization.orgName}
              </Typography>
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
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<ShareIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="text"
                >
                  Share
                </Button>
                <Button
                  color="primary"
                  // onClick={handleApplyModalOpen}
                  startIcon={<SendIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Apply for a role
                </Button>
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
            && <ProjectActivities activities={organization.activities} />}
            {currentTab === 'applicants'
            && <ProjectApplicants applicants={organization.applicants} />} */}
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
