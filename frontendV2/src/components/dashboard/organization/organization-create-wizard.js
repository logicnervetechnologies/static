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
  { text: 'Andorra', value: 'AD' },
  { text: 'Angola', value: 'AO' },
  { text: 'Anguilla', value: 'AI' },
  { text: 'Antarctica', value: 'AQ' },
  { text: 'Antigua and Barbuda', value: 'AG' },
  { text: 'Argentina', value: 'AR' },
  { text: 'Armenia', value: 'AM' },
  { text: 'Aruba', value: 'AW' },
  { text: 'Australia', value: 'AU' },
  { text: 'Austria', value: 'AT' },
  { text: 'Azerbaijan', value: 'AZ' },
  { text: 'Bahamas (the)', value: 'BS' },
  { text: 'Bahrain', value: 'BH' },
  { text: 'Bangladesh', value: 'BD' },
  { text: 'Barbados', value: 'BB' },
  { text: 'Belarus', value: 'BY' },
  { text: 'Belgium', value: 'BE' },
  { text: 'Belize', value: 'BZ' },
  { text: 'Benin', value: 'BJ' },
  { text: 'Bermuda', value: 'BM' },
  { text: 'Bhutan', value: 'BT' },
  { text: 'Bolivia (Plurinational State of)', value: 'BO' },
  { text: 'Bonaire, Sint Eustatius and Saba', value: 'BQ' },
  { text: 'Bosnia and Herzegovina', value: 'BA' },
  { text: 'Botswana', value: 'BW' },
  { text: 'Bouvet Island', value: 'BV' },
  { text: 'Brazil', value: 'BR' },
  { text: 'British Indian Ocean Territory (the)', value: 'IO' },
  { text: 'Brunei Darussalam', value: 'BN' },
  { text: 'Bulgaria', value: 'BG' },
  { text: 'Burkina Faso', value: 'BF' },
  { text: 'Burundi', value: 'BI' },
  { text: 'Cabo Verde', value: 'CV' },
  { text: 'Cambodia', value: 'KH' },
  { text: 'Cameroon', value: 'CM' },
  { text: 'Canada', value: 'CA' },
  { text: 'Cayman Islands (the)', value: 'KY' },
  { text: 'Central African Republic (the)', value: 'CF' },
  { text: 'Chad', value: 'TD' },
  { text: 'Chile', value: 'CL' },
  { text: 'China', value: 'CN' },
  { text: 'Christmas Island', value: 'CX' },
  { text: 'Cocos (Keeling) Islands (the)', value: 'CC' },
  { text: 'Colombia', value: 'CO' },
  { text: 'Comoros (the)', value: 'KM' },
  { text: 'Congo (the Democratic Republic of the)', value: 'CD' },
  { text: 'Congo (the)', value: 'CG' },
  { text: 'Cook Islands (the)', value: 'CK' },
  { text: 'Costa Rica', value: 'CR' },
  { text: 'Croatia', value: 'HR' },
  { text: 'Cuba', value: 'CU' },
  { text: 'Curaçao', value: 'CW' },
  { text: 'Cyprus', value: 'CY' },
  { text: 'Czechia', value: 'CZ' },
  { text: 'Côte d\'Ivoire', value: 'CI' },
  { text: 'Denmark', value: 'DK' },
  { text: 'Djibouti', value: 'DJ' },
  { text: 'Dominica', value: 'DM' },
  { text: 'Dominican Republic (the)', value: 'DO' },
  { text: 'Ecuador', value: 'EC' },
  { text: 'Egypt', value: 'EG' },
  { text: 'El Salvador', value: 'SV' },
  { text: 'Equatorial Guinea', value: 'GQ' },
  { text: 'Eritrea', value: 'ER' },
  { text: 'Estonia', value: 'EE' },
  { text: 'Eswatini', value: 'SZ' },
  { text: 'Ethiopia', value: 'ET' },
  { text: 'Falkland Islands (the) [Malvinas]', value: 'FK' },
  { text: 'Faroe Islands (the)', value: 'FO' },
  { text: 'Fiji', value: 'FJ' },
  { text: 'Finland', value: 'FI' },
  { text: 'France', value: 'FR' },
  { text: 'French Guiana', value: 'GF' },
  { text: 'French Polynesia', value: 'PF' },
  { text: 'French Southern Territories (the)', value: 'TF' },
  { text: 'Gabon', value: 'GA' },
  { text: 'Gambia (the)', value: 'GM' },
  { text: 'Georgia', value: 'GE' },
  { text: 'Germany', value: 'DE' },
  { text: 'Ghana', value: 'GH' },
  { text: 'Gibraltar', value: 'GI' },
  { text: 'Greece', value: 'GR' },
  { text: 'Greenland', value: 'GL' },
  { text: 'Grenada', value: 'GD' },
  { text: 'Guadeloupe', value: 'GP' },
  { text: 'Guam', value: 'GU' },
  { text: 'Guatemala', value: 'GT' },
  { text: 'Guernsey', value: 'GG' },
  { text: 'Guinea', value: 'GN' },
  { text: 'Guinea-Bissau', value: 'GW' },
  { text: 'Guyana', value: 'GY' },
  { text: 'Haiti', value: 'HT' },
  { text: 'Heard Island and McDonald Islands', value: 'HM' },
  { text: 'Holy See (the)', value: 'VA' },
  { text: 'Honduras', value: 'HN' },
  { text: 'Hong Kong', value: 'HK' },
  { text: 'Hungary', value: 'HU' },
  { text: 'Iceland', value: 'IS' },
  { text: 'India', value: 'IN' },
  { text: 'Indonesia', value: 'ID' },
  { text: 'Iran (Islamic Republic of)', value: 'IR' },
  { text: 'Iraq', value: 'IQ' },
  { text: 'Ireland', value: 'IE' },
  { text: 'Isle of Man', value: 'IM' },
  { text: 'Israel', value: 'IL' },
  { text: 'Italy', value: 'IT' },
  { text: 'Jamaica', value: 'JM' },
  { text: 'Japan', value: 'JP' },
  { text: 'Jersey', value: 'JE' },
  { text: 'Jordan', value: 'JO' },
  { text: 'Kazakhstan', value: 'KZ' },
  { text: 'Kenya', value: 'KE' },
  { text: 'Kiribati', value: 'KI' },
  { text: 'Korea (the Democratic People\'s Republic of)', value: 'KP' },
  { text: 'Korea (the Republic of)', value: 'KR' },
  { text: 'Kuwait', value: 'KW' },
  { text: 'Kyrgyzstan', value: 'KG' },
  { text: 'Lao People\'s Democratic Republic (the)', value: 'LA' },
  { text: 'Latvia', value: 'LV' },
  { text: 'Lebanon', value: 'LB' },
  { text: 'Lesotho', value: 'LS' },
  { text: 'Liberia', value: 'LR' },
  { text: 'Libya', value: 'LY' },
  { text: 'Liechtenstein', value: 'LI' },
  { text: 'Lithuania', value: 'LT' },
  { text: 'Luxembourg', value: 'LU' },
  { text: 'Macao', value: 'MO' },
  { text: 'Madagascar', value: 'MG' },
  { text: 'Malawi', value: 'MW' },
  { text: 'Malaysia', value: 'MY' },
  { text: 'Maldives', value: 'MV' },
  { text: 'Mali', value: 'ML' },
  { text: 'Malta', value: 'MT' },
  { text: 'Marshall Islands (the)', value: 'MH' },
  { text: 'Martinique', value: 'MQ' },
  { text: 'Mauritania', value: 'MR' },
  { text: 'Mauritius', value: 'MU' },
  { text: 'Mayotte', value: 'YT' },
  { text: 'Mexico', value: 'MX' },
  { text: 'Micronesia (Federated States of)', value: 'FM' },
  { text: 'Moldova (the Republic of)', value: 'MD' },
  { text: 'Monaco', value: 'MC' },
  { text: 'Mongolia', value: 'MN' },
  { text: 'Montenegro', value: 'ME' },
  { text: 'Montserrat', value: 'MS' },
  { text: 'Morocco', value: 'MA' },
  { text: 'Mozambique', value: 'MZ' },
  { text: 'Myanmar', value: 'MM' },
  { text: 'Namibia', value: 'NA' },
  { text: 'Nauru', value: 'NR' },
  { text: 'Nepal', value: 'NP' },
  { text: 'Netherlands (the)', value: 'NL' },
  { text: 'New Caledonia', value: 'NC' },
  { text: 'New Zealand', value: 'NZ' },
  { text: 'Nicaragua', value: 'NI' },
  { text: 'Niger (the)', value: 'NE' },
  { text: 'Nigeria', value: 'NG' },
  { text: 'Niue', value: 'NU' },
  { text: 'Norfolk Island', value: 'NF' },
  { text: 'Northern Mariana Islands (the)', value: 'MP' },
  { text: 'Norway', value: 'NO' },
  { text: 'Oman', value: 'OM' },
  { text: 'Pakistan', value: 'PK' },
  { text: 'Palau', value: 'PW' },
  { text: 'Palestine, State of', value: 'PS' },
  { text: 'Panama', value: 'PA' },
  { text: 'Papua New Guinea', value: 'PG' },
  { text: 'Paraguay', value: 'PY' },
  { text: 'Peru', value: 'PE' },
  { text: 'Philippines (the)', value: 'PH' },
  { text: 'Pitcairn', value: 'PN' },
  { text: 'Poland', value: 'PL' },
  { text: 'Portugal', value: 'PT' },
  { text: 'Puerto Rico', value: 'PR' },
  { text: 'Qatar', value: 'QA' },
  { text: 'Republic of North Macedonia', value: 'MK' },
  { text: 'Romania', value: 'RO' },
  { text: 'Russian Federation (the)', value: 'RU' },
  { text: 'Rwanda', value: 'RW' },
  { text: 'Réunion', value: 'RE' },
  { text: 'Saint Barthélemy', value: 'BL' },
  { text: 'Saint Helena, Ascension and Tristan da Cunha', value: 'SH' },
  { text: 'Saint Kitts and Nevis', value: 'KN' },
  { text: 'Saint Lucia', value: 'LC' },
  { text: 'Saint Martin (French part)', value: 'MF' },
  { text: 'Saint Pierre and Miquelon', value: 'PM' },
  { text: 'Saint Vincent and the Grenadines', value: 'VC' },
  { text: 'Samoa', value: 'WS' },
  { text: 'San Marino', value: 'SM' },
  { text: 'Sao Tome and Principe', value: 'ST' },
  { text: 'Saudi Arabia', value: 'SA' },
  { text: 'Senegal', value: 'SN' },
  { text: 'Serbia', value: 'RS' },
  { text: 'Seychelles', value: 'SC' },
  { text: 'Sierra Leone', value: 'SL' },
  { text: 'Singapore', value: 'SG' },
  { text: 'Sint Maarten (Dutch part)', value: 'SX' },
  { text: 'Slovakia', value: 'SK' },
  { text: 'Slovenia', value: 'SI' },
  { text: 'Solomon Islands', value: 'SB' },
  { text: 'Somalia', value: 'SO' },
  { text: 'South Africa', value: 'ZA' },
  { text: 'South Georgia and the South Sandwich Islands', value: 'GS' },
  { text: 'South Sudan', value: 'SS' },
  { text: 'Spain', value: 'ES' },
  { text: 'Sri Lanka', value: 'LK' },
  { text: 'Sudan (the)', value: 'SD' },
  { text: 'Suriname', value: 'SR' },
  { text: 'Svalbard and Jan Mayen', value: 'SJ' },
  { text: 'Sweden', value: 'SE' },
  { text: 'Switzerland', value: 'CH' },
  { text: 'Syrian Arab Republic', value: 'SY' },
  { text: 'Taiwan', value: 'TW' },
  { text: 'Tajikistan', value: 'TJ' },
  { text: 'Tanzania, United Republic of', value: 'TZ' },
  { text: 'Thailand', value: 'TH' },
  { text: 'Timor-Leste', value: 'TL' },
  { text: 'Togo', value: 'TG' },
  { text: 'Tokelau', value: 'TK' },
  { text: 'Tonga', value: 'TO' },
  { text: 'Trinidad and Tobago', value: 'TT' },
  { text: 'Tunisia', value: 'TN' },
  { text: 'Turkey', value: 'TR' },
  { text: 'Turkmenistan', value: 'TM' },
  { text: 'Turks and Caicos Islands (the)', value: 'TC' },
  { text: 'Tuvalu', value: 'TV' },
  { text: 'Uganda', value: 'UG' },
  { text: 'Ukraine', value: 'UA' },
  { text: 'United Arab Emirates (the)', value: 'AE' },
  { text: 'United Kingdom of Great Britain and Northern Ireland (the)', value: 'GB' },
  { text: 'United States Minor Outlying Islands (the)', value: 'UM' },
  { text: 'United States of America (the)', value: 'US' },
  { text: 'Uruguay', value: 'UY' },
  { text: 'Uzbekistan', value: 'UZ' },
  { text: 'Vanuatu', value: 'VU' },
  { text: 'Venezuela (Bolivarian Republic of)', value: 'VE' },
  { text: 'Viet Nam', value: 'VN' },
  { text: 'Virgin Islands (British)', value: 'VG' },
  { text: 'Virgin Islands (U.S.)', value: 'VI' },
  { text: 'Wallis and Futuna', value: 'WF' },
  { text: 'Western Sahara', value: 'EH' },
  { text: 'Yemen', value: 'YE' },
  { text: 'Zambia', value: 'ZM' },
  { text: 'Zimbabwe', value: 'ZW' },
  { text: 'Åland Islands', value: 'AX' }
];


