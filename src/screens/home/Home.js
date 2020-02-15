import React, { Component } from 'react';
import '../home/Home.css';
import '../../common/Header.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            data: []
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
    }

    render() {

        return (
            <div>
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
                            <IconButton className="circle"><img src={this.state.data.profile_picture} alt="Smiley face" height="36" width="36" className="circle" /></IconButton>
                        </div>
                    </div>
                </header>
                I am in home
            </div >
        )
    }
}

export default Home;