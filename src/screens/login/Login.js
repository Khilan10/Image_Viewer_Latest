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

//https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784

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

    inputUsernameChangeHandler = (e) => {
        this.setState({ usernameTyped: e.target.value });
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ passwordTyped: e.target.value });
    }

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