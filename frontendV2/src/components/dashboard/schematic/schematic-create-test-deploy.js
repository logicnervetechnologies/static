import {
  Box,
  Button,
  CardActions,
  Grid,
  Typography
} from '@mui/material';
import { useAuth } from '../../../hooks/use-auth';
import { dsiApi } from '../../../__real-api__/dsiApi';

const ptypes = [
  { text: 'Number', value: 'number' },
  { text: 'String/Text', value: 'string' }
];


export const SchematicCreateTestDeploy = (props) => {
  const {schematic, ...other} = props;


  const { user } = useAuth();


  const executeCreateTestDeploy = async (event) => {
    event.preventDefault();
    console.log(user)
    console.log(schematic)
    console.log("banana")
    const res = await dsiApi.createTestDE(schematic.schemaId)
    if (res) window.location.href="/dashboard/testDeployments"
  }



  return (
  <Box
    sx={{
      backgroundColor: 'background.paper',
      minHeight: '100%',
      p: 3
    }}
  >
    <Grid
          item
          md={6}
          xs={12}
        >
    <Typography> 
      Click below to initiate a test deployment of the schematic: "{schematic.type}". Any data usage charges from API calls will be charged to the organization "{schematic.orgId}".
      <br /><br />
      This test deployment will be deployed on your account, and you will be able to see it on the "Test Deployment" page after creation.
      <br /><br />
      THIS TEST DEPLOYMENT CANNOT BE USED FOR COMMERCIAL MEDICAL DATA COLLECTION. 
      <br />
      Collecting patient medical data through this test deployment is a violation of HIPAA data privacy, and all liability from data collection of the test deployment falls within your organization and your user account.
       LogicNerve reserves the right to take legal action against you and your organization if violations or abuse of the test deployment occur. By clicking "Create Test Deployment" below, you agree to LogicNerve's term of usage for development tools.
      <br /><br />
      Creator of test deployment: {user.name}
      <br />
      
    </Typography>
    </Grid>
    
    <CardActions
      sx={{
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="warning"
        type="submit"
        variant="contained"
        onClick={executeCreateTestDeploy}
      >
        Create Test Deployment
      </Button>
    </CardActions>
  </Box>
  )
      };
