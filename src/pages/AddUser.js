import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddUser = () => {
  const classes = useStyles();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const newUser = {
      fullName,
      email,
      birthday,
      password,
    };

    console.log(newUser);

    // send new user data to the backend
  };

  return (
    <div>
      <Typography component="h1" variant="h5">
        Add User
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              value={fullName}
              onChange={event => setFullName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="birthday"
              label="Birthday"
              name="birthday"
              type="date"
              value={birthday}
              onChange={event => setBirthday(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add User
        </Button>
      </form>
    </div>
  );
};

export default AddUser;