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

class WorkItem extends Component {

  state = {
    url: "",
  };

  componentDidMount() {
    const {firebase, data} = this.props;

    firebase.storage
      .refFromURL(data.thumbnail)
      .getDownloadURL()
      .then(function(url) {

        this.setState({
          url,
        })

    }.bind(this)).catch(function(error) {
      // Handle any errors
      console.log(error);
    });
  }

  render() {
    const { classes } = this.props;
    const { name, date, description } = this.props.data;

    return (
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardBody>
                <img src={this.state.url} width="100%" alt="" />
                <h4 className={classes.cartTitle}>{name}</h4>
                <p className={classes.cardCategory}>
                  {description}
                </p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>{date}</div>
              </CardFooter>
            </Card>
          </GridItem>
    );
  }
}

export default withFirebase(withStyles(dashboardStyle)(WorkItem));
