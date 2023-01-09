import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { CustomerEditForm } from '../../../../components/dashboard/customer/customer-edit-form';
import { SchematicCreateTestDeploy } from '../../../../components/dashboard/schematic/schematic-create-test-deploy';
import { TestDeploymentCharting } from '../../../../components/dashboard/testDeployments/test-deployment-charting';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { dsiApi } from '../../../../__real-api__/dsiApi';

const TestDeployment = () => {
  const isMounted = useMounted();
  const splithref = window.location.href.split('/');
  const testDsid = splithref[splithref.length - 1];
  const [tDData, setTDData] = useState({})
  const [tDChart, setTDChart] = useState(<></>)

  const getTDData = useCallback(async () => {
    try {
      //const data = await customerApi.getCustomer();
      const res = await dsiApi.retrieveTestDE(testDsid)
      
      if (isMounted()) {
        setTDData(res.data);
        setTDChart(<TestDeploymentCharting tDData={res.data} />)
        console.log("ham")
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);


  useEffect(() => {
      getTDData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  if (!tDData) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Create Test Deployment | LogicNerve
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink
              href={"/dashboard/testDeployments/"}
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
                  Test Deployments
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            {/* <Avatar
              src={customer.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64
              }}
            >
              {getInitials(customer.name)}
            </Avatar> */}
            <div>
              <Typography
                noWrap
                variant="h4"
              >
                Test Deployment
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                <Typography variant="subtitle2">
                  Schematic ID:
                </Typography>
                <Chip
                  label={tDData.schemaId}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Box>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                <Typography variant="subtitle2">
                  Test DSID:
                </Typography>
                <Chip
                  label={tDData.dsid}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
                {tDChart}
          </Box>
        </Container>
      </Box>
    </>
  );
};

TestDeployment.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default TestDeployment;
