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
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
            postData: [],
            imageOpen: false,
            imageClickedUrlModal: [],
            profilePictureModal: [],
            usernameModal: [],
            captionModal: [],
            tagModal: [],
            userCommentModal: [],
            displayUserCommentModal: [],
            userCommentModalCopy: [],
            commentRequiredModal: [],
            NoOfLikesModal: [],
            indexOfPostClickedModal: 0,
            likeModal: [],
            likedModal: []

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
                let length = that.state.postData.data.length
                console.log("lenght:" + length);
                let imageClickedUrlModalInitial = [];
                let profilePictureModalInitial = [];
                let usernameModalInitial = [];
                let captionModalInitial = [];
                let tagModalInitial = [];
                let likeModalInitial = [];
                let likedModlaInitial = [];
                let NoOfLikesModalInitial = [];
                let userCommentModalInitial = [];
                let commentRequiredModalInitial = [];
                let userCommentModalCopyInitial = [];
                let displayUserCommentModalInitial = [];

                for (var i = 0; i < length; i++) {
                    imageClickedUrlModalInitial[i] = that.state.postData.data[i].images.standard_resolution.url;
                    profilePictureModalInitial[i] = that.state.postData.data[i].user.profile_picture;
                    usernameModalInitial[i] = that.state.postData.data[i].user.username;
                    captionModalInitial[i] = that.state.postData.data[i].caption.text.split('#')[0];
                    tagModalInitial[i] = that.state.postData.data[i].tags;
                    likeModalInitial[i] = "dispBlock";
                    likedModlaInitial[i] = "dispNone";
                    NoOfLikesModalInitial[i] = that.state.postData.data[i].likes.count;
                    userCommentModalInitial[i] = '';
                    commentRequiredModalInitial[i] = "dispNone";
                    userCommentModalCopyInitial[i] = ''
                    displayUserCommentModalInitial[i] = "dispNone";
                }

                that.setState({ imageClickedUrlModal: imageClickedUrlModalInitial })
                that.setState({ profilePictureModal: profilePictureModalInitial })
                that.setState({
                    usernameModal: usernameModalInitial
                })
                that.setState({
                    captionModal: captionModalInitial
                })
                that.setState({
                    tagModal: tagModalInitial
                })
                that.setState({
                    likeModal: likeModalInitial
                })
                that.setState({
                    likedModal: likedModlaInitial
                })
                that.setState({
                    NoOfLikesModal: NoOfLikesModalInitial
                })
                that.setState({
                    userCommentModal: userCommentModalInitial
                })
                that.setState({
                    commentRequiredModal: commentRequiredModalInitial
                })
                that.setState({
                    userCommentModalCopy: userCommentModalCopyInitial
                })
                that.setState({
                    displayUserCommentModal: displayUserCommentModalInitial
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

    openPostModal = (index) => {
        this.setState({ indexOfPostClickedModal: index });
        this.setState({ imageOpen: true });
        console.log("index:" + index);
        console.log("checking index:" + this.state.indexOfPostClickedModal);
        console.log("image url" + this.state.imageClickedUrlModal[this.state.indexOfPostClickedModal]);
    }

    closePostModal = () => {
        this.setState({ imageOpen: false });
        let commentRequiredModalClose = [];
        let len = this.state.postData.data.length;
        for (var p = 0; p < len; p++) {
            commentRequiredModalClose[p] = "dispNone";
        }
        this.setState({ commentRequiredModal: commentRequiredModalClose })
    }

    likeClickModalHandler = (index) => {
        let likeModalEdit = [];
        let likedModalEdit = [];
        let NoOfLikesModalEdit = [];

        let len = this.state.postData.data.length;
        for (var j = 0; j < len; j++) {
            likeModalEdit[j] = this.state.likeModal[j];
            likedModalEdit[j] = this.state.likedModal[j];
            NoOfLikesModalEdit[j] = this.state.NoOfLikesModal[j];
        }
        likeModalEdit[index] = 'dispNone';
        likedModalEdit[index] = 'dispBlock';
        NoOfLikesModalEdit[index] = NoOfLikesModalEdit[index] + 1;
        this.setState({
            likeModal: likeModalEdit
        })
        this.setState({
            likedModal: likedModalEdit
        })
        this.setState({
            NoOfLikesModal: NoOfLikesModalEdit
        })
    }

    unlikeClickModalHandler = (index) => {
        let likeModalEdit = [];
        let likedModalEdit = [];
        let NoOfLikesModalEdit = [];

        let len = this.state.postData.data.length;
        for (var j = 0; j < len; j++) {
            likeModalEdit[j] = this.state.likeModal[j];
            likedModalEdit[j] = this.state.likedModal[j];
            NoOfLikesModalEdit[j] = this.state.NoOfLikesModal[j];
        }
        likeModalEdit[index] = 'dispBlock';
        likedModalEdit[index] = 'dispNone';
        NoOfLikesModalEdit[index] = NoOfLikesModalEdit[index] - 1;
        this.setState({
            likeModal: likeModalEdit
        })
        this.setState({
            likedModal: likedModalEdit
        })
        this.setState({
            NoOfLikesModal: NoOfLikesModalEdit
        })
    }

    inputCommentModalChangeHandler = (value, index) => {
        let userCommentModalCopyEdit = [];
        let len = this.state.postData.data.length;
        for (var k = 0; k < len; k++) {
            userCommentModalCopyEdit[k] = this.state.userCommentModalCopy[k]
        }
        userCommentModalCopyEdit[index] = value;
        this.setState({
            userCommentModalCopy: userCommentModalCopyEdit
        })
    }

    addCommentModalClickHandler = (index) => {
        let commentRequiredModalEdit = [];
        let userCommentModalEdit = [];
        let displayUserCommentModalEdit = [];
        let len = this.state.postData.data.length;
        for (var l = 0; l < len; l++) {
            commentRequiredModalEdit[l] = "dispNone";
            userCommentModalEdit[l] = this.state.userCommentModal[l];
            displayUserCommentModalEdit[l] = this.state.displayUserCommentModal[l];
        }
        console.log("checking added value:" + this.state.userCommentModalCopy[index]);
        if (this.state.userCommentModalCopy[index] !== '') {
            commentRequiredModalEdit[index] = "dispNone";
            userCommentModalEdit[index] = this.state.userCommentModalCopy[index];
            this.setState({
                userCommentModal: userCommentModalEdit
            })
            this.setState({
                commentRequiredModal: commentRequiredModalEdit
            })
            displayUserCommentModalEdit[index] = "dispBlock";
            this.setState({
                displayUserCommentModal: displayUserCommentModalEdit
            })
            console.log("checing user comment array" + this.state.userCommentModal[index]);
        } else {
            commentRequiredModalEdit[index] = "dispBlock"
            this.setState({
                commentRequiredModal: commentRequiredModalEdit
            })
        }
        // if (this.state.userCommentModal[index] !== '') {
        //     displayUserCommentModalEdit[index] = "dispBlock";
        //     this.setState({
        //         displayUserCommentModal: displayUserCommentModalEdit
        //     })
        // } else {
        //     displayUserCommentModalEdit[index] = "dispNone";
        //     this.setState({
        //         displayUserCommentModal: displayUserCommentModalEdit
        //     })
        // }
        let userCommentModalCopyDefault = [];
        for (var m = 0; m < len; m++) {
            userCommentModalCopyDefault[m] = ''
        }
        this.setState({
            userCommentModalCopy: userCommentModalCopyDefault
        })
        let id = "comment" + this.state.indexOfPostClickedModal;
        document.getElementById(id).value = '';

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
                    <Modal open={this.state.openModal} className="edit-modal" onClose={this.closeEditModalHandler}>
                        <Card >
                            <CardContent>
                                <FormControl>
                                    <Typography variant="h4">EDIT</Typography>
                                </FormControl>
                                <br /><br /><br />
                                <FormControl fullWidth required>
                                    <InputLabel htmlFor="fullnameEdit">Full Name</InputLabel>
                                    <Input id={"fullnameEdit" + this.state.indexOfPostClickedModal} type="test" onChange={this.inputFullNameChangeHandler} name="fufullnameEdit" />
                                    <FormHelperText className={this.state.requiredUsername}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.updateClickHandler}>Update</Button>
                                <br /><br />
                            </CardContent>
                        </Card>
                    </Modal>
                </div>
                <div className="image-post">
                    <GridList cellHeight={300} cols={3}>
                        {pdata.data != null && pdata.data.map((tile, index) => (
                            <GridListTile key={tile.caption.id} cols={tile.cols || 1}>
                                <img src={tile.images.standard_resolution.url} alt={tile.caption.id} onClick={() => (this.openPostModal(index))} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <Modal className="image-open" open={this.state.imageOpen}
                    aria-labelledby="post-card-header-profile" aria-describedby="post-card-content-profile" onClose={this.closePostModal}>
                    <Card className="post-card-profile">
                        <CardHeader id="post-card-header-profile" />
                        <CardContent id="post-card-content-profile" className="post-card-content-profile">
                            <div className="post-content-left-profile">
                                <img src={this.state.imageClickedUrlModal[this.state.indexOfPostClickedModal]} alt={this.state.usernameModal[this.state.indexOfPostClickedModal]} className="image-post-profile" />
                            </div>
                            <div className="post-content-right-profile">
                                <div className="post-content-right-profile-header">
                                    <Avatar src={this.state.profilePictureModal[this.state.indexOfPostClickedModal]} className="avtar-profile">
                                    </Avatar>
                                    <Typography variant="h6">{this.state.usernameModal[this.state.indexOfPostClickedModal]}</Typography>
                                </div>
                                <div className="hr-profile">
                                    <hr />
                                </div>
                                <div>
                                    <Typography variant="h6">{this.state.captionModal[this.state.indexOfPostClickedModal]}</Typography>
                                </div>
                                <div>
                                    {this.state.tagModal[this.state.indexOfPostClickedModal] != null && this.state.tagModal[this.state.indexOfPostClickedModal].map(tag => (
                                        <span className="tag-space-profile" key={"profile" + tag}>
                                            #{tag} &nbsp;
                                        </span>

                                    ))}
                                </div>
                                <div className={this.state.displayUserCommentModal[this.state.indexOfPostClickedModal]}>
                                    <Typography variant='h6'><span className="bold">{this.state.loggedInUserData.username}:</span>{this.state.userCommentModal[this.state.indexOfPostClickedModal]}</Typography>
                                </div>
                                <div className="like-profile">
                                    <span className={this.state.likeModal[this.state.indexOfPostClickedModal]}>
                                        <FavoriteBorderIcon id={"notlikePost" + this.state.indexOfPostClickedModal} onClick={() => this.likeClickModalHandler(this.state.indexOfPostClickedModal)} />
                                    </span>
                                    <span className={this.state.likedModal[this.state.indexOfPostClickedModal]}>
                                        <FavoriteIcon style={{ color: "red" }} id={"likedPost" + this.state.indexOfPostClickedModal} onClick={() => this.unlikeClickModalHandler(this.state.indexOfPostClickedModal)} />
                                    </span>
                                    <span className="like-count">{this.state.NoOfLikesModal[this.state.indexOfPostClickedModal]} likes</span>
                                </div>
                                <div className="form-control-modal">
                                    <span>
                                        <FormControl>
                                            <InputLabel htmlFor="comment" className="lable">Add a comment</InputLabel>
                                            <Input id={"comment" + this.state.indexOfPostClickedModal}
                                                type="" className="lable" onChange={(e) => this.inputCommentModalChangeHandler(e.target.value, this.state.indexOfPostClickedModal)} />
                                            <FormHelperText className={this.state.commentRequiredModal[this.state.indexOfPostClickedModal]}>
                                                <span className="red">Please add a comment</span>
                                                <br />
                                            </FormHelperText>
                                        </FormControl>
                                        <FormControl>
                                            <Button variant="contained" color="primary"><Typography variant="subtitle1" onClick={() => this.addCommentModalClickHandler(this.state.indexOfPostClickedModal)}>ADD</Typography></Button>
                                        </FormControl>
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Modal>
            </div >

        )
    }
}

export default Profile;