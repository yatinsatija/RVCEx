import React, { Component } from 'react';
import {
    TextField,
    Button
} from '@material-ui/core';
import {auth} from '../../firebase/firebase.utils'
import {withRouter} from 'react-router-dom';

import './signin.styles.scss';

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const {email,password} = this.state;
        
        try{
            const {user} = await auth.signInWithEmailAndPassword(email,password);
            // console.log(user.email);
            alert("Signin successful!\nRedirecting to dashboard");
            this.props.history.push('/dashboard');
            this.setState({email:"",password:""});

        }catch(error){
            alert(error.message)
            console.error(error);
        }

    }

    render() {
        const {email,password} = this.state;

        return (
            <div className='signin-page'>
                <h2 className='heading'>SignIn if you already have an account</h2>
                <form className='signin-form' onSubmit={this.handleSubmit} autoComplete="off">
                    <TextField
                        required
                        id="filled-required-11"
                        label="email"
                        name="email"
                        value={email}
                        type="email"
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br /><br />
                    <TextField
                        required
                        id="filled-required-22"
                        label="password"
                        name="password"
                        value={password}
                        type="password"
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br /><br />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            // onClick={signInWithGoogle}
                        >
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(SignIn)
