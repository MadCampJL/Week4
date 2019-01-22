import React from "react";
// @material-ui/core
import ReactSwipe from "react-swipe";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withFirebase } from "../../components/Firebase";
import { Select } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  left: {
    float: "left",
    width: "5%",
    border: "1px solid black"
  },
  right: {
    float: "left",
    width: "5%",
    border: "1px solid black"
  },
  center: {
    float: "left",
    width: "80%",
    border: "1px solid black",
    marginRight: "0px"
  }
});

class Discover extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    let reactSwipeEl;
    return (
      <div class="row">
        <div className={classes.left}>
          <button onClick={() => reactSwipeEl.next()}>Next</button>
        </div>
        <div className={classes.centre}>
          <ReactSwipe
            className="carousel"
            swipeOptions={{ continuous: false }}
            ref={el => (reactSwipeEl = el)}
          >
            <div>
              <img
                src="https://i.kinja-img.com/gawker-media/image/upload/s--Q5Y8OMOm--/c_scale,f_auto,fl_progressive,q_80,w_800/mipwoljips0zpr3jocmm.jpg"
                width="50%"
              />
            </div>
            <div>
              <img
                src="http://media.comicbook.com/2016/04/ashpikachu2-179993.jpg"
                width="50%"
              />
            </div>
            <div>
              <img src="http://i.imgur.com/DJY6Lz2.png" width="50%" />
            </div>
          </ReactSwipe>
        </div>
        <div className={classes.right}>
          <button onClick={() => reactSwipeEl.prev()}>Prev</button>
        </div>
      </div>
    );
  }
}

export default withFirebase(withStyles(styles)(Discover));
