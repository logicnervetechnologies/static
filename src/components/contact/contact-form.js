import { Box, Button, Grid, Link, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { submitForm } from '../../__real-api__/submitContact';

export const ContactForm = () => {

  // constructor = (props) => {
  //   super(props);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.input = React.createRef();
  // }


  const [name, setName] = useState('')
  const changeName = (e) => {
    setName(e.target.value)
  }
  const [cname, setCName] = useState('')
  const changeCName = (e) => {
    setCName(e.target.value)
  }

  const [nemail, setEmail] = useState('')
  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const [phone, setPhone] = useState('')
  const changePhone = (e) => {
    setPhone(e.target.value)
  }
  const [cSize, setCSize] = useState('')
  const changeCSize = (e) => {
    setCSize(e.target.value)
  }
  const [oType, setOType] = useState('')
  const changeOType = (e) => {
    setOType(e.target.value)
  }
  const [message, setMessage] = useState('')
  const changeMessage = (e) => {
    setMessage(e.target.value)
  }

  const handleSubmit = async (event) => {
    // console.log(ref1.current.getValue())
    event.preventDefault();
    const d = {
      name,
      cname,
      nemail,
      phone,
      cSize,
      oType,
      message
    }
    console.log(d)
    const res = await submitForm(d);
    window.location.href = '/reachedOut';
  };


  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Full Name *
          </Typography>
          <TextField
            fullWidth
            name="name"
            required
            value={name}
            onChange={changeName}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Company Name
          </Typography>
          <TextField
            fullWidth
            name="company"
            value={cname}
            onChange={changeCName}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Work Email *
          </Typography>
          <TextField
            fullWidth
            name="email"
            type="email"
            required
            value={nemail}
            onChange={changeEmail}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Phone Number
          </Typography>
          <TextField
            fullWidth
            name="phone"
            type="tel"
            value={phone}
            onChange={changePhone}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Company Size
          </Typography>
          <Select fullWidth value={cSize} onChange={changeCSize}>
            <MenuItem value="10-20">1-10</MenuItem>
            <MenuItem value="11-30">11-30</MenuItem>
            <MenuItem value="31-50">31-50</MenuItem>
            <MenuItem value="51+">51+</MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Organization Type
          </Typography>
          <Select fullWidth value={oType} onChange={changeOType}>
            <MenuItem value="nonprofitclinic">Nonprofit</MenuItem>
            <MenuItem value="researcher">Research</MenuItem>
            <MenuItem value="medorg">Medical Organization</MenuItem>
            <MenuItem value="healthdeviceproducer">Health Device Producer</MenuItem>
          </Select>
        </Grid>
        {/* <Grid
          item
          xs={12}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Projected Annual Budget *
          </Typography>
          <Select
            fullWidth
            required
          >
            <MenuItem value={500}>$500+</MenuItem>
            <MenuItem value={1000}>$1,000+</MenuItem>
            <MenuItem value={10000}>$10,000+</MenuItem>
            <MenuItem value={50000}>$50,000+</MenuItem>
          </Select>
        </Grid> */}
        <Grid
          item
          xs={12}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Message
          </Typography>
          <TextField
            fullWidth
            name="message"
            required
            multiline
            rows={6}
            value={message}
            onChange={changeMessage}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3
        }}
      >
        <Button
          fullWidth
          size="large"
          variant="contained"
          type='submit'
        >
          Let&apos;s Talk
        </Button>
      </Box>
      <Typography
        color="textSecondary"
        sx={{ mt: 3 }}
        variant="body2"
      >
        By submitting this, you agree to the
        {' '}
        <Link
          color="textPrimary"
          href="/policies"
          underline="always"
          variant="subtitle2"
        >
          Privacy and Cookie Policies
        </Link>
        .
      </Typography>
    </form>
  );
};
