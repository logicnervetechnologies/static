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
import { CodeBlock, dracula } from "react-code-blocks";
import { useState } from 'react';


const ptypes = [
  { text: 'Number', value: 'number' },
  { text: 'String/Text', value: 'string' }
];


export const TestDeploymentCharting = (props) => {
  const {tDData, ...other} = props;
  console.log("tddata")
  console.log(tDData)
  const {schemaId, dsid, params} = tDData;
  const { user } = useAuth();

  const [hdata, setHdata] = useState(tDData.data)

  const convertHdataToTDForm = (params, hdata) => {
    const keys = Object.keys(params)
    keys.push("time")
    var tmp = {}
    keys.forEach((k) => {
      tmp[k] = []
    })
    hdata.forEach((e) => {
      keys.forEach((k) => {
        tmp[k].push(e[k])
      })
    })
    return tmp
  }
  
  const [parameterizedData, setParamaterizedData] = useState(convertHdataToTDForm(params, tDData.data))
  console.log(parameterizedData)

  const handleRefreshData = async (e) => {
    e.preventDefault()
    const res = await dsiApi.retrieveTestDE(dsid);
    if (res) console.log(res.data)
    setHdata(res.data.data)
    setParamaterizedData(convertHdataToTDForm(params, res.data.data))
  }

  // const executeCreateTestDeploy = async (event) => {
  //   event.preventDefault();
  //   console.log(user)
  //   console.log(schematic)
  //   console.log("banana")
  //   const res = await dsiApi.createTestDE(schematic.schemaId)
  //   if (res) window.location.href="/dashboard/testDeployments"
  // }
  const dataSec = (arrayOfParams) => {
    var t = ""
    arrayOfParams.forEach(p => {
      if (p == arrayOfParams[arrayOfParams.length-1]) {
        t+= `                   "${p}": random.randint(0,10)\n`
      } else {
        t+= `                   "${p}": random.randint(0,10), \n`
      }
    })
    return t
  }
  const code = 
  `import requests
import random
import time
for i in range(10):
        data = {
                "dsid": "${dsid}",
                "reqUID": "${user.uid}",
                "hdata": {
${ dataSec(Object.keys(params))}                }
        }
        requests.post("http://localhost/dsi/testIngest", json=data)
        time.sleep(1)

`


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
      To push data to this test deployment, you can make a push call to {lnRoute.dsi.testIngest} structured with the parameters as is in the python example below:
      <br /><br />
      THIS TEST DEPLOYMENT CANNOT BE USED FOR COMMERCIAL MEDICAL DATA COLLECTION. 
      <br /><br />
      Click the Refresh Data Button to get the latest data pushed to the record. 
      <br /> <br />
      You can simulate data being sent to this deployment by running the following python code:
      <br /><br />
      
    </Typography>
    
    </Grid>
    <Grid
      item
      md={6}
      xs={12}
    >
      <CodeBlock
        text={code}
        language={"python"}
        showLineNumbers={true}
        theme={dracula}
      />
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
        onClick={handleRefreshData}
      >
        Refresh Data
      </Button>
    </CardActions>
  </Box>
  {
    Object.keys(params).map((k) => {
      return <TDChart x={parameterizedData['time']} y={parameterizedData[k]} label={k} />
    })
  }

  </>
  )
      };
