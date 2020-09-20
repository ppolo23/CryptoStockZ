import React from 'react';
import './PopUp.css';
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import { Image } from "react-bootstrap";
import Meta from "../../Images/metamask.png";
import SignUpPopUp from './SignUpPopUp';
import { withCookies } from 'react-cookie';

import { SigninUser } from '../../services/BackendService';

class SignInPopup extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            showSignUpPopup: false,
            showSignInPopup: true,
            username: "",
            password: ""
        };
    }

    handleChange(e) {
        if(e.target.id === "formBasicUsername") {
            this.setState({username: e.target.value});
        }else if(e.target.id === "formBasicPassword") {
            this.setState({password: e.target.value});
        }else if(e.target.id === "handlePopUp") {
            this.setState({
                showSignUpPopup: !this.state.showSignUpPopup,
                showSignInPopup: !this.state.showSignInPopup
            })
        }
    }

    signInUser() {

        SigninUser(this.state.username,this.state.password)
        .then(function(response) {

            const { cookies } = this.props;

            var expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 1);

            const options = {path:'/', expires: expiresAt};

            cookies.set("x-access-token", response.data.accessToken,options);
            cookies.set("username", response.data.username,options);
            cookies.set("roles", response.data.roles[0],options);

            console.log(response.data);
            window.location = "/profile"
        }.bind(this)
        ).catch(error => {
            alert("Something was wrong, review your credentials. " + error)
        });
    }

    SignInForm() {
        const isEnabled = this.state.username.length > 0 && this.state.password.length > 0;
        const username = this.state.username;
        const password = this.state.password;
        const showSignInPopup = this.state.showSignInPopup;
        return (
        <div className="container">
            <Form>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" value={username}
                                          onChange = {this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password}
                                          onChange = {this.handleChange}/>
                        </Form.Group>
                    </Grid>
                    <Grid item md={6}>
                        <Image style={{width: '250px', height: '250px'}} src={Meta} alt="Icono_Meta" className="rounded mx-auto d-block"/>
                    </Grid>
                    <Grid item md={4}>
                        <Button color="primary" onClick={(event) => this.signInUser(event)} disabled={!isEnabled}>Log In</Button>
                    </Grid>
                    <Grid item md={6}>
                        <Button color="success" id="handlePopUp" value={showSignInPopup}
                                onClick={this.handleChange}>Sign Up</Button>
                        {this.state.showSignUpPopup ?
                        <SignUpPopUp closeSignInPopup={this.handleChange}/>
                        : null
                        }
                    </Grid>
                    <Grid item md={2}>
                        <Button color="warning" onClick={this.props.closePopup}>Close</Button>
                    </Grid>
                </Grid>
            </Form>
        </div>
        );
    };

    render() {
        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    {this.SignInForm()}
                </div>
            </div>
        );
    }
}

export default withCookies(SignInPopup);
