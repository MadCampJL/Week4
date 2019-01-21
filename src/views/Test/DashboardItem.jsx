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

import WorkInfo from "../../components/WorkInfo/WorkInfo.jsx";

import { withFirebase } from "../../components/Firebase";

class DashboardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      work_info_open: false
    };
    this.toggleWorkInfo = this.toggleWorkInfo.bind(this);
  }

  toggleWorkInfo() {
    this.setState(state => ({
      work_info_open: !state.work_info_open
    }));
  }

  handleWorkInfoOpen = () => {
    this.setState({
      work_info_open: true,
    });
  }

  handleWorkInfoClose = () => {
    this.setState({
      work_info_open: false,
    })
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
          <WorkInfo
            open={this.state.work_info_open}
            onClose={this.handleWorkInfoClose}
            info={info}/>
        </GridItem>
      );
    } else {
      return null;
    }
  }
}

export default withFirebase(withStyles(dashboardStyle)(DashboardItem));
