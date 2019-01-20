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

class DashboardItem extends Component {
  render() {
    const { classes, imgUrl, workTitle, keykey } = this.props;
    return (
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardBody>
                <img src={imgUrl} width="100%" alt="" />
                <h4 className={classes.cartTitle}>{workTitle}</h4>
                <p className={classes.cardCategory}>
                  {keykey}
                </p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>campaign sent 2 days ago</div>
              </CardFooter>
            </Card>
          </GridItem>
    );
  }
}

export default withStyles(dashboardStyle)(DashboardItem);
