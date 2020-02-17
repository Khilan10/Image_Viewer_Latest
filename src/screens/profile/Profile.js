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
import EditIcon from '@material-ui/icons/EditRounded';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


class Profile extends Component {

    constructor() {
        super();
        this.state = {
            loggedInUserData: [],
            numberOfPosts: 0,
            follows: 0,
            followedBy: 0,
            dispMenu: 'dispNone',
            open: false,
            anchorEl: null,
            openModal: false,
            requiredUsername: 'dispNone',
            fullName: '',
            fullNameEdit: '',
            postData: []
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
                    loggedInUserData: JSON.parse(this.responseText).data
                });
                console.log("checking state" + that.state.loggedInUserData);
                that.setState({
                    numberOfPosts: that.state.loggedInUserData.counts.media
                })
                that.setState({
                    follows: that.state.loggedInUserData.counts.follows
                })
                that.setState({
                    followedBy: that.state.loggedInUserData.counts.followed_by
                })
                that.setState({
                    fullName: that.state.loggedInUserData.full_name
                })
            }
        });
        xhrData.open("GET", "https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhrData.send(data);

        //Get the post data
        let xhrPostData = new XMLHttpRequest();
        let postData = null;
        xhrPostData.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    postData: JSON.parse(this.responseText)
                })
            }
        })
        xhrPostData.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhrPostData.send(postData);

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

    openEditModalHandler = () => {
        if (this.state.openModal === true) {
            this.setState({ openModal: false })
        } else {
            this.setState({ openModal: true })
        }
    }

    closeEditModalHandler = () => {
        if (this.state.openModal === true) {
            this.setState({ openModal: false })
        }
        this.setState({ requiredUsername: 'dispNone' })
    }

    inputFullNameChangeHandler = (event) => {
        let NameEdit = event.target.value
        this.setState({ fullNameEdit: NameEdit })
    }

    updateClickHandler = () => {
        let NameEdit = this.state.fullNameEdit;
        console.log("checking full name edit:" + NameEdit);
        if (NameEdit !== '') {
            this.setState({ fullName: NameEdit })
            this.setState({ requiredUsername: 'dispNone' })
            this.setState({ fullNameEdit: '' })
            this.setState({ openModal: false })
        } else {
            this.setState({ requiredUsername: 'dispBlock' })
            this.setState({ fullNameEdit: '' })
        }
    }


    render() {
        let pdata = this.state.postData;
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
                <div className="information-section">
                    <div className="profile-image">
                        <img src={this.state.loggedInUserData.profile_picture} alt={this.state.loggedInUserData.username} height="50px" width="50px" className="circle" />
                    </div>
                    <div className="right-information">
                        <span className="user-name">{this.state.loggedInUserData.username}</span>
                        <div className="display-row">
                            <span className="small">Posts: {this.state.numberOfPosts}</span>
                            <span className="small">Follows: {this.state.follows}</span>
                            <span className="small">Followed By: {this.state.followedBy}</span>
                        </div>
                        <div className="full-name">
                            <span className="full-name-size">{this.state.fullName}</span>
                            <IconButton style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#f50057' }} onClick={() => { this.openEditModalHandler() }} >
                                <EditIcon variant='fab' style={{ color: 'white', fontSize: '12px' }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal open={this.state.openModal} className="edit-modal" paperprops={{ tabIndex: -1 }} >
                        <ClickAwayListener onClickAway={() => { this.closeEditModalHandler() }} >
                            <Card tabIndex={-1}>
                                <CardContent>
                                    <FormControl>
                                        <Typography variant="h4">EDIT</Typography>
                                    </FormControl>
                                    <br /><br /><br />
                                    <FormControl fullWidth required>
                                        <InputLabel htmlFor="fullnameEdit">Full Name</InputLabel>
                                        <Input id="fullnameEdit" type="test" onChange={this.inputFullNameChangeHandler} name="fufullnameEdit" />
                                        <FormHelperText className={this.state.requiredUsername}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                    </FormControl>
                                    <br /><br />
                                    <Button variant="contained" color="primary" onClick={this.updateClickHandler}>Update</Button>
                                    <br /><br />
                                </CardContent>
                            </Card>
                        </ClickAwayListener>
                    </Modal>
                </div>
                <div className="image-post">
                    <GridList cellHeight={300} cols={3}>
                        {pdata.data != null && pdata.data.map((tile) => (
                            <GridListTile key={tile.caption.id} cols={tile.cols || 1}>
                                <img src={tile.images.standard_resolution.url} alt={tile.caption.id} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div >

        )
    }
}

export default Profile;