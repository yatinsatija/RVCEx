import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import Axios from "axios";
import { useEffect, useState } from "react";


// import "tachyons";

import "./landingpage.styles.scss";
import Leaderboard from "./leaderboard/leaderboard.component";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://firebasestorage.googleapis.com/v0/b/rvcex-88dc4.appspot.com/o/userPhotoIds%2Flanding.jpg?alt=media&token=412b89f0-cddc-47fb-8f55-85890fe72bd7)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  dialog: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    flexDirection: "column",
    display: "flex",
  },
  // @media (min-width: 960px)

}));
// @media (min-width: 960px)
// <style>
// .MuiGrid-grid-md-5 {
//     flex-grow: 0;
//     max-width: 41.666667%;
//     flex-basis: 41.666667%;
// }

export default function SignInSide() {
  const classes = useStyles();
  //   const name = localStorage.getItem("name");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const req = Math.floor(Math.random() * 10000 + 1).toString(10);
  const [eventDialog, setEventDialog] = React.useState(false);

  var e = "";
  const [a, setA] = useState("");



  return (
    <Grid container component="main"  className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} style={{backgroundImage:"url(https://images.pexels.com/photos/326311/pexels-photo-326311.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)"}} sm={8} md={5} component={Paper} elevation={6} square>
        <div className="cover">
          <Leaderboard />
        </div>
      </Grid>
    </Grid>
  );
}
