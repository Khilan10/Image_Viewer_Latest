import React, { Component } from 'react';
import './Login.css';
import Header from '../../common/header/Header';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            usernameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone"
        }
    }
    render() {
        return (
            <div>
                <Header>
                </Header>
                <Card className="card">
                    <CardContent style={{ padding: '10%', width: '100%' }}>
                        <FormControl>
                            <Typography variant="h4">LOGIN</Typography>
                        </FormControl>
                        <br /><br />
                        <FormControl fullWidth required>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired} >
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl fullWidth required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="username" type="password" username={this.state.password} onChange={this.inputPasswordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br /><br />
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        <br /><br /><br />
                    </CardContent>
                </Card>
            </div >
        )
    }
}
export default Login;