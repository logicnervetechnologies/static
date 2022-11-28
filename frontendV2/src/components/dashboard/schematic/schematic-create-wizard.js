import {
  Autocomplete,
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMounted } from '../../../hooks/use-mounted';
import { udsApi } from '../../../__real-api__/udsApi';
import { useAuth } from '../../../hooks/use-auth';
import { dsiApi } from '../../../__real-api__/dsiApi';

const ptypes = [
  { text: 'Number', value: 'number' },
  { text: 'String/Text', value: 'string' }
];


export const SchematicCreateWizard = () => {
  const isMounted = useMounted();
  const [schemName, setSchemName] = useState("");
  const handleSchemNameChange = e => { setSchemName(e.target.value) }

  const [numParams, setNumParams] = useState(1);
  const [params, setParams] = useState([["",""]]);
  const [errorPname, setErrorPname] = useState([""]);
  const [organizations, setOrganizations] = useState([]);

  const [selectOrg, setSelectOrg] = useState(organizations[0] || " ");

  const handleSelectOrgChange = (event) => {
    setSelectOrg(event.target.value);
  };




  const handleParamNameChange = (e, i) => {
    if(e.target.value.match(/[%<>\\$'"`\[\]; :?*,.{}~|@]/)) {
      let errs = [...errorPname]
      errs[i] = "Forbidden character: %<>\\$'\"`\[\]; :?*,.{}~|@"
      setErrorPname(errs)
    } else {
      let errs = [...errorPname]
      errs[i] = ""
      setErrorPname(errs)
    }
    let items = [...params];
    items[i][0] = e.target.value
    setParams(items)
  }
  const handleParamTypeChange = (e, i) => {
    let x = e.value
    if (x== null) x= ""
    let items = [...params];
    items[i][1] = x
    setParams(items)
  }

  const handleAddParameter = e => {
    e.preventDefault()
    setNumParams(numParams+1)
    let nparams = [...params, ["",""]]
    setParams(nparams)
  }

  const handleRemoveParameter = (e, index) => {
    let p = params
    p.splice(index, 1)
    setParams(p)
    setNumParams(numParams-1)
  }

  const { user } = useAuth();
  const getOrganizations = useCallback(async () => {
    try {
      // const data = await organizationApi.getOrganizations();
      const data = await udsApi.getBasicOrganization(user.organizations);
      console.log(data)
      if (data == null) data = [];
      // const data2 = await udsApi.
      if (isMounted()) {
        setOrganizations(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getOrganizations();
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  const executeCreate = async (event) => {
    event.preventDefault()

    let restructParams = params.map((e) => {
      return {
        "name": e[0],
        "type": e[1]
      }
    })
    const r = await dsiApi.createSchema(selectOrg, schemName, restructParams);
    if (r) window.location.href="/dashboard/schematics"
    
    // console.log(orgName)
    // const orgAddress = street1 + " " + street2 + ", " + city + ", " + statereg + " " + postalCode + ", " + country;
    // console.log(orgAddress)
    // console.log(phone)
    // console.log(email)
    // const resp = await udsApi.createOrganization(orgName, orgAddress, street1, street2, city, statereg, country, postalCode, email, phone);
    // console.log(resp)
    // if ('orgId' in resp.data) window.location.href = `/dashboard/organizations/${resp.data.orgId}`
    // else window.location.href= `/500`
  }



  return (
  <Box
    sx={{
      backgroundColor: 'background.paper',
      minHeight: '100%',
      p: 3
    }}
  >
    <form onSubmit={executeCreate}>
      <CardHeader title="Create New Data Schematic" />
      <Grid
            item
            md={6}
            xs={12}
            marginBottom={1}
          >
            <TextField
              
              label="Name"
              value={schemName}
              onChange={handleSchemNameChange}
              helperText="The name of your data schematic created"
              required
              name="name"
            /> 
      <TextField
                label="Organization"
                name="sort"
                onChange={handleSelectOrgChange}
                helperText="The organization associated with the schematic"
                select
                SelectProps={{ native: true }}
                sx={{ ml: 2 }}
                value={selectOrg}
              >
                {organizations.map((org) => (
                  <option
                    key={org.orgId}
                    value={org.orgId}
                  >
                    {org.orgName}
                  </option>
                ))}
              </TextField>
        </Grid>
      <Divider />

      <Grid
            marginTop={1}
            md={6}
            xs={12}
          >
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleAddParameter}
        >
          Add Parameter
        </Button>
        </Grid>
      <CardContent title="Enter Parameter Information">
        <Grid
          container
          spacing={4}
        >
          {
            params.map((p, index) => {
              return (
              <>
              <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                label="Parameter Name"
                value={p[0]}
                fullWidth
                key={index}
                onChange={(e) => {
                  handleParamNameChange(e, index)
                }}
                helperText={errorPname[index]} // error message
                error={!!errorPname[index]}
                required
                name="parametername"
              />
            </Grid>
            <Grid
            item
            md={4}
            xs={12}
          >
            <Autocomplete
              getOptionLabel={(option) => option.text}
              options={ptypes}
              onChange={(event, selectedValue) => handleParamTypeChange(selectedValue, index)}
              renderInput={(params) => (
                <>
                <TextField {...params}
                           fullWidth
                           required
                           label="Paramter Type"
                           name="paramtype"
                />
                </>
              )}
            />
          </Grid>
          <Grid
            item
            md={1}
            xs={12}
          >
          <IconButton 
              sx={{ visibility: "visible" }}
              onClick={(e) => {handleRemoveParameter(e, index)}}
            >        <ClearIcon />
            </IconButton>
          </Grid>
          <br />
            </>)
            })
          }

        </Grid>
      </CardContent>
      
      <Divider />
      <Grid
            item
            md={6}
            xs={12}
          >
      <Typography> 
        <br />
        You will be the default administrator for this schematic. You can add other adminstrators and members later.
      </Typography>
      </Grid>
      
      <CardActions
        sx={{
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          type="submit"
          variant="contained"
        >
          Create
        </Button>
      </CardActions>
    </form>
  </Box>
  )
      };
