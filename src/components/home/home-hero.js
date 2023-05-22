import NextLink from 'next/link';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CheckCircleOutlined as CheckCircleOutlinedIcon } from '../../icons/check-circle-outlined';
import { Users as UsersIcon } from '../../icons/users';
import { Star as StarIcon } from '../../icons/star';
import { Template as TemplateIcon } from '../../icons/template';

export const HomeHero = (props) => {
  const theme = useTheme();

  const scrollDown = (e) => {
    e.preventDefault()
    window.scroll({
      top: window.innerHeight,
      // document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        pt: 6,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      {...props}>
      <Container
        maxWidth="md"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
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
          Invici
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle1"
          sx={{ py: 3 }}
        >
          Leveraging AI to simplify retail in an ever digitizing world.
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
            Integrates with:
          </Typography>
          {['Shopify'].map((item) => (
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
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle1"
          sx={{ py: 3 }}
        >
          We aim to leverage AI in tools to assist digital retailers in areas such as inventory management, product listing generation, and pricing optimization. Interested in effortlessly handling inventory through invoice parsing and data generation? 
          {/* The company's AI algorithms analyze large amounts of data to identify trends and customer preferences, and then create personalized experiences for customers. 
          In addition, Invici provides retailers with analytics on customer behavior, allowing them to make informed decisions and improve the customer experience. 
          As a result, digital retailers can save time and money by using Invici's AI tools. */}

        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle1"
          sx={{ py: 3 }}
        >
          Learn more and contact us!
        </Typography>
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
            href="#"
            passHref
          >
            <Button
              component="a"
              size="large"
              variant="outlined"
              onClick={scrollDown}
            >
              Learn
            </Button>
          </NextLink>
          
          <NextLink
            href="/contact"
            passHref
          >
            <Button
              component="a"
              size="large"
              variant="contained"
            >
              Contact
            </Button>
          </NextLink>
        </Box>
      </Container>
      {/* <Box sx={{ py: 8 }}>
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
      </Box> */}
    </Box>
  );
};
