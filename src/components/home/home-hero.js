import NextLink from 'next/link';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CheckCircleOutlined as CheckCircleOutlinedIcon } from '../../icons/check-circle-outlined';
import { Users as UsersIcon } from '../../icons/users';
import { Star as StarIcon } from '../../icons/star';
import { Template as TemplateIcon } from '../../icons/template';

export const HomeHero = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        pt: 6
      }}
      {...props}>
      <Container
        maxWidth="md"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography
          color="primary"
          variant="overline"
        >
          Introducing
        </Typography>
        <Typography
          align="center"
          variant="h1"
        >
          LogicNerve
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle1"
          sx={{ py: 3 }}
        >
          Deploy your healthcare innovations!
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle1"
          sx={{ py: 3 }}
        >
          A HIPAA compliant Biotech IoMT data tracking platform, providing healthcare 
          providers and patients an easily integrated end to end secure platform 
          to track data using technology created by innovators.
        </Typography>
        <Box
          sx={{
            alignItems: {
              sm: 'center',
              xs: 'flex-start'
            },
            display: 'flex',
            flexDirection: {
              sm: 'row',
              xs: 'column'
            },
            py: 3,
            m: -1,
            '& > *': {
              m: 1
            }
          }}
        >
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Developed For:
          </Typography>
          {['Biotech Innovators', 'Medical Practitioners', 'Patients'].map((item) => (
            <Box
              key={item}
              sx={{
                alignItems: 'center',
                display: 'flex',
                m: 2
              }}
            >
              <CheckCircleOutlinedIcon
                color="success"
                sx={{ mr: 1 }}
              />
              <Typography variant="subtitle2">
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            mx: -1,
            mt: 2,
            mb: 6,
            '& > a': {
              m: 1
            }
          }}
        >
          <NextLink
            href="/dashboard"
            passHref
          >
            <Button
              component="a"
              size="large"
              variant="contained"
              disabled
            >
              Coming Soon
            </Button>
          </NextLink>
        </Box>
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle1"
          sx={{ py: 3 }}
        >
        Logicnerve is a HIPAA compliant Biotech IoT deployment platform that allows innovators 
        in the biotech space to develop and deploy their devices with ease for patient usage. 
        Our platform is designed for easy integration with devices with and provides developers 
        with abilities to view logs, deploy firmware updates, securely manage, and monitor device metadata while protecting PHI. 
        Logicnerve simultaneously allows healthcare providers and patients an end to end secure platform to track their patient data using 
        technology created by innovators, while giving capabilities to export their data easily to EMR platforms. 
        </Typography>
      </Container>
      <Box
        sx={{
          maxWidth: 980,
          width: '100%',
          mx: 'auto'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            pt: 'calc(600 / 980 * 100%)',
            '& img': {
              height: 'auto',
              position: 'absolute',
              top: 0,
              width: '100%'
            }
          }}
        >
          <img
            alt=""
            src={`/hero_${theme.palette.mode}.png`}
          />
        </Box>
      </Box>
      <Box sx={{ py: 8 }}>
        <Container
          maxWidth="md"
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            px: 3
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 40,
                mb: 2,
                width: 40
              }}
              variant="rounded"
            >
              <UsersIcon fontSize="small" />
            </Avatar>
            <Typography
              sx={{
                color: 'textPrimary',
                textAlign: 'center'
              }}
              variant="h4"
            >
              4.5k+
            </Typography>
            <Typography
              sx={{ color: 'textPrimary' }}
              variant="overline"
            >
              Happy customers
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              sx={{
                backgroundColor: 'secondary.main',
                height: 40,
                mb: 2,
                width: 40
              }}
              variant="rounded"
            >
              <StarIcon fontSize="small" />
            </Avatar>
            <Typography
              sx={{
                color: 'textPrimary',
                textAlign: 'center'
              }}
              variant="h4"
            >
              4.9/5
            </Typography>
            <Typography
              sx={{ color: 'textPrimary' }}
              variant="overline"
            >
              CUSTOMER Rating
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              sx={{
                backgroundColor: 'warning.main',
                height: 40,
                mb: 2,
                width: 40
              }}
              variant="rounded"
            >
              <TemplateIcon fontSize="small" />
            </Avatar>
            <Typography
              sx={{
                color: 'textPrimary',
                textAlign: 'center'
              }}
              variant="h4"
            >
              UX
            </Typography>
            <Typography
              sx={{ color: 'textPrimary' }}
              variant="overline"
            >
              complete flows
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              sx={{
                backgroundColor: 'info.main',
                height: 40,
                mb: 2,
                width: 40
              }}
              variant="rounded"
            >
              <UsersIcon fontSize="small" />
            </Avatar>
            <Typography
              sx={{
                color: 'textPrimary',
                textAlign: 'center'
              }}
              variant="h4"
            >
              $10k+
            </Typography>
            <Typography
              sx={{ color: 'textPrimary' }}
              variant="overline"
            >
              In people hours saved
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
