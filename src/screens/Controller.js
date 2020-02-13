import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../screens/login/Login';
import Home from '../screens/home/Home';
import { Redirect } from 'react-router';

class Controller extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' render={(props) => <Login {...props} />} />
                    <Route exact path='/home/' render={(props) => (sessionStorage.getItem('access-token') ?
                        <Home  {...props} /> : <Redirect to='/' />)} />
                </div>
            </Router>
        )
    }
}
export default Controller;
