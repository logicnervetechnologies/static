import {
  Box,
  Button,
  CardActions,
  Grid,
  Typography
} from '@mui/material';
import { useAuth } from '../../../hooks/use-auth';
import { TDChart } from './td-chart';
import { dsiApi } from '../../../__real-api__/dsiApi';
import { lnRoute } from '../../../config';


const ptypes = [
  { text: 'Number', value: 'number' },
  { text: 'String/Text', value: 'string' }
];


export const TestDeploymentCharting = (props) => {
  const {tDData, ...other} = props;
  const {schemaId, dsid, params} = tDData;

  const { user } = useAuth();


  // const executeCreateTestDeploy = async (event) => {
  //   event.preventDefault();
  //   console.log(user)
  //   console.log(schematic)
  //   console.log("banana")
  //   const res = await dsiApi.createTestDE(schematic.schemaId)
  //   if (res) window.location.href="/dashboard/testDeployments"
  // }



  return (
    <>
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
      This is a test deployment of a schema. 
      <br /><br />
      To push data to this test deployment, you can make a push call to {lnRoute.dsi.testIngest} structured with the following parameters:
      <br /><br />
      THIS TEST DEPLOYMENT CANNOT BE USED FOR COMMERCIAL MEDICAL DATA COLLECTION. 
      <br /><br />
      Creator of test deployment: {user.name}
      <br />
      
    </Typography>
    </Grid>
    <Grid>

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
      >
        Create Test Deployment
      </Button>
    </CardActions>
  </Box>
  <TDChart />
  </>
  )
      };
