
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import { useEffect, useState } from "react";


import Button from "@material-ui/core/Button";

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
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
    marginLeft: theme.spacing(5),
  },
}));



export default function Review() {
  const classes = useStyles();
  const retrievedData1 = localStorage.getItem("status1");

  const retrievedData2 = localStorage.getItem("status2");
  
  const [data1,setData1]=useState([]);
  const [data2,setData2]=useState([]);
  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      
      </Typography>
      
      <div className={classes.buttons}>
                <Button onClick={(e)=>{setData1(JSON.parse(retrievedData1)); setData2(JSON.parse(retrievedData2))} } className={classes.button}>
                      Click Here To view Summary
                    </Button>
                 
                </div>

      {/* {{extract()}} */}

      <List disablePadding>
        
          
            {/* <ListItemText primary={product.name} secondary={product.desc} /> */}
            <Typography variant="body2">Owner First Name : {data1[0]}</Typography>
            <Typography variant="body2">Owner Last Name : {data1[1]}</Typography>
            <Typography variant="body2">Owner USN : {data1[2]}</Typography>
            <Typography variant="body2">Owner Email : {localStorage.getItem("currentUserEmail")}</Typography>
            {/* <Typography variant="body2">Owner Phone : {data1[4]}</Typography> */}

            <Typography gutterBottom>Product Details</Typography>
      <Typography gutterBottom>Product Name : {data2[0]}</Typography>
      {/* <Typography gutterBottom>Product Expiry Date : {data2[1]}</Typography> */}
      <Typography gutterBottom>Product Description : {data2[2]}</Typography>

          
        

      </List>
      
    </React.Fragment>
  );
}