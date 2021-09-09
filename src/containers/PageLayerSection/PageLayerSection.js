import React, { useState, useEffect } from 'react';
import './pageLayerSection.css';
import MenuMain from '../Menu/Menu';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from "@material-ui/icons/Search";
import { InputBase, MenuItem, Menu } from '@material-ui/core';
import { useIdleTimer } from 'react-idle-timer';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import { NavLink, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { getProfileData } from '../../global/leadsGlobalData';
import axios from 'axios';
import baseUrl from '../../global/api';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
export default function PageLayerSection(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchInput, setSearchInput] = useState("");
    const getProfile = getProfileData()
    let history = useHistory()
    let profileData = JSON.parse(localStorage.getItem("user_info"));
    let userName = profileData.username.toLowerCase();
    userName = userName.replace(/^\s+|\s+$/g, "");
    userName = userName.replace(/\s+/g, " ");
    const [istimeOut, setIsTimeOut] = useState(false);
    const timeout = 1000 * 60 * 30;
    const [notificationCount, setnotificationCount] = useState(0);
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
    const notification = async () => {
        const headers = {
            'Authorization': `Token ${getProfile.token}`,
        };
        await axios.get(`${baseUrl}/leads/CheckFollowupLead/`, { headers })
            .then((response) => {
                if (response.data.followup_lead_avail === true && response.data.total_followup_lead > 0) {
                    setnotificationCount(response.data.total_followup_lead)
                }
            }).catch((error) => {

            })
    }
    useEffect(() => {
        var today = new Date().getHours();
        if (today >= 7 && today <= 20) {
            setInterval(() => {
                notification();
            }, 300000)
        }
    }, []);
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
                        {props.addLeadButton ? <Button
                            className="addBtn"
                            color="primary"
                            variant="contained"
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={props.onClick}
                        >
                            Add New Lead
                        </Button> : null}
                        <NavLink to="/dashboards/followup" activeClassName="active"><Badge className="notificationContainer" badgeContent={notificationCount !== 0 ? notificationCount : 0} color="secondary">
                            <NotificationsIcon className="notificationIcon" />
                        </Badge></NavLink>
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
                            <NavLink to="/profile" style={{ textDecoration: "none", color: "#080707" }}><MenuItem style={{ fontFamily: 'Lato' }}>Profile</MenuItem></NavLink>
                            <MenuItem style={{ fontFamily: 'Lato' }} onClick={logoutHandler}>Logout</MenuItem>
                        </Menu>
                        <Avatar className="avatar" alt="User Name">{userName.charAt(0).toUpperCase()}</Avatar>
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    )
}
