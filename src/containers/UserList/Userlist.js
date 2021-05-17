import React,{useState ,useEffect} from 'react';
import PlLeads from '../Leads/Leads';
import PropTypes from 'prop-types';
import {fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import crmLogo from "../../images/loginImage.svg";
import { Link } from "react-router-dom";
import {AppBar, Toolbar, Button, IconButton,InputBase, Tabs,Tab,Box,
  Typography, Grid, Menu, MenuItem, Chip, Drawer } from '@material-ui/core';
import UploadLeads from '../UploadLeads/UploadLeads';
import PlForm from '../PlData/PlForm';
import BlForm from '../BlData/BlForm';
import VerifyUsers from './VerifyUsers';
import ResetPassword from '../Users/ResetPassword';
import Leads from '../Leads/Leads';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  varticalTabRoot:{
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  appBar:{
    backgroundColor:"#D3D3D3",
    position:"static"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sideBarMenu:{
    position:'fixed',
    top:'64px',
    // backgroundColor:'blue'
  },

  title:{
    flexGrow:1,
   
  },
  button:{
      margin:theme.spacing(0,1),
       
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: 'auto',
    
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    //transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Userlist() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  // const[drawerOpen,setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  let profileData = JSON.parse(localStorage.getItem('user_info'));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleMenu = (event) =>{
    setAnchorEl(event.currentTarget);
    
  }
  const handleClose = () =>{
    setAnchorEl(null)
  }
  // const drawerHandler = ()=>{
  //   setDrawerOpen(true);
  //   console.log("draweropen");
  // }
  // const drawerCloseHandler = ()=>{
  //   setDrawerOpen(false);
  // }
  const capitalLetter = (str)=>{
    str = str.split(" ");

    for (var i = 0; i < str.length; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
  }
  
  // useEffect(() => {
  //   document.addEventListener('contextmenu', (e) => {
  //     e.preventDefault();
  //   });
  // }, [])
  return (
    <div className={classes.root}>
     <Grid container>
       <Grid item lg={12}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
         <Typography className={classes.title}>
           <img src={crmLogo} alt="CRM Logo" style={{ height:'5vh'}}/>
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
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button className={classes.button} variant="outlined" color="inherit">Search</Button>
          <Chip 
          icon={<AccountCircle/>}
          label={capitalLetter(profileData.username)} 
          onClick={handleMenu}/>
             <Menu 
             anchorEl={anchorEl}
             anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
             }}
             keepMounted
             transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
             }}
            open={open}
            onClose={handleClose}>
              <MenuItem><Link to="/profile" style={{ textDecoration: 'none',color:'#080707'}} >Profile</Link></MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
      </Grid>

      <Grid item lg={1.5}>
        {/* <Drawer 
        variant="temporary" 
        classes={{paper:classes.sideBarMenu}}
        open={drawerOpen} 
        onClose={drawerCloseHandler}  > */}
      <Tabs
        orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs} > 
        <Tab label="Personal Loan"  />
        <Tab label="Business Loan" />
        <Tab label="Upload Leads"  />
        <Tab label="Verify Users"  />
        <Tab label="Users"  />
        <Tab label="Leads"  />
      </Tabs>
      {/* </Drawer> */}
      </Grid>
      <Grid item lg={10}> 
      
      <TabPanel value={value} index={0}>
        <div><PlForm/></div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div><BlForm/></div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div ><UploadLeads/></div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div><VerifyUsers/></div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <div><ResetPassword/></div>
      </TabPanel>
      <TabPanel value={value} index={5}>
       <div><Leads/></div>
      </TabPanel>
      </Grid>
      </Grid>
    </div>
  );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  
  