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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
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
                    postData: JSON.parse(this.responseText)
                })
                console.log("checking post data" + JSON.stringify(that.state.postData.data[0].user.id))
                console.log("checking post data" + JSON.stringify(that.state.postData))
            }
        })
        xhrPostData.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhrPostData.send(postData);

    }

    render() {
        let pdata = this.state.postData;
        let i = 0;
        return (
            <div >
                <header className="app-header">
                    <div className="header-heading">
                        Image Viewer
                    </div>
                    <div className="header-right-content">
                        <div className="search-box">
                            <SearchIcon className="search-icon" />
                            <Input type="text" id="search" placeholder="Search..." disableUnderline className="input-box" />
                        </div>
                        <div className="icon-button">
                            <IconButton className="circle"><img src={this.state.data.profile_picture} alt={this.state.data.username} height="36" width="36" className="circle" /></IconButton>
                        </div>
                    </div>
                </header>
                <div className="main-content">
                    <GridList cellHeight={"auto"} cols={2}>
                        {pdata.data != null && pdata.data.map(data => (
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
                                                <span className="tag-space" key={tag}>
                                                    #{tag}
                                                </span>

                                            ))}
                                        </Typography>
                                        <div className="likes">
                                            <FavoriteBorderIcon />
                                            <span className="like-count">{data.likes.count} Likes</span>
                                        </div>
                                        <br /><br />
                                        <FormControl>
                                            <span >
                                                <InputLabel htmlFor="comment" className="lable">Add a comment</InputLabel>
                                                <Input id={"comment" + i++}
                                                    type="text" className="lable" />
                                                <Button variant="contained" color="primary"><Typography variant="subtitle1">ADD</Typography></Button>
                                            </span>
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