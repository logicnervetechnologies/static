import {
  Autocomplete,
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { udsApi } from '../../../__real-api__/udsApi';

const countries = [
  { text: 'Afghanistan', value: 'AF' },
  { text: 'Albania', value: 'AL' },
  { text: 'Algeria', value: 'DZ' },
  { text: 'American Samoa', value: 'AS' },
  { text: 'Andorra', value: 'AD' }
];


export const SchematicCreateWizard = () => {

  const [schemName, setSchemName] = useState("");
  const handleSchemNameChange = e => { setSchemName(e.target.value) }

  const [country, setCountry] = useState("");
  const handleCountryChange = e => {
    if (e == null) {
      setCountry("")
      return
    }
    setCountry(e.value)
  }

  const [numParams, setNumParams] = useState(1);
  const [params, setParams] = useState([["",""]]);
  const handleParamNameChange = (e, i) => {
    let items = [...params];
    let item = {...params[i]};
    item[0] = e.target.value;
    items[i] = item;
    setParams(items)
  }
  const handleParamTypeChange = (e, i) => {
    let items = [...params];
    let item = {...params[i]};
    item[1] = e.target.value;
    items[i] = item;
    setParams(items)
  }

  const [city, setCity] = useState("");
  const handleCityChange = e => {setCity(e.target.value)}

  const [statereg, setStateReg] = useState("")
  const handleStateRegChange = e => {setStateReg(e.target.value)}

  const [street1, setStreet1] = useState("")
  const handleStreet1Change = e => {setStreet1(e.target.value)}

  const [street2, setStreet2] = useState("")
  const handleStreet2Change = e => {setStreet2(e.target.value)}

  const [postalCode, setPostalCode] = useState("");
  const handlePostalCodeChange = e => {setPostalCode(e.target.value)}

  const [phone, setPhone] = useState("");
  const handlePhoneChange = e => {setPhone(e.target.value)}

  const [email, setEmail] = useState("");
  const handleEmailChange = e => {setEmail(e.target.value)}


  const executeCreate = async (event) => {
    event.preventDefault()

    console.log(params)

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
          >
            <TextField
              fullWidth
              label="Name"
              value={schemName}
              onChange={handleSchemNameChange}
              helperText="The name of your data schematic created"
              required
              name="name"
            />
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
                fullWidth
                label="Parameter Name"
                value={p[0]}
                key={index}
                onChange={(e) => {
                  handleParamNameChange(e, index)
                }}
                required
                name="parametername"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Field Type"
                key={index}
                value={p[1]}
                onChange={(e) =>  handleParamTypeChange(e, index)}
                required
                name="fieldtype"
              />
            </Grid>
            </>)
            })
          }

          {/* <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Email"
              type={"email"}
              value={email}
              onChange={handleEmailChange}
              helperText="Email for your organization."
              required
              name="Email"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              required
              value={phone}
              onChange={handlePhoneChange}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Street Address"
              name="street1"
              required
              value={street1}
              onChange={handleStreet1Change}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Apt/Suite"
              name="street2"
              value={street2}
              onChange={handleStreet2Change}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Autocomplete
              getOptionLabel={(option) => option.text}
              options={countries}
              onChange={(event, selectedValue) => handleCountryChange(selectedValue)}
              renderInput={(params) => (
                <TextField {...params}
                           fullWidth
                           required
                           label="Country"
                           name="country"
                />
              )}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              value={statereg}
              onChange={handleStateRegChange}
              required
              label="State/Region"
              name="state"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              value={city}
              required
              onChange={handleCityChange}
              label="City"
              name="city"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              required
              value={postalCode}
              onChange={handlePostalCodeChange}
            />
          </Grid> */}
          {/* <Grid
            item
            md={6}
            xs={12}
          >
            <Typography
              gutterBottom
              variant="subtitle2"
            >
              Public Profile
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Means that anyone viewing your profile will
              be able to see your contacts details
            </Typography>
            <Switch
              edge="start"
              name="isPublic"
            />
          </Grid>
          <Grid 
            item
            md={6}
            xs={12}
          >
            <Typography
              gutterBottom
              variant="subtitle2"
            >
              Available to hire
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Toggling this will let your teammates know
              that you are available for acquiring new projects
            </Typography>
            <Switch
              color="primary"
              edge="start"
              name="canHire"
            />
          </Grid>*/}
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
