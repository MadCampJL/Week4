import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import Person from "@material-ui/icons/Person";
import Hidden from "@material-ui/core/Hidden";
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import dialogStyle from "assets/jss/material-dashboard-react/components/dialogStyle.js";

import { withFirebase } from "../Firebase";

class SimpleDialog extends React.Component {

  state = {
    email: "",
    password: ""
  };

  handleClose = () => {
    this.props.onClose();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log(authUser);
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        console.log(error);
        this.setState({ error })
      })

      this.handleClose();
  };

  render() {
    const { classes, onClose, ...other } = this.props;

    const isInvalid =
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.email.indexOf('@') < 0 ||
      this.state.email.indexOf('.') < this.state.email.indexOf('@');

    return (
      <Dialog onClose={this.handleClose} {...other}>
        <div className={classes.main}>
          <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <form className={classes.form} onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input onChange={this.handleChange} id="email" name="email" autoComplete="email" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input onChange={this.handleChange} name="password" type="password" id="password" autoComplete="current-password" />
                </FormControl>
          
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  color="secondary"
                  className={classes.buttonSignUp}
                >
                  Sign up
                </Button>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isInvalid}
                  className={classes.submit}
                >
                  Sign in
                </Button>
              </form>

            </Paper>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withFirebase(withStyles(dialogStyle)(SimpleDialog));

const INITIAL_STATE = {
  open: false,
  email: "",
  password: "",
  remember: false,
  error: null,
};

class UserButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Person"
          className={classes.buttonLink}
          onClick={this.handleClickOpen}
          >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <SimpleDialogWrapped
          open={this.state.open}
          onClose={this.handleClose}
        />
      </Fragment>
    );
  }
}

export default withStyles(dialogStyle)(UserButton);