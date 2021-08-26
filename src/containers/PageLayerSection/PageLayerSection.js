import React, { useState, useEffect } from 'react';
import './pageLayerSection.css';
import MenuMain from '../Menu/Menu';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from "@material-ui/icons/Search";
import { InputBase, MenuItem, Menu } from '@material-ui/core';
import { useIdleTimer } from 'react-idle-timer';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import { NavLink, useHistory } from 'react-router-dom';
export default function PageLayerSection(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchInput, setSearchInput] = useState("");
    // const [isSearchData, setIsSearchData] = useState(false);
    let history = useHistory()
    let profileData = JSON.parse(localStorage.getItem("user_info"));
    let userName = profileData.username.toLowerCase();
    userName = userName.replace(/^\s+|\s+$/g, "");
    userName = userName.replace(/\s+/g, " ");
    const [istimeOut, setIsTimeOut] = useState(false);
    const timeout = 1000 * 60 * 30;
    const onAction = (e) => {
        setIsTimeOut(false)
    }
    const onActive = (e) => {
        setIsTimeOut(false)
    }
    const onIdle = (e) => {
        console.log('user is idle', e)
        if (istimeOut) {
            props.history.push("/");
            localStorage.removeItem('user_info');
            localStorage.removeItem('status_info');
        } else {
            reset();
            setIsTimeOut(true);
        }
    }
    const { reset } = useIdleTimer({
        timeout,
        onActive: onActive,
        onAction: onAction,
        onIdle: onIdle
    })
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // const searchHandler = (e) => {
    //     if (e.key === 'Enter') {
    //         if (searchInput !== "" && searchValidation(searchInput)) {
    //             setIsSearchData(true)
    //         } else if (searchInput.length === 0) {
    //             setIsSearchData(false)
    //         }
    //     }
    // };
    const searchValidation = (search) => {
        if (/^[0-9]{10}$/.test(search) || /^[L][D][0-9]{8}$/.test(search)) {
            return true;
        } else {
            return false;
        }
    };
    const logoutHandler = () => {
        history.push("/");
        localStorage.removeItem('user_info');
        localStorage.removeItem('status_info');
    }
    return (
        <div className="pageAdjustSection">
            <div className="leftSection">
                <MenuMain />
            </div>
            <div className="rightSection">
                <div className="appBarContainer">
                    <div className="searchMainContainer">
                        <div className="searchContainer">
                            <div className="searchIconContainer">
                                <SearchIcon className="searchIcon" />
                            </div>
                            <InputBase
                                placeholder="Lead ID / Mobile"
                                className="inputContainer"
                                inputProps={{ "aria-label": "search" }}
                                value={searchInput}
                                onChange={(e) => setSearchInput((e.target.value).toUpperCase().trim())}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        if (searchInput !== "" && searchValidation(searchInput)) {
                                            history.push("/dashboards/leads?query=" + searchInput);
                                        } else if (searchInput === "") {
                                            history.push("/dashboards/leads");
                                            window.location.reload();
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className="headerSection">
                            <h3>{props.pageTitle}</h3>
                        </div>
                    </div>
                    <div className="rightAppBarSection">
                        <div className="nameContainer" onClick={handleMenu}>
                            <div className="nameText">{userName}</div>
                            <ArrowDropDownOutlinedIcon className="arrowDown" />
                        </div>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <NavLink to="/profile" style={{ textDecoration: "none", color: "#080707" }}><MenuItem >Profile</MenuItem></NavLink>
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </Menu>
                        <Avatar className="avatar" alt="User Name">{userName.charAt(0).toUpperCase()}</Avatar>
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    )
}