export const OrganizationCreateWizard = () => {

  const [orgName, setOrgName] = useState("");
  const handleOrgNameChange = e => { setOrgName(e.target.value) }

  const [country, setCountry] = useState("");
  const handleCountryChange = e => {
    if (e == null) {
      setCountry("")
      return
    }
    setCountry(e.value)
  }

  const [city, setCity] = useState("");
  const handleCityChange = e => {setCity(e.target.value)}

  const [statereg, setStateReg] = useState("")
  const handleStateRegChange = e => {setStateReg(e.target.value)}

  const [street, setStreet] = useState("")
  const handleStreetChange = e => {setStreet(e.target.value)}

  const [phone, setPhone] = useState("");
  const handlePhoneChange = e => {setPhone(e.target.value)}


  const executeCreate = async (event) => {
    event.preventDefault()
    console.log("time to bing bong")
    console.log(orgName)
    const orgAddress = street + ", " + city + ", " + statereg + ", " + country;
    console.log(orgAddress)
    await udsApi.createOrganization(orgName, orgAddress)
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
      <CardHeader title="Enter Your Organization Information" />
      <Typography>

      </Typography>
      <CardContent>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Name"
              value={orgName}
              onChange={handleOrgNameChange}
              helperText="The name of your organization cannot be changed after being created"
              required
              name="name"
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
              name="street"
              required
              value={street}
              onChange={handleStreetChange}
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
        You will be the default administrator for this organization. You can add other adminstrators and members later.
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
