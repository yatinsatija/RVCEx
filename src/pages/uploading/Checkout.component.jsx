import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm.component";
import PaymentForm from "./PaymentForm.component";
import Review from "./Review.component";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { storage, firestore } from "../../firebase/firebase.utils";

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
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
 
}));

const steps = ["Personal Details", "Product details", "Review the Details"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const history = useHistory();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const retrievedData1 = localStorage.getItem("status1");

  const retrievedData2 = localStorage.getItem("status2");

  const [data1,setData1]=useState([]);
  const [data2,setData2]=useState([]);


  
  return (
    
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            RVCEX
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Upload Your Product
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for uploading.
                </Typography>
                <Typography variant="subtitle1">
                  You order has been successfully uploaded . Once we find a correct user we will notify you. This is a great inittiative taken by you . All the best.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e)=>{
                      setData1(JSON.parse(retrievedData1)); 
                      setData2(JSON.parse(retrievedData2));
                  //   firestore
                  //   .collection("uploads")
                    
                  //   .add({
                  //     requestId: localStorage.getItem("request"),
                  //     name: data1[0],
                  //     email: data1[3],
                  //     usn: data1[2],
                  //     productname:data2[0] ,
                  //     description:data2[2],
                  //   })
                  //   .then(function (docRef) {
                  //     console.log("Document written with ID: ", docRef.id);
                  //   })
                  //   .catch(function (error) {
                  //     console.error("Error adding document: ", error);
                  //   });
                  // alert(
                  //   "Your response has been submitted we will reach you in a while"
                  // );
                }}

                    className={classes.button}
                  >
                    Confirm 
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e)=>{
                      // setData1(JSON.parse(retrievedData1)); 
                      // setData2(JSON.parse(retrievedData2));
                    firestore
                    .collection("items")
                    
                    .add({
                      // requestId: localStorage.getItem("request"),
                      description:data2[2],
                      imageUrl:localStorage.getItem("url"),
                      assignedTo:"",

                      interestedUsers: [],
                      isAssigned:false,
                      
                      // usn: data1[2],
                      itemName:data2[0] ,
                      ownerEmail: localStorage.getItem("currentUserEmail"),
                      
                      

                    })
                    .then(function (docRef) {
                      console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function (error) {
                      console.error("Error adding document: ", error);
                    });
                  alert(
                    "Your response has been submitted we will reach you in a while"
                  );
                  
                 history.push('/dashboard');

                }}

                    className={classes.button}
                  >
                    Submit
                  </Button>
                  
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        {/* <Copyright /> */}
      </main>
    </React.Fragment>
  );
}
