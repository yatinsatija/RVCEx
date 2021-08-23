import React from 'react';
import SignIn from '../../components/signin/signin.component';
import SignUp from '../../components/signup/signup.component';
import './signin-signup.styles.scss';
import Particles from 'react-particles-js';

function SignInSignUp() {
    return (
        <div className='signin-signup-page-container'>


            <div className='signin-signup-page'>
                <SignIn />
                <SignUp />
            </div>

            <Particles
                height="99.5vh"
                width="95vw"
                params={{
                    particles: {
                        number: {
                            value: 200,
                            density: {
                                enable: true,
                                value_area: 1000,
                            },
                        },
                    },
                }}
            />
        </div>
    )
}

export default SignInSignUp
