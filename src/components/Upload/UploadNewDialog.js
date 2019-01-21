import React from 'react';

import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import TitleIcon from '@material-ui/icons/BubbleChart';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import WritingIcon from '@material-ui/icons/Create';
import DrawingIcon from '@material-ui/icons/Brush';
import PhotoIcon from '@material-ui/icons/PhotoCamera';
import DesignIcon from '@material-ui/icons/Layers';
import MusicIcon from '@material-ui/icons/MusicNote';
import AttachIcon from '@material-ui/icons/AttachFile';

import uploadDialogStyle from "assets/jss/material-dashboard-react/components/uploadDialogStyle";
import UploadDropzone from "./UploadDropzone";

import { withFirebase } from "../Firebase";
import { DialogContent, Divider } from '@material-ui/core';

const INITIAL_STATE = {
  title: "",
  type: "",
  description: "",
  commitMessage: "",
  fileArray: [],
};

class UploadNewDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }


  handleClose = () => {
    this.setState({...INITIAL_STATE});
    this.props.onClose();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpload = (e) => {

  }

  handleNewFile = (acceptedFiles) => {
    this.setState({
      fileArray: acceptedFiles
    });
  }

  handleSignUp = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.props.firebase
          .doRecordUser(authUser, email, password);
        this.handleClose();
      })
      .catch(error => {
        console.log(error);
        this.setState({ error })
      })
      
  };

  handleSignIn = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.handleClose();
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      })
  };

  render() {
    const { classes, onClose, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} maxWidth={false} {...other}>
        <DialogContent>
          <CssBaseline/>
          <main className={classes.layout}>

            <div className={classes.div_title}>
              <Grid container spacing={24}>
                <Grid item xs={8}>
                <TextField
                  className={classes.uploadTitle}
                  id="input-with-icon-textfield"
                  label="Title"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                </Grid>
                <Grid item xs={4}>
                <Button variant="contained" color="primary" className={classes.uploadButton}>
                  Upload
                  <CloudUploadIcon className={classes.uploadButtonIcon} />
                </Button>
                </Grid>
              </Grid>
            </div>

            <Divider/>

            <div>
              <Typography gutterBottom variant="caption" className={classes.typeSelect}>
                Select type
              </Typography>

              <Grid container>
                <Grid item xs={12} sm={2}>
                  <Chip avatar={<Avatar><WritingIcon /></Avatar>} variant="outlined" className={classes.type} label="글" />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Chip avatar={<Avatar><DrawingIcon /></Avatar>} variant="outlined" className={classes.type} label="그림" />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Chip avatar={<Avatar><PhotoIcon /></Avatar>} variant="outlined" className={classes.type} label="사진" />
                </Grid>
                <Grid item xs={12} sm={2}>
                <Chip avatar={<Avatar><DesignIcon /></Avatar>} variant="outlined" className={classes.type} label="디자인" />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Chip avatar={<Avatar><MusicIcon /></Avatar>} variant="outlined" className={classes.type} label="음악" />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Chip avatar={<Avatar><AttachIcon /></Avatar>} variant="outlined" className={classes.type} label="기타" />
                </Grid>
               
              </Grid>
            </div>

            <Divider className={classes.divider}/>

            <UploadDropzone onNewFile={this.handleNewFile}/>
            
            <Divider className={classes.divider}/>

            <div>
              <TextField
                id="textfield-description"
                label="Description"
                placeholder="Lovely work!"
                multiline
                fullWidth
                className={classes.description}
                margin="normal"
                variant="outlined"
              />
              
              <TextField
                id="textfield-commit-message"
                label="Commit Message"
                placeholder="First Commit"
                multiline
                fullWidth
                className={classes.commitMessage}
                margin="normal"
                variant="outlined"
              />
            </div>
          </main>
        </DialogContent>
      </Dialog>
    );
  }
}

UploadNewDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default withFirebase(withStyles(uploadDialogStyle)(UploadNewDialog));