import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { firestore } from "../../firebase/firebase.utils";
import firebase from "../../firebase/firebase.utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 305,
    height: 390,
    "&:hover": {
      boxShadow: "10px 10px 10px 0px rgba(0, 0, 0, 0.64)",
      marginLeft: "-3px",
      marginTop: "-2px",
      transitionDuration: 200,
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  dialog: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    flexDirection: "column",
    display: "flex",
  },
  poster: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "20rem",
    },
    width: "100%",
  },
  content: {
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
    width: "100%",
    padding: "1%",
  },
}));

export default function ItemCard(props) {
  const classes = useStyles();
  const prefersDarkMode = localStorage.getItem("darkMode") === "true";
  let loggedIn = localStorage.getItem("token") !== null;
  let useremail = localStorage.getItem("email");
  let userType = localStorage.getItem("token");
  console.log(loggedIn);

  const [eventDialog, setEventDialog] = React.useState(false);

  const applyForJob = () => {
    let job = firestore
      .collection("jobs")
      .doc(`${props.event.name}` + "-" + `${props.event.title}`);
    if (job === null) return;
    job.get().then((doc) => {
      console.log(doc.data().desc);
      let applicants = doc.data().applicants;
      applicants[applicants.length] = useremail;
      console.log(applicants);
      job.update({
        applicants: applicants,
      });
    });
  };

  const handleInterest = (id) => {
    var itemRef = firestore.collection("items").doc(id);

    itemRef
      .update({
        interestedUsers: firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem("currentUserEmail")
        ),
      })
      .then(() => {
        var currentUserRef = firestore.doc(
          `users/${localStorage.getItem("currentUserEmail")}`
        );
        currentUserRef
          .update({
            tokens: firebase.firestore.FieldValue.increment(-5),
          })
          .then((res) => {
            alert(
              "Interest saved successfully and debited 5 tokens from your account"
            );
          });
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

  return (
    <div>
      <Card
        className={classes.root}
        onDoubleClick={() => setEventDialog(true)}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: prefersDarkMode ? "#717171" : "azure",
          cursor: "pointer",
        }}
      >
        <CardHeader title={props.event.itemName} />

        <DialogContent>
          <div className={classes.poster}>
            <img
              src={props.event.imageUrl}
              alt=""
              style={{ backgroundSize: "contain", width: "inherit" }}
            />
          </div>
        </DialogContent>
        <CardActions disableSpacing style={{ marginTop: "auto" }}>
          <Button size="small" onClick={() => setEventDialog(true)}>
            Read More
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={Boolean(eventDialog)}
        onClose={() => setEventDialog(false)}
        scroll="body"
        variant="fade"
      >
        <DialogTitle>
          <u>ItemName: </u>
          {props.event.itemName}
        </DialogTitle>
        <DialogTitle>
          <u>ownerEmail: </u>
          {props.event.ownerEmail}
        </DialogTitle>
        <DialogContent>
          <div className={classes.dialog}>
            <div>
              <u>Description: </u>
              {props.event.description}
            </div>
          </div>
          <Button
            type="button"
            style={{ backgroundColor: "#56b5e8" }}
            onClick={() => handleInterest(props.event.id)}
          >
            Interested
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
