import React, { Component } from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { TextField, Button, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import './signup.styles.scss'

class SignUp extends Component {

    state = {
        name: "",
        usn: "",
        roomNumber: "",
        mobileNumber: "",
        rvceMailId: "",
        password: "",
        confirmPassword: ""
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { rvceMailId, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert("Password and confirm password aren't matching");
            return;
        }

        if(rvceMailId.split("@")[1]!=="rvce.edu.in"){
            alert("Enter rvce mail id only");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(rvceMailId, password);

            await createUserProfileDocument(user,
                {
                    ...this.state,
                    tokens: 10
                })
            
            alert("Signup successful!\nRedirecting to dashboard");

            this.setState({
                name: "",
                usn: "",
                mobileNumber: "",
                rvceMailId: "",
                password: "",
                confirmPassword: "",
                socialMediaHandle:""
            })
            this.props.history.push('/dashboard');


        } catch (error) {
            alert(error.message)
            console.error(error);
        }

    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const { name, usn, socialMediaHandle, mobileNumber,
            rvceMailId, password, confirmPassword } = this.state;

        return (
            <div className='signup-page'>
                <h2 className='heading'>SignUp if are new to RVCEx</h2>
                <form className='signup-form' onSubmit={this.handleSubmit} autoComplete="off">
                    <TextField
                        required
                        id="filled-required-1"
                        label="Name"
                        name="name"
                        value={name}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-2"
                        label="USN"
                        name="usn"
                        value={usn}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    
                    <TextField
                        required
                        id="filled-required-4"
                        label="Mobile Number"
                        name="mobileNumber"
                        value={mobileNumber}
                        type="number"
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-4"
                        label="Any Scial Media Handle"
                        name="socialMediaHandle"
                        value={socialMediaHandle}
                        // type="number"
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-5"
                        label="rvce mail id"
                        name="rvceMailId"
                        value={rvceMailId}
                        type="email"
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-6"
                        label="Password"
                        name="password"
                        value={password}
                        type="password"
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-7"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        type="password"
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Sign Up with RVCEx
                    </Button>

                </form>
            </div>
        )
    }
}

export default withRouter(SignUp);
