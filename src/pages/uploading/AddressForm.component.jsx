import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { useEffect, useState } from "react";


export default function AddressForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [usn, setUSN] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  var status1 = [firstname,lastname,usn,email,phone];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            onChange={(e) => {
              setFirstname(e.target.value);
              // localStorage.setItem("First",firstname);
            }}
            fullWidth
            // autoComplete="given-name"
            // script={console.log(firstName)}
          />
          
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            // fullWidth
            // autoComplete="family-name"
            onChange={(e) => {
              setLastname(e.target.value);
              // localStorage.setItem("Last",lastname);
            }}
          />
          
        </Grid>
       
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="usn"
            name="usn"
            label="USN"
            fullWidth
            onChange={(e) => {
              setUSN(e.target.value);
              // localStorage.setItem("USN",usn);
              
            }}
            // autoComplete="shipping address-level2"
          />
        </Grid>
       
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            onChange={(e) => {
              setPhone(e.target.value);
              // localStorage.setItem("Phone",phone);
              localStorage.setItem("status1", JSON.stringify(status1));

            }}
            // autoComplete="shipping postal-code"
          />
        </Grid>
      
      </Grid>
    </React.Fragment>
  );
}
