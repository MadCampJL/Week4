// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import React, { Component } from "react";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { withFirebase } from "../../components/Firebase";

class DashboardItem extends Component {
  state = {
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

  render() {
    const { classes, workTitle, description, visibility } = this.props;
    if (visibility == true) {
      return (
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardBody>
              <img src={this.state.url} width="100%" alt="" />
              <h4 className={classes.cartTitle}>{workTitle}</h4>
              <p className={classes.cardCategory}>{description}</p>
            </CardBody>
            <CardFooter>
              <div className={classes.stats}>campaign sent 2 days ago</div>
            </CardFooter>
          </Card>
        </GridItem>
      );
    } else {
      return null;
    }
  }
}

export default withFirebase(withStyles(dashboardStyle)(DashboardItem));
