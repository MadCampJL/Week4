import React, { Component } from "react";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Selectbar from "components/SelectBar/Selectbar.jsx";

class Test extends React.Component {
  state = {
    value: 0,
    type : 'all',
  };



  handleChange = (event, value) => {
      this.setState({ value });
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChangeType = type_select => {
      this.setState({ type : type_select });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div><h3>parent: {this.state.type}</h3></div>
        {/* 셀렉트바...... */}
        <Selectbar onCreate={this.handleChangeType} />
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardBody>
                <img
                  src="http://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg"
                  width="100%"
                  alt=""
                />
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>campaign sent 2 days ago</div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer >
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Test);
