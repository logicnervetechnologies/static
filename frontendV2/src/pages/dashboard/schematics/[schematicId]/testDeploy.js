import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { customerApi } from '../../../../__fake-api__/customer-api';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { CustomerEditForm } from '../../../../components/dashboard/customer/customer-edit-form';
import { SchematicCreateTestDeploy } from '../../../../components/dashboard/schematic/schematic-create-test-deploy';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { dsiApi } from '../../../../__real-api__/dsiApi';

const CustomerEdit = () => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);

  const [schematic, setSchematic] = useState(null);
  const splithref = window.location.href.split('/');
  const schematicId = splithref[splithref.length - 2];

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
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await customerApi.getCustomer();

      if (isMounted()) {
        setCustomer(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getCustomer();
      getSchematic();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  if (!customer || !schematic) {
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
              href={"/dashboard/schematics/" + schematicId}
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
                  {schematic.type}
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
                Test Deployment: {schematic.type}
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
                  label={schematicId}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <SchematicCreateTestDeploy schematic={schematic} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

CustomerEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default CustomerEdit;
