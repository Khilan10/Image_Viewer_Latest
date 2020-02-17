import React, { Component } from 'react';
import '../../screens/profile/Profile.css'
import '../../common/Header.css'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            loggedInUserData: [],
            dispMenu: 'dispNone',
            open: false,
            anchorEl: null
        }
    }

    componentWillMount() {
        // Get logged in person data
        let that = this;
        let xhrData = new XMLHttpRequest();
        let data = null;
        xhrData.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    loggedInUserData: JSON.parse(this.response).data
                });
            }
        });
        xhrData.open("GET", "https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhrData.send(data);
    }

    profileClickHandler = (event) => {
        if (this.state.dispMenu === "dispNone") {
            this.setState({ dispMenu: "dispBlock" })
        } else {
            this.setState({ dispMenu: "dispNone" })
        }
        if (this.state.open === true) {
            this.setState({ open: false })
        } else {
            this.setState({ open: true })
        }
        if (this.state.ancherEl === null) {
            this.setState({ anchorEl: event.currentTarget });
        } else {
            this.setState({ anchorEl: null })
        }
    }

    logoutClickHandler = (event) => {
        if (this.state.open === true) {
            this.setState({ open: false })
        } else {
            this.setState({ open: true })
        }
        if (this.state.ancherEl === null) {
            this.setState({ anchorEl: event.currentTarget });
        } else {
            this.setState({ anchorEl: null })
        }
        sessionStorage.removeItem("access-token");
        this.props.history.push({
            pathname: '/'
        })
    }

    logoClickHandler = () => {
        this.props.history.push({
            pathname: '/home/'
        })
    }

    render() {
        const id = this.state.open ? "simple-popper" : null;
        return (
            <div>
                <header className="app-header">
                    <div className="header-heading">
                        <span onClick={() => {
                            this.logoClickHandler()
                        }}>Image Viewer</span>
                    </div>
                    <div className="header-right-content">
                        <div className="icon-button">
                            <IconButton className="circle" onClick={(event) => {
                                this.profileClickHandler(event)
                            }}><img src={this.state.loggedInUserData.profile_picture} alt={this.state.loggedInUserData.username} height="36" width="36" className="circle" /></IconButton>
                            <Popper id={id}
                                open={this.state.open} anchorEl={this.state.anchorEl}
                                transition>
                                <ClickAwayListener onClickAway={(event) => { this.profileClickHandler(event) }}>
                                    <Paper className={this.state.dispMenu} style={{
                                        marginTop: '50px', marginLeft: '1240px', width: '140px'
                                    }}>
                                        <MenuList className="dropdown-content" style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                            <MenuItem onClick={(event) => { this.logoutClickHandler(event) }} > <Typography variant="h6" ><span className="bold">Logout</span></Typography></MenuItem>
                                        </MenuList>
                                    </Paper>
                                </ClickAwayListener>
                            </Popper>
                        </div>
                    </div>
                </header>
                <div>I am in Profile Page</div>
            </div>

        )
    }
}

export default Profile;