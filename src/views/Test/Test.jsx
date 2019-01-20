import React from "react";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
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
    loading: true
  };

  componentDidMount() {
    workArray = [];
    const db = this.props.firebase.db;
    db.collection("works")
      .where("isRecent", "==", true)
      .get()
      .then(
        function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let tempdata = doc.data();
            tempdata.id = doc.id;
            workArray.push(tempdata);
            console.log(doc.id, " => ", tempdata);
          });
          this.setState({ loading: false });
        }.bind(this)
      )
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
    const workList = workArray.map(info => (
      <DashboardItem
        visibility={ this.state.type == "all" || info.type == this.state.type }
        imgUrl={info.thumbnail}
        description={info.description}
        workTitle={info.name}
        key={info.id}
      />
    ));
    return (
      <div>
        <div />
        {/* 셀렉트바...... */}
        <Selectbar onCreate={this.handleChangeType} />
        {/* <button onClick={this.readExample}>
          클릭하면 데이터베이스에서 읽는다!
        </button> */}
        {/* <div>
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
        </div> */}
        <GridContainer>{workList}</GridContainer>
      </div>
    );
  }
}

export default withFirebase(withStyles(dashboardStyle)(Test));
