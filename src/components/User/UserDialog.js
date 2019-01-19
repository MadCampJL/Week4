import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Person from "@material-ui/icons/Person";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

import dialogStyle from "assets/jss/material-dashboard-react/components/dialogStyle.js";

const emails = ['username@gmail.com', 'user02@gmail.com'];

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Sign In</DialogTitle>
        <div>
          <List>

            <ListItem>
              <TextField
                required
                id="textfield-email"
                label="Email"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </ListItem>

            <ListItem>
              <TextField
                required
                id="textfield-password"
                label="Password"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </ListItem>

            <ListItem>
              <Button className={classes.buttonSignUp}>
                Sign Up
              </Button>
              <Button variant="contained" color="primary" className={classes.buttonSignIn}>
                Sign In
              </Button>
            </ListItem>

          </List>
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

const SimpleDialogWrapped = withStyles(dialogStyle)(SimpleDialog);

class UserButton extends React.Component {
  state = {
    open: false,
    selectedValue: emails[1],
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {/* <Typography variant="subtitle1">Selected: {this.state.selectedValue}</Typography> */}
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
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </Fragment>
    );
  }
}

export default withStyles(dialogStyle)(UserButton);