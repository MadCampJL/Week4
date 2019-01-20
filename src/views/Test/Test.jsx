import React from "react";
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

import DashboardItem from "./DashboardItem.jsx";

import { withFirebase } from "../../components/Firebase";

let workArray = [];

class Test extends React.Component {
  state = {
    value: 0,
    type: "all",
    email: "",
    fullname: "",
    loading: true,
  };

  componentDidMount() {
    const db = this.props.firebase.db;
    db.collection("works")
      .where("isRecent", "==", true)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let tempdata = doc.data();
          tempdata.id=doc.id;
          workArray.push(tempdata);
          console.log(doc.id, " => ", tempdata);
        });
        this.setState({ loading: false, });
      }.bind(this))
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChangeType = type_select => {
    this.setState({ type: type_select });
  };

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addUser = e => {
    e.preventDefault();
    const db = this.props.firebase.db;
    console.log(db);
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection("users").add({
      fullname: this.state.fullname,
      email: this.state.email
    });
    this.setState({
      fullname: "",
      email: ""
    });
  };

  readExample = e => {
    const db = this.props.firebase.db;
    db.collection("works")
      .where("isRecent", "==", true)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  render() {
    const { classes } = this.props;
    console.log("render workArray: ", workArray);
    const workList = workArray.map(
      info => (<DashboardItem imgUrl={info.thumbnail} workTitle={info.name} key={info.id}/>)
    );
    console.log(workList);
    return (
      <div>
        <div>
          <h3>parent: {this.state.type}</h3>
        </div>
        {/* 셀렉트바...... */}
        <Selectbar onCreate={this.handleChangeType} />
        <button onClick={this.readExample}>
          클릭하면 데이터베이스에서 읽는다!
        </button>
        <div>
          <hr />
          <form onSubmit={this.addUser}>
            <input
              type="text"
              name="fullname"
              placeholder="Full name"
              onChange={this.updateInput}
              value={this.state.fullname}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.updateInput}
              value={this.state.email}
            />
            <button type="submit">Submit</button>
          </form>
          <hr />
        </div>
        {/* <DashboardItem imgUrl="" workTitle="" /> */}
        <GridContainer>
          { workList }
          <GridItem xs={12} sm={12} md={4}>
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
        </GridContainer>
        
      </div>
    );
  }
}

export default withFirebase(withStyles(dashboardStyle)(Test));
