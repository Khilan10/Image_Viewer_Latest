import React, { Component } from 'react';
import './Login.css';
import '../../common/Header.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

//dummy password and username is upgrad
//to login in application please login with:
// upgrad as username and upgrade as password
class Login extends Component {

    constructor() {
        super();
        this.state = {
            usernameTyped: "",
            usernameRequired: "dispNone",
            passwordTyped: "",
            passwordRequired: "dispNone",
            username: "upgrad",
            password: "upgrad",
            accessToken: "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784",
            loginFailed: "dispNone"
        }
    }

    //this is called on change of username
    inputUsernameChangeHandler = (e) => {
        this.setState({ usernameTyped: e.target.value });
    }

    //this method is called on click of password
    inputPasswordChangeHandler = (e) => {
        this.setState({ passwordTyped: e.target.value });
    }

    //this method is called on click of login button
    //this will set the acces Token in the sesson storage
    //For checking the username and password are correct they are check
    //against the dummy password and username
    //this will route the page to Home page
    loginClickHandler = () => {
        this.state.usernameTyped === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.passwordTyped === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        if (this.state.usernameTyped !== "" && this.state.passwordTyped !== "") {
            if (this.state.usernameTyped === this.state.username && this.state.passwordTyped === this.state.password) {
                sessionStorage.setItem("access-token", this.state.accessToken);
                this.setState({ loginFailed: "dispNone" });
                this.props.history.push({
                    pathname: '/home/'
                })
            } else {
                this.setState({ loginFailed: "dispBlock" });
            }
        }
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <div className="header-heading">
                        Image Viewer
            </div>
                </header>
                <Card className="card">
                    <CardContent style={{ padding: '10%', width: '100%' }}>
                        <FormControl>
                            <Typography variant="h4">LOGIN</Typography>
                        </FormControl>
                        <br /><br /><br />
                        <FormControl fullWidth required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" username={this.state.usernameTyped} onChange={this.inputUsernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired} >
                                <span className="red"><Typography variant="subtitle1">required</Typography></span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl fullWidth required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" password={this.state.passwordTyped} onChange={this.inputPasswordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}>
                                <span className="red"><Typography variant="subtitle1">required</Typography></span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl>
                            <FormHelperText className={this.state.loginFailed}>
                                <span className="red"><Typography variant="subtitle1">Incorrect username and/or password</Typography></span>
                                <br />
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}><Typography variant="subtitle1">LOGIN</Typography></Button>
                        <br /><br /><br />
                    </CardContent>
                </Card>
            </div >
        )
    }
}
export default Login;