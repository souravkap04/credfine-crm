import React,{useState ,useEffect} from 'react';
import PlLeads from './PlLeads';
import PropTypes from 'prop-types';
import {fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import crmLogo from "../../images/loginImage.svg";
import {AppBar, Toolbar, Button, IconButton,InputBase, Tabs,Tab,Box,Typography, Grid } from '@material-ui/core';
import UploadLeads from '../UploadLeads/UploadLeads';
import PlForm from '../PlData/PlForm';
import BlForm from '../BlData/BlForm';

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
  },
  appBar:{
    backgroundColor:"#D3D3D3",
    position:"static"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  title:{
    flexGrow:1,
   
  },
  button:{
      marginLeft:theme.spacing(1),
       
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
        </Toolbar>
      </AppBar>
      </Grid>

      <Grid item lg={2}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="PL Leads"  />
        <Tab label="Personal Loan"  />
        <Tab label="Business Loan" />
        <Tab label="Upload Leads"  />
        <Tab label="Item Five"  />
        <Tab label="Item Six"  />
        <Tab label="Item Seven"  />
      </Tabs>
      </Grid>
      <Grid item lg={10}> 
      <TabPanel value={value} index={0}>
       <div><PlLeads/></div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div><PlForm/></div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div><BlForm/></div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div ><UploadLeads/></div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
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
  
  
  