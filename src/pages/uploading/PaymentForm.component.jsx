import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import { storage, firestore } from "../../firebase/firebase.utils";
import ImageUpload from "./imageupload.component";
// 
const handleChange=(event)=> {

  const file = Array.from(event.target.files);
  this.setState({ file });   
}
const fileuploadHandler = () => {

  const storageRef = storage().ref();
this.state.file.forEach((file) => {
  storageRef
      .child(`images/${file.name}`)
      .putFile(file).then((snapshot) => {
  })
});
}

export default function PaymentForm() {
  const [productname, setProductname] = useState("");
  const [expirydate, setExpiryDate] = useState("");
  const [description,setDescription]=useState("");
  var status2 = [productname,expirydate,description];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Product Details
      </Typography>
      <Grid container spacing={3}>
        
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="product-name"
            label="Product Name"
            fullWidth
            // autoComplete="cc-number"
            onChange={(e) => {
              setProductname(e.target.value);
              // localStorage.setItem("First",firstname);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Description
      </Typography>
        <textarea
                      className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                      id="description"
                      name="description"
                      rows="5"
                      cols="55"
                      label="Description"
                      onChange={(e) => {
                        setDescription(e.target.value);
                        localStorage.setItem("status2", JSON.stringify(status2));
                        
                      }}
                     
                    ></textarea>
        </Grid>
        <Grid item xs={12}>
        <label className="fileUploaderContainer">
        <Typography variant="h6" gutterBottom>
        Click here to upload Images<br/>
      </Typography>
            
           
             <ImageUpload />
          </label>
        </Grid>
        

      </Grid>
    </React.Fragment>
  );
}
