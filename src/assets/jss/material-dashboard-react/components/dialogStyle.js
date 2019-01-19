import {
  defaultFont,
} from "assets/jss/material-dashboard-react.jsx";

const dialogStyle = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px",
    margin: "0px"
  },
  buttonLink: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      margin: "10px 15px 0",
      width: "-webkit-fill-available",
      "& svg": {
        width: "24px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px"
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "24px",
        lineHeight: "30px",
        width: "24px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px"
      },
      "& > span": {
        justifyContent: "flex-start",
        width: "100%"
      }
    }
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonSignUp: {
    margin: theme.spacing.unit,
    // width: "12px",
    // height: "8px",
  },
  buttonSignIn: {
    margin: theme.spacing.unit,
    // width: "32px",
    // height: "24px",
  },
  input: {
    display: 'none',
  },

});

export default dialogStyle;