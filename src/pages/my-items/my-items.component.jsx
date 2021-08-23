import React, { Component } from 'react';
import { firestore } from '../../firebase/firebase.utils';

import {
    Grid,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    DialogContent
} from '@material-ui/core';

class Myitems extends Component {
    constructor(props){
        super(props);
        if (!localStorage.getItem("currentUserEmail")) {
            alert("Please login to view this page")
            this.props.history.push("/signin")
        }
        this.state = {
            ownerItems: [],
            seeInteresredUsers: false
        }
    }
    



    async componentDidMount() {
        
        const itemsSnapShot = await firestore.collection("items").get();
        const docsArray = itemsSnapShot.docs;
        const allItems = docsArray.map(doc => ({...doc.data(),id:doc.id}));
        const ownerItems = allItems.filter(docData => docData.ownerEmail === localStorage.getItem("currentUserEmail"))
        this.setState({ ownerItems });
    }

    handleMailer = (userEmail,item) => {
        const {ownerEmail,itemName,imageUrl,id}=item;
        
        
        fetch('https://rvcexbackend.herokuapp.com/mail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail,ownerEmail,itemName,imageUrl})
        })
        .then(async(res) => res.text())
        .then(async ({message,error}) => {
            if(error===true){
                console.log(message);
                alert(message);
                return;
            } else {
                alert(`Successfully sent mail to ${userEmail}`);

                
                    var itemRef = await firestore.collection("items").doc(id);
                    itemRef.update({
                        isAssigned:true,
                        assignedTo:userEmail
                    })
                    .then(() => {
                        console.log("Document successfully updated");
                        alert("Document successfully updated");
                        window.location.reload();
                    })
                    .catch(err => alert(err.message))
                
            }
        })

    }

    


    render() {
        console.log(this.state.ownerItems);
        if (this.state.ownerItems) {
            return (
                <Grid style={{ marginTop: "10%" }} container spacing={1}>
                    {
                        this.state.ownerItems.map((item,i) => (
                            <Grid item xs={3} key={i} >
                                <Card style={{ height: "400px" ,paddingTop:"30px"}}>
                                    <CardActionArea>
                                        <img  src={item.imageUrl} alt='' style={{ height: "200px", width: "170px" }} />
                                        <CardContent>
                                            <Typography><u>Item Name:</u> {item.itemName}</Typography>
                                            <Typography><u>Desription</u><br />{item.description}</Typography>
                                        </CardContent>
                                        <Dialog
                                            style={{}}
                                            onClose={() => this.setState({ seeInteresredUsers: false })}
                                            open={this.state.seeInteresredUsers && this.state.itemName === item.itemName}>
                                            <DialogTitle id="simple-dialog-title">Interested Users</DialogTitle>
                                            <DialogContent>
                                                {
                                                    this.state.seeInteresredUsers && this.state.itemName === item.itemName &&

                                                    ( item.isAssigned===false 
                                                        ?
                                                            (
                                                                item.interestedUsers.length > 0 
                                                                ?
                                                                item.interestedUsers.map(userEmail => 
                                                                        <Button onClick={() => this.handleMailer(userEmail,item)} variant="contained">Assign to {userEmail}</Button>       
                                                                )
                                                                :
                                                                <Typography>No one interested yet</Typography>
                                                            )
                                                        :

                                                        <Typography>Already assigned to {item.assignedTo}</Typography>
                                                    )

                                                }
                                            </DialogContent>
                                        </Dialog>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ backgroundColor: "#56b5e8" }}
                                            type="button"
                                            onClick={() => this.setState({
                                                seeInteresredUsers: true,
                                                itemName: item.itemName
                                            })}
                                        >
                                            See Interested Users
                                        
                                </Button>
                                    </CardActionArea>
                                </Card>

                            </Grid>
                        ))
                    }

                </Grid>
            )
        } else {
            return (
                <h2>No items found under your name</h2>
            )
        }


    }
}

export default Myitems
