import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import CommentBox from "../../views/Test/CommentBox.jsx";
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
    url: "",
    imageFiles: []
  };

  componentDidMount() {
    this.props.firebase.storage
      .refFromURL(this.props.info.thumbnail)
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

    this.props.info.files.map(file => {
      this.props.firebase.storage
        .refFromURL(file)
        .getDownloadURL()
        .then(
          function(url) {
            let joined = this.state.imageFiles.concat(url);
            this.setState({
              imageFiles: joined
            });
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    });
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, info } = this.props;
    let i = 0;
    const imageList = this.state.imageFiles.map(file => (
      <div align="center" key={i++} >
        <img width="90%" src={file} alt={file} />
      </div>
    ));
    return (
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
              {imageList}
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
              <CommentBox info={info} />
              {/* </Paper> */}
            </main>
          </DialogContent>
        </Dialog>
    );
  }
}

export default withFirebase(withStyles(styles)(WorkInfo));
