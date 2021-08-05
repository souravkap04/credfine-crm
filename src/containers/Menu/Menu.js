import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import './menu.css';
// List menu item
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// Menu icons
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
const useStyles = makeStyles((theme) => ({
    rooter: {
        position: 'fixed',
        width: '100%',
        height: '130vh',
        maxWidth: 255,
        backgroundColor: '#535ad1',
        padding: theme.spacing(1, 0, 32),
        paddingTop: '76px'
    },
    nested: {
        paddingLeft: theme.spacing(9),
        color: '#f2f2f2'
    },
    color: {
        color: '#f2f2f2'
    },
}));
export default function Menu(props) {
    const classes = useStyles()
    const [openen, setOpen] = React.useState(true);
    const [uploadOpen, setuploadOpen] = useState(true);
    const handleClick = () => {
        setOpen(!openen);
    };
    const uploadHandleClick = () => {
        setuploadOpen(!uploadOpen);
    }
    const [isHiddenTab, setIsHiddenTab] = useState(false);
    let profileData = JSON.parse(localStorage.getItem("user_info"));
    useEffect(() => {
        if (profileData.user_roles[0].user_type === 3) {
            setIsHiddenTab(true);
        }
    }, []);
    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            // subheader={
            //     <ListSubheader component="div" id="nested-list-subheader">
            //         Nested List Items
            //     </ListSubheader>
            // }
            className={classes.rooter}
        >
            {isHiddenTab ? null : <NavLink to="/dashboard" activeClassName="active">
                <ListItem className="selected" button>
                    <ListItemIcon>
                        <DashboardOutlinedIcon className={classes.color} />
                    </ListItemIcon>
                    <ListItemText className={classes.color} primary="Dashboard" />
                </ListItem>
            </NavLink>}
            <NavLink to="/dashboards/leads" activeClassName="active">
                <ListItem className="selected" button>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon className={classes.color} />
                    </ListItemIcon>
                    <ListItemText className={classes.color} primary="New Leads" />
                </ListItem>
            </NavLink>
            <NavLink to="/dashboards/addleads" activeClassName="active">
                <ListItem className="selected" button>
                    <ListItemIcon>
                        <AddCircleOutlineOutlinedIcon className={classes.color} />
                    </ListItemIcon>
                    <ListItemText className={classes.color} primary="Add Leads" />
                </ListItem>
            </NavLink>
            <NavLink to="/dashboards/myleads" activeClassName="active">
                <ListItem className="selected" button>
                    <ListItemIcon>
                        <VerifiedUserOutlinedIcon className={classes.color} />
                    </ListItemIcon>
                    <ListItemText className={classes.color} primary="My Leads" />
                </ListItem>
            </NavLink>
            {isHiddenTab ? null : <React.Fragment><ListItem button className={classes.color} onClick={handleClick}>
                <ListItemIcon>
                    <PeopleAltOutlinedIcon className={classes.color} />
                </ListItemIcon>
                <ListItemText primary="Users" />
                {openen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
                <Collapse in={openen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to="/dashboards/addusers" activeClassName="active">
                            <ListItem button className={classes.nested + " selected"}>
                                <ListItemText primary="Add Users" />
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboards/verifyusers" activeClassName="active">
                            <ListItem button className={classes.nested + " selected"}>
                                <ListItemText primary="Verify Users" />
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboards/users" activeClassName="active">
                            <ListItem button className={classes.nested + " selected"}>
                                <ListItemText primary="All Users" />
                            </ListItem>
                        </NavLink>
                    </List>
                </Collapse>
                <ListItem button className={classes.color} onClick={uploadHandleClick}>
                    <ListItemIcon>
                        <PublishOutlinedIcon className={classes.color} />
                    </ListItemIcon>
                    <ListItemText primary="Upload Leads" />
                    {uploadOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={uploadOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to="/dashboards/bulkuploads" activeClassName="active">
                            <ListItem button className={classes.nested + " selected"}>
                                <ListItemText primary="Bulk Uploads" />
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboards/freshlead" activeClassName="active">
                            <ListItem button className={classes.nested + " selected"}>
                                <ListItemText primary="Fresh Leads" />
                            </ListItem>
                        </NavLink>
                    </List>
                </Collapse>
                <NavLink to="/dashboards/reports" activeClassName="active">
                    <ListItem className="selected" button>
                        <ListItemIcon>
                            <FileCopyOutlinedIcon className={classes.color} />
                        </ListItemIcon>
                        <ListItemText className={classes.color} primary="Reports" />
                    </ListItem>
                </NavLink></React.Fragment>}
        </List>
    );
}
