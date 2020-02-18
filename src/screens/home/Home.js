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
            postData2: [],
            like: [],
            liked: [],
            isCommentAdded: [],
            commentAdded: [],
            comment: [],
            commentRequired: [],
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
                    data: JSON.parse(this.response).data
                });
                console.log("checking user data" + JSON.stringify(that.state.data))
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
                    postData: JSON.parse(this.responseText),
                    postData2: JSON.parse(this.responseText)
                })
                let length = that.state.postData.data.length;
                let initialLike = []
                let initialLiked = []
                let isCommentAddedInitial = []
                let commentInitial = []
                let commentRequiredInitial = []
                let commentAddedInitial = []
                for (var i = 0; i < length; i++) {
                    initialLike.push("dispBlock");
                    initialLiked.push("dispNone");
                    isCommentAddedInitial.push("dispNone");
                    commentInitial.push('');
                    commentRequiredInitial.push("dispNone")
                    commentAddedInitial.push('');
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
                console.log("checking post data" + JSON.stringify(that.state.postData.data[0].user.id))
                console.log("checking post data" + JSON.stringify(that.state.postData))
            }
        })
        xhrPostData.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhrPostData.send(postData);

    }

    searchChangeHandler = (e) => {
        if (e !== "") {
            let searchPosts = this.state.postData;
            let indSearchPosts = searchPosts.data;
            let indSearchPostsResults = indSearchPosts.filter(indSearchPost => indSearchPost.caption.text.includes(e))
            searchPosts.data = indSearchPostsResults;
            this.setState({ postData: searchPosts });
        } else {
            this.componentWillMount();
        }
    }

    likeClickHandler = (index) => {
        let updatedPostData = this.state.postData;
        updatedPostData.data[index].likes.count = updatedPostData.data[index].likes.count + 1;
        this.setState({ postData: updatedPostData });
        let updateLiked = this.state.liked;
        updateLiked[index] = "dispBlock";
        this.setState({ liked: updateLiked })
        let updateLike = this.state.like;
        updateLike[index] = "dispNone";
        this.setState({ like: updateLike });

    }

    unlikeClickHandler = (index) => {
        let updatedPostData = this.state.postData;
        updatedPostData.data[index].likes.count = updatedPostData.data[index].likes.count - 1;
        this.setState({ postData: updatedPostData });
        let updateLike = this.state.like;
        updateLike[index] = "dispBlock";
        this.setState({ like: updateLike });
        let updateLiked = this.state.liked;
        updateLiked[index] = "dispNone";
        this.setState({ liked: updateLiked })
    }

    inputCommentChangeHandler = (e, index) => {
        let commentAddedUpdate = this.state.commentAdded;
        commentAddedUpdate[index] = e;
        this.setState({ commentAdded: commentAddedUpdate });
    }

    addCommentClickHandler = (index) => {
        console.log("add commenthandler called for :" + index)
        if (this.state.commentAdded[index] === '' || this.state.commentAdded[index] === null) {
            let commentRequiredUpdate = this.state.commentRequired;
            commentRequiredUpdate[index] = "dispBlock";
            this.setState({ commentRequired: commentRequiredUpdate });
        }
        else {
            //let length = this.state.postData.data.length;
            let commentRequiredUpdate = this.state.commentRequired;
            let isCommentAddedUpdate = this.state.isCommentAdded;
            let commentUpdate = this.state.commentAdded;
            //let commentAddedUpdate = this.state.commentAdded;
            commentRequiredUpdate[index] = "dispNone";
            isCommentAddedUpdate[index] = "dispBlock"
            this.setState({ commentRequired: commentRequiredUpdate });
            this.setState({ isCommentAdded: isCommentAddedUpdate });
            this.setState({ comment: commentUpdate })
            // for (var i = 0; i < length; i++) {
            //     commentAddedUpdate.push('');
            // }
            // this.setState({ commentAdded: commentAddedUpdate });
        }

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
        let pdata = this.state.postData;
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
                        {pdata.data != null && pdata.data.map((data, index) => (
                            <GridListTile key={"grid" + data.caption.id} >
                                <Card variant="outlined" className="post-card" key={"card" + data.caption.id}>
                                    <CardHeader
                                        avatar={
                                            <Avatar alt={data.user.username} src={data.user.profile_picture} >
                                            </Avatar>
                                        }
                                        title={data.user.username}
                                        subheader={new Date(data.created_time).toDateString()} />
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
                                            <span className="like-count">{data.likes.count} likes</span>
                                        </div>
                                        <br />
                                        <div className={this.state.isCommentAdded[index]}>
                                            <span className="bold">{this.state.data.username} : </span>
                                            {this.state.comment[index]}
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