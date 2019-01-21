// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import React, { Component, Fragment } from "react";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import WorkInfo from "../../components/WorkInfo/WorkInfo.jsx";

import { withFirebase } from "../../components/Firebase";

class DashboardItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      workInfoOpen: false,
      wtf: false,
    };
  }

  handleWorkInfoOpen = () => {
    this.setState({
      workInfoOpen: true,
      wtf: true
    });
  }

  handleWorkInfoClose = () => {
    this.setState({
      workInfoOpen: false,
      wtf: false
    });
  }

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
  }

  render() {
    const { classes, visibility, info } = this.props;
    if (visibility == true) {
      return (
        <Fragment>
          <GridItem xs={12} sm={6} md={3} onClick={this.handleWorkInfoOpen}>
            <Card>
              <CardBody>
                <img src={this.state.url} width="100%" alt="" />
                <h4 className={classes.cartTitle}>{info.name}</h4>
                <p className={classes.cardCategory}>{info.description}</p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>campaign sent 2 days ago</div>
              </CardFooter>
            </Card>
            
          </GridItem>
          {this.state.workInfoOpen ?
          <WorkInfo
            open={this.state.workInfoOpen}
            onClose={this.handleWorkInfoClose}
            info={info}
            />
          : null
          }
        </Fragment>
      );
    } else {
      return null;
    }
  }
}

export default withFirebase(withStyles(dashboardStyle)(DashboardItem));
