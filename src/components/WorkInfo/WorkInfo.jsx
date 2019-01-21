import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

import { withFirebase } from "../../components/Firebase";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(800 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  description_head: {
    textAlign: "left",
    margin: "5%",
    color: "#828282",
    fontSize: "20px",
    fontWeight: "bold"
  },
  description_body: {
    textAlign: "left",
    margin: "5%",
    color: "#828282"
  },
  div_title: {
    margin: "5%",
    marginTop: "3%"
  },
  textfieldmargin: {
    width: "90%",
    margin: "5%",
    marginBottom: "0"
  },
  commentBox: {
    // border: "solid 1px black",
    width: "90%",
    margin: "5%",
    marginBottom: "4%",
    marginTop: "2%",
    textAlign: "left"
  },
  commentname: {
    fontWeight: "bold",
    fontSize: "14px"
  },
  commentTime: {
    color: "#828282",
    fontSize: "11px",
    marginLeft: "7px"
  },
  commentbody: {
    fontSize: "14px",
    marginTop: "0"
  },
  commentTopInfo: {
    marginBottom: "5px"
  },
  addCommentBtn: {
    marginTop: "10px",
    marginRight: "5%"
  }
});

class WorkInfo extends React.Component {
  state = {
    open: false,
    url: ""
  };

  componentDidMount() {
    this.props.firebase.storage
      .refFromURL(this.props.imgUrl)
      .getDownloadURL()
      .then(
        function(url) {
          this.setState({
            url
          });
        }.bind(this)
      )
      .catch(function(error) {
        // Handle any errors
        console.log(error);
      });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, description, workTitle, info } = this.props;
    return (
      <div>
        {/* <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Open alert dialog
        </Button> */}
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          maxWidth={false}
        >
          <DialogContent>
            <main className={classes.layout}>
              {/* <Paper className={classes.paper}> */}
                <p align="left" className={classes.div_title}>
                  Work of <b>Owner</b>
                </p>
                <Divider />
                <h3 align="left" className={classes.div_title}>
                  {info.name} - Branch Name
                </h3>
                <div align="center">
                  <img
                    width="90%" src={this.state.url}
                    alt="http://jilliantamaki.com/wpcore/wp-content/uploads/2016/02/5-464x446.jpg"
                  />
                </div>
                <React.Fragment>
                  <div className={classes.description_head}>
                    A versatile brand
                    <br />
                    for a company
                    <br />
                    with adaptability
                    <br />
                  </div>
                  <div className={classes.description_body}>
                    {info.description}
                  </div>
                </React.Fragment>
                <Divider />
                <p align="right" style={{ marginRight: "5%" }}>
                  Like??
                </p>
                <p
                  align="left"
                  style={{
                    marginLeft: "5%",
                    marginBottom: "0",
                    marginTop: "0"
                  }}
                >
                  Comments
                </p>
                <TextField
                  className={classes.textfieldmargin}
                  id="outlined-full-width"
                  label="Comment"
                  // style={{ margin: 8 }}
                  placeholder="Add a Comment!"
                  multiline
                  // margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <div style={{ textAlign: "right" }}>
                  <Button variant="outlined" className={classes.addCommentBtn}>
                    Add Comment
                  </Button>
                </div>
                <div className={classes.commentBox}>
                  <div className={classes.commentTopInfo}>
                    <span className={classes.commentname}>Lorem Ipsum</span>
                    <span className={classes.commentTime}>5시간 전</span>
                  </div>
                  <div className={classes.commentbody}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </div>
                </div>
                <div className={classes.commentBox}>
                  <div className={classes.commentTopInfo}>
                    <span className={classes.commentname}>Lorem Ipsum</span>
                    <span className={classes.commentTime}>5시간 전</span>
                  </div>
                  <div className={classes.commentbody}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </div>
                </div>
              {/* </Paper> */}
            </main>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withFirebase(withStyles(styles)(WorkInfo));
