import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import crmLogo from "../../images/loginImage.svg";
import {Link} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  Tabs,
  Tab,
  Typography,
  Grid,
  Menu,
  MenuItem,
  Chip,
  Drawer,
} from "@material-ui/core";
import UserCreate from "../UserCreate/UserCreate";
import UploadLeads from "../UploadLeads/UploadLeads";
import PlForm from "../PlData/PlForm";
import BlForm from "../BlData/BlForm";
import VerifyUsers from "./VerifyUsers";
import ResetPassword from "../Users/ResetPassword";
import Leads from "../Leads/Leads";
import LeadDetails from "../Leads/LeadDetails";
import Profile from "../UserList/Profile/Profile";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  varticalTabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appBar: {
    backgroundColor: "#D3D3D3",
    position: "static",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sideBarMenu: {
    position: "fixed",
    top: "64px",
    // backgroundColor:'blue'
  },

  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(0, 1),
    color: "#000000",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.5),
    },
    width: "auto",
    color: "#000000",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    //transition: theme.transitions.create('width'),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function MainMenu(props) {
    const {match , history} = props;
    const {params} = match;
    const {page} = params;
    const tabNameToIndex = {
        0: "leads",
        1: "personalloan",
        2: "businessloan",
        3: "uploadleads",
        4: "verifyusers",
        5: "users",
        6:"usercreate"
     };
    const indexToTabName = {
        "leads" : 0,
         "personalloan" : 1,
         "businessloan" : 2,
        "uploadleads" : 3,
         "verifyusers" : 4,
         "users" : 5,
        "usercreate" : 6,
      };
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
  const [isRenderLeads,setIsRenderLeads] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isSearchData, setIsSearchData] = useState(false);
  const [viewLeadDetails, setViewLeadDetails] = useState(false);
  const [leadId, setLeadId] = useState(null);
  // const[drawerOpen,setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
 // const history = useHistory();
  let profileData = JSON.parse(localStorage.getItem("user_info"));
 
  const handleChange = (event, newValue) => {
   history.push(`/dashboard/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const drawerHandler = ()=>{
  //   setDrawerOpen(true);
  //   console.log("draweropen");
  // }
  // const drawerCloseHandler = ()=>{
  //   setDrawerOpen(false);
  // }
  const capitalLetter = (str) => {
    str = str.split(" ");

    for (var i = 0; i < str.length; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
  };

  useEffect(() => {
  //   document.addEventListener('contextmenu', (e) => {
  //     e.preventDefault();
  //   });
    if(match.url === `/dashboard/${page}`){
      window.history.pushState(null, document.title, window.location.href);
      window.addEventListener('popstate', function (event){
          window.history.pushState(null, document.title,  window.location.href);
      });
  }
  }, [selectedTab])

  const searchHandler = () => {
    if (searchInput !== "" && searchValidation(searchInput)) {
      console.log("successfull" + searchInput);
      if (selectedTab === indexToTabName['leads']) {
        console.log("is render leads");
        setIsRenderLeads(true);
      }
       history.push(setSelectedTab(indexToTabName["leads"]));
      setIsSearchData(true);

    } else if (searchInput.length === 0) {
      console.log("search is empty");
      history.push(setSelectedTab(indexToTabName["leads"]));
      setIsSearchData(false);
    }
  };


  const searchValidation = (search) => {
    if (/^[0-9]{10}$/.test(search) || /^[L][D][0-9]{8}$/.test(search)) {
      return true;
    } else {
      return false;
    }
  };
  const leadDetailsHandler = (childData,leadId)=>{
    setViewLeadDetails(childData);
    setLeadId(leadId)
 }
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title}>
                <img src={crmLogo} alt="CRM Logo" style={{ height: "5vh" }} />
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                />
              </div>
              <Button
                className={classes.button}
                variant="outlined"
                onClick={() => searchHandler()}
              >
                Search
              </Button>
              <Chip
                icon={<AccountCircle />}
                label={capitalLetter(profileData.username)}
                onClick={handleMenu}
              />
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "#080707" }}
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item lg={1.5}>
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleChange}
          >
            <Tab label="Leads"  />
            <Tab label="Personal Loan" />
            <Tab label="Business Loan"  />
            <Tab label="Upload Leads"  />
            <Tab label="Verify Users" />
            <Tab label="Users" />
            <Tab label="User Create"  />
            
          </Tabs>
          </Grid>
          <Grid item lg={10}>
          {(selectedTab === 0 || isRenderLeads === true ) && (viewLeadDetails ?
          <LeadDetails
          leadId={leadId}/> :
          <Leads
          searchInput={searchInput}
            isSearchData={isSearchData}
            mainMenuCallBack={leadDetailsHandler}
             /> ) }
          {selectedTab === 1 && <PlForm/>}
          {selectedTab === 2 && <BlForm/>}
          {selectedTab === 3 && <UploadLeads/>}
          {selectedTab === 4 && <VerifyUsers/>}
          {selectedTab === 5 && <ResetPassword/>}
          {selectedTab === 6 && <UserCreate/>}
          
        </Grid>
      </Grid>
    </div>
  );
}
