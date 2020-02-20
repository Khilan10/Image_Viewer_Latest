import React, { Component } from 'react';
import '../home/Home.css';
import '../../common/Header.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            postData: [],
            like: [],
            liked: [],
            noOfLikes: [],
            isCommentAdded: [],
            commentAdded: [],
            comment: [],
            commentRequired: [],
            dispMenu: 'dispNone',
            open: false,
            anchorEl: null,
            search: ''
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
                    data: JSON.parse(this.response).data
                });
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
                    postData: JSON.parse(this.responseText).data
                })
                let length = that.state.postData.length;
                let initialLike = []
                let initialLiked = []
                let isCommentAddedInitial = []
                let commentInitial = []
                let commentRequiredInitial = []
                let commentAddedInitial = []
                let noOfLikesInitial = [];
                for (var i = 0; i < length; i++) {
                    initialLike.push("dispBlock");
                    initialLiked.push("dispNone");
                    isCommentAddedInitial.push("dispNone");
                    commentInitial.push([]);
                    commentRequiredInitial.push("dispNone")
                    commentAddedInitial[i] = '';
                    noOfLikesInitial[i] = that.state.postData[i].likes.count;
                }
                that.setState({
                    like: initialLike
                })

                that.setState({
                    liked: initialLiked
                })
                that.setState({
                    isCommentAdded: isCommentAddedInitial
                })
                that.setState({
                    commentAdded: commentAddedInitial
                })
                that.setState({
                    comment: commentInitial
                })
                that.setState({
                    commentRequired: commentRequiredInitial
                })
                that.setState({
                    postDataSearch: postData
                })
                that.setState({
                    noOfLikes: noOfLikesInitial
                })
            }
        })
        xhrPostData.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhrPostData.send(postData);

    }

    //this method is called when search is made
    searchChangeHandler = (e) => {
        this.setState({ search: e })
    }

    //this method is called on click of like button
    //this will make the liked button visible
    //this will increase the no of likes by 1
    likeClickHandler = (index) => {

        let likeEdit = [];
        let likedEdit = [];
        let noOfLikesEdit = [];

        let len = this.state.postData.length;
        for (var j = 0; j < len; j++) {
            likeEdit[j] = this.state.like[j];
            likedEdit[j] = this.state.liked[j];
            noOfLikesEdit[j] = this.state.noOfLikes[j];
        }
        likeEdit[index] = 'dispNone';
        likedEdit[index] = 'dispBlock';
        noOfLikesEdit[index] = noOfLikesEdit[index] + 1;
        this.setState({
            like: likeEdit
        })
        this.setState({
            liked: likedEdit
        })
        this.setState({
            noOfLikes: noOfLikesEdit
        })
    }

    //this will be called when the red colored liked button is clicked
    //this will make the bordered like button visible
    //this will make the count of likes to default
    unlikeClickHandler = (index) => {

        let likeEdit = [];
        let likedEdit = [];
        let noOfLikesEdit = [];

        let len = this.state.postData.length;
        for (var j = 0; j < len; j++) {
            likeEdit[j] = this.state.like[j];
            likedEdit[j] = this.state.liked[j];
            noOfLikesEdit[j] = this.state.noOfLikes[j];
        }
        likeEdit[index] = 'dispBlock';
        likedEdit[index] = 'dispNone';
        noOfLikesEdit[index] = noOfLikesEdit[index] - 1;
        this.setState({
            like: likeEdit
        })
        this.setState({
            liked: likedEdit
        })
        this.setState({
            noOfLikes: noOfLikesEdit
        })
    }

    //this method is called on when comment that is added is changed
    inputCommentChangeHandler = (value, index) => {

        let commentAddedUpdate = [];
        let len = this.state.postData.length;
        for (var k = 0; k < len; k++) {
            commentAddedUpdate[k] = '';
        }
        commentAddedUpdate[index] = value;
        this.setState({
            commentAdded: commentAddedUpdate
        })
    }

    //this method is called when Add Comment button is clicked
    addCommentClickHandler = (index) => {

        let commentRequiredEdit = [];
        let CommentEdit = [];
        let isCommentAddedEdit = [];
        let len = this.state.postData.length;
        for (var l = 0; l < len; l++) {
            commentRequiredEdit[l] = "dispNone";
            CommentEdit[l] = this.state.comment[l];
            isCommentAddedEdit[l] = this.state.isCommentAdded[l];
        }
        let id = "comment" + index;
        if (this.state.commentAdded[index] !== "") {
            console.log("comment added is:" + this.state.commentAdded[index] + ":comment added is:");
            isCommentAddedEdit[index] = "dispNone";
            CommentEdit[index].push(this.state.commentAdded[index]);
            this.setState({
                isCommentAddedEdit: isCommentAddedEdit
            })
            this.setState({
                comment: CommentEdit
            })
            isCommentAddedEdit[index] = "dispBlock";
            this.setState({
                isCommentAdded: isCommentAddedEdit
            })
            commentRequiredEdit[index] = "dispNone"
            this.setState({
                commentRequired: commentRequiredEdit
            })
        } else {
            commentRequiredEdit[index] = "dispBlock"
            this.setState({
                commentRequired: commentRequiredEdit
            })
        }
        let commentAddedDefault = [];
        for (var p = 0; p < len; p++) {
            commentAddedDefault[p] = ''
        }
        this.setState({
            commentAdded: commentAddedDefault
        })
        document.getElementById(id).value = '';

    }

    //this method is clicked on click of the profile pic on the header
    //this method will open the Menu List
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

    //this method is clicked when logout is clicked from Menu
    //this will remove the item with key equals to "access-token"
    //and will redirect the controll to login page
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

    //this method is called when the My Account is clicked from Menu
    //this will route the control the profile page
    myAccountClickHandler = (event) => {
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
        this.props.history.push({
            pathname: '/profile/'
        })
    }

    render() {
        let pdata = this.state.postData.filter(
            (data) => {
                return data.caption.text.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        )
        //let pdata = this.state.postData
        const id = this.state.open ? "simple-popper" : null;
        return (
            <div >
                <header className="app-header">
                    <div className="header-heading">
                        Image Viewer
                    </div>
                    <div className="header-right-content">
                        <div className="search-box">
                            <SearchIcon className="search-icon" />
                            <Input type="text" id="search" placeholder="Search..." onChange={(e) => {
                                this.searchChangeHandler(e.target.value)
                            }} disableUnderline className="input-box" />
                        </div>
                        <div className="icon-button">
                            <IconButton className="circle" onClick={(event) => {
                                this.profileClickHandler(event)
                            }}><img src={this.state.data.profile_picture} alt={this.state.data.username} height="36" width="36" className="circle" /></IconButton>
                            <Popper id={id}
                                open={this.state.open} anchorEl={this.state.anchorEl}
                                transition>
                                <ClickAwayListener onClickAway={(event) => { this.profileClickHandler(event) }}>
                                    <Paper className={this.state.dispMenu} style={{
                                        marginTop: '50px', marginLeft: '1240px', width: '140px'
                                    }}>
                                        <MenuList className="dropdown-content" style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                            <MenuItem onClick={(event) => { this.myAccountClickHandler() }} > <Typography variant="h6" ><span className="bold">My Account</span></Typography></MenuItem>
                                            <hr />
                                            <MenuItem onClick={(event) => { this.logoutClickHandler() }} > <Typography variant="h6" ><span className="bold">Logout</span></Typography></MenuItem>
                                        </MenuList>
                                    </Paper>
                                </ClickAwayListener>
                            </Popper>
                        </div>
                    </div>
                </header>

                <div className="main-content">
                    <GridList cellHeight={"auto"} cols={2}>
                        {pdata != null && pdata.map((data, index) => (
                            <GridListTile key={"grid" + data.caption.id} >
                                <Card variant="outlined" className="post-card" key={"card" + data.caption.id}>
                                    <CardHeader
                                        avatar={
                                            <Avatar alt={data.user.username} src={data.user.profile_picture} >
                                            </Avatar>
                                        }
                                        title={data.user.username}
                                        subheader={("0" + new Date(data.created_time * 1000).getDate()).slice(-2) + '/' + ("0" + new Date(data.created_time * 1000).getMonth()).slice(-2) + '/' + new Date(data.created_time * 1000).getFullYear() + " " + ("0" + new Date(data.created_time * 1000).getHours()).slice(-2) + ':' + ("0" + new Date(data.created_time * 1000).getMinutes()).slice(-2) + ':' + ("0" + new Date(data.created_time * 1000).getSeconds()).slice(-2)} />
                                    <CardContent>
                                        <img src={data.images.standard_resolution.url} width="640" alt={data.caption.text.split("#")[0]} />
                                        <hr />
                                        <Typography variant="body2">
                                            {data.caption.text.split("#")[0]}
                                        </Typography>
                                        <Typography variant="body2" className="hash-tag">
                                            {data.tags != null && data.tags.map(tag => (
                                                <span key={tag}>
                                                    #{tag}  &nbsp;
                                                </span>

                                            ))}
                                        </Typography>
                                        <br />
                                        <div className="likes">
                                            <span className={this.state.like[index]}>
                                                <FavoriteBorderIcon id={"notlike" + data.caption.id} onClick={() => this.likeClickHandler(index)} />
                                            </span>
                                            <span className={this.state.liked[index]}>
                                                <FavoriteIcon style={{ color: "red" }} id={"liked" + data.caption.id} onClick={() => this.unlikeClickHandler(index)} />
                                            </span>
                                            <span className="like-count">{this.state.noOfLikes[index]} likes</span>
                                        </div>
                                        <br />

                                        <div className={this.state.isCommentAdded[index]}>
                                            {this.state.comment[index] != null && this.state.comment[index].map((comment, index) => (
                                                <div key={"comment individual" + comment + index + data.caption.id}>
                                                    <span className="bold">{this.state.data.username} : </span>
                                                    {comment}
                                                </div>
                                            ))}
                                        </div>
                                        <br /><br />
                                        <FormControl>
                                            <span >
                                                <InputLabel htmlFor="comment" className="lable">Add a comment</InputLabel>
                                                <Input id={"comment" + index}
                                                    type="text" className="lable" onChange={(e) => this.inputCommentChangeHandler(e.target.value, index)} />
                                                <Button variant="contained" color="primary"><Typography variant="subtitle1" onClick={() => this.addCommentClickHandler(index)}>ADD</Typography></Button>
                                            </span>
                                        </FormControl>
                                        <FormControl>
                                            <FormHelperText className={this.state.commentRequired[index]}>
                                                <span className="red">Please add a comment</span>
                                                <br />
                                            </FormHelperText>
                                        </FormControl>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div >
        )
    }
}

export default Home;