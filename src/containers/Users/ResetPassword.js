import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  Grid,
  Button
} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import * as ReactBootstrap from "react-bootstrap";
import axios from 'axios';
import baseUrl from '../../global/api';
import { getProfileData } from '../../global/leadsGlobalData'
import LockIcon from '@material-ui/icons/Lock';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from '@material-ui/core/InputAdornment';
import {haloocomNoidaDialerApi,haloocomMumbaiDialerApi} from "../../global/callApi";
import './resetpassword.css';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  container: {
    marginTop: '10px'
  },
  userButton: {
    backgroundColor: '#535ad1',
    color: '#fff',
    boxShadow: 'none'
  },
  scroller: {
    overflow: 'auto',
    // maxHeight: '500px',
    marginBottom: '25px'
  },
  table: {
    width: "100%",
  },
  loader: {
    position: "relative",
    left: "35em",
  },
  cnfrmPasswordBtn: {
    borderRadius: '15px',
    backgroundColor: '#13B980',
    fontSize: '15px',
    fontFamily: 'Lato',
    margin: '10px 56px',
    padding: '5px',
    width: '50%',
    color: 'white',
    '&:hover': {
      backgroundColor: '#447d40'
    }
  },
  formContainer: {
    padding: '8px 10px'
  },
  formSubContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  editUserBtn: {
    borderRadius: '15px',
    backgroundColor: '#13B980',
    fontSize: '15px',
    fontFamily: 'Lato',
    // margin: '12px 115px',
    margin: 'auto',
    marginTop: '12px',
    marginBottom: '12px',
    padding: '5px',
    width: '50%',
    color: 'white',
    '&:hover': {
      backgroundColor: '#447d40'
    }
  },
  tableheading: {
    backgroundColor: '#8f9bb3',
    color: '#ffffff',
    fontSize: '14px',
  },
  tableData: {
    padding: '4px',
    fontSize: '12px',
    textAlign: 'center'
  },
  oddEvenRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f7f9fc',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#fff',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  activeUserBtn: {
    margin: '0 10px'
  },
  userType: {
    marginRight: '60vh'
  },
  deleteUsersData: {
    fontSize: '12px',
    textAlign: 'center'
  },
  tableIconData: {
    display: 'flex',
    padding: '4px'
  }
});
export default function Users() {
  const classes = useStyles();
  const profileData = getProfileData();
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [updateUsers, setUpdateUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [productType, setProductType] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [dialerApiKey, setDialerApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDeletedUser, setLoadingDeletedUser] = useState(false)
  const [errors, setErrors] = useState({});
  const [rowData, setRowData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [isDisplay, setIsDisplay] = useState(false);
  const [dialerAlertMessage,setDialerAlertMessage] = useState('');
  const [isDisplayDialerMessage,setIsDisplayDialerMessage] = useState(false);
  const [deleteCount, setDeleteCount] = useState(0);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [updatedUserName, setUpdatedUserName] = useState('');
  const [selectedVertageId,setSelectedVertageId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [vertageId, setVertageId] = useState("");
  const [vertagePass, setVertagePass] = useState("");
  const [parent, setparent] = useState("");
  const [location, setlocation] = useState([]);
  const [pullLocation, setpullLocation] = useState([]);
  const [isActiveUser, setIsActiveUser] = useState(true);
  const resetPasswordHandler = (userName, index) => {
    setIsResetPassword(true);
    setRowData(userName);
  }
  const closeResetPassword = () => {
    setIsResetPassword(false);
  }

  const findErrors = () => {
    const newErrors = {};
    if (!password || password === '') {
      newErrors.password = 'This is required field'
    }
    else if (password.length < 6) {

      newErrors.password = 'password should be 6 or more than 6 characters'
    }
    if (password !== confirmPassword) {
      newErrors.cnfrmPassword = 'confirm password not match'
    }
    else if (!confirmPassword || confirmPassword === '') {
      newErrors.cnfrmPassword = 'This is required field'
    }
    return newErrors;
  }
  const confirmPasswordHandler = async (event) => {
    const newErrors = findErrors();
    setErrors(newErrors);
    event.preventDefault();
    if (Object.keys(newErrors).length === 0) {
      const headers = {
        'userRoleHash': profileData.user_roles[0].user_role_hash,
        // 'userRoleHash' : 'f63e2d14-b15a-11eb-bc7e-000000000013'

      };
      let item = { username: rowData, password: password };
      try {
        await axios.post(`${baseUrl}/user/changePassword/`, item, { headers })
          .then((response) => {
            setAlertMessage(response.data.message);
            setIsDisplay(true);
            if (response.status === 200) {
              setPassword('')
              setConfirmPassword('')
              setTimeout(() => {
                setIsResetPassword(false)
              }, 1500)
            }
          })
      } catch (error) {
        setAlertMessage("something wrong");
        setIsDisplay(true);
      }
    }

  }
  useEffect(() => {
    listOfActiveUsers();
    listOfLocations();
  }, [deleteCount])
  const listOfActiveUsers = async () => {
    const headers = {
      'Authorization': `Token ${profileData.token}`,
    };
    try {
      const response = await axios.get(`${baseUrl}/user/childUsers/`, { headers });
      setIsActiveUser(true);
      setLoading(true);
      setUsers(response.data);
      setlocation(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  const listOfLocations = async () => {
    const headers = {
      'Authorization': `Token ${profileData.token}`,
    }
    await axios.get(`${baseUrl}/common/getLocations`, { headers })
      .then((response) => {
        setpullLocation(response.data)
      }).catch((error) => {
        console.log(error);
      })
  }
  const listOfDeletedUsers = async () => {
    const headers = {
      'Authorization': `Token ${profileData.token}`,
      'userRoleHash': profileData.user_roles[0].user_role_hash,
    };
    try {
      const response = await axios.get(`${baseUrl}/user/fetchDeletedUser/`, { headers });
      setIsActiveUser(false);
      setLoadingDeletedUser(true);
      setDeletedUsers(response.data);

    } catch (error) {
      console.log(error);
    }
  }
  const deletedUserPopUpHandler = (username,vertageid) => {
    setIsDeleteUser(true);
    setUserName(username);
    setSelectedVertageId(vertageid)

  }
  const closeDeleteUserPopUp = () => {
    setIsDeleteUser(false);
  }
  const deleteUser = async () => {
    const headers = {
      'userRoleHash': profileData.user_roles[0].user_role_hash,
      // 'userRoleHash' : 'f63e2d14-b15a-11eb-bc7e-000000000013'
    };
    let item = null;
    await axios.post(`${baseUrl}/user/deleteUser/${userName}`, item, { headers })
      .then((response) => {
        if (response.status === 200) {
          setIsDisplay(true);
          setAlertMessage(response.data.message);
          setIsDeleteUser(false);
          setDeleteCount(deleteCount + 1);
          if(profileData.dialer === "HALOOCOM-Noida"){
             axios.post(`${haloocomNoidaDialerApi}/userCreation.php?user=${selectedVertageId}&operation=Delete`)
           .then((response)=>{
            setAlertMessage("dialer user is successfully deleted");
            setIsDisplay(true);
           }).catch((error)=>{
            setAlertMessage("something wrong in dialer users delete");
            setIsDisplay(true);
           })
          }else if(profileData.dialer === "HALOOCOM-Mumbai"){
            axios.post(`${haloocomMumbaiDialerApi}/userCreation.php?user=${selectedVertageId}&operation=Delete`)
          .then((response)=>{
           setAlertMessage("dialer user is successfully deleted");
           setIsDisplay(true);
          }).catch((error)=>{
           setAlertMessage("something wrong in dialer users delete");
           setIsDisplay(true);
          })
         }
        }
      }).catch((error) => {
        console.log(error);
      })
  }
  const editUser = (userName, updatedUserName, firstName, lastName, email, role, gender, phoneNo, productType, dialerPass, vertageId, vertagePass, parent_user, location) => {
    setIsEditUser(true);
    setSelectedUserName(userName);
    setUpdatedUserName(updatedUserName);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setRole(role);
    setGender(gender);
    setPhoneNo(phoneNo);
    setProductType(productType);
    setDialerApiKey(dialerPass);
    setVertageId(vertageId);
    setVertagePass(vertagePass);
    setparent(parent_user);
    setlocation(location);
  }
  const closeEditUser = () => {
    setIsEditUser(false);
  }
  const updateUserData = async (e) => {
    e.preventDefault();
    let item = {
      username: updatedUserName, first_name: firstName, last_name: lastName, email, role, gender, phone_no: phoneNo,
      product_type: productType, dialer_pass: dialerApiKey, vertage_id: vertageId, vertage_pass: vertagePass, parent_user: parent, locations: location
    };
    const headers = {
      'userRoleHash': profileData.user_roles[0].user_role_hash,
    };
    await axios.put(`${baseUrl}/user/updateUser/${selectedUserName}`, item, { headers })
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            setIsEditUser(false)
            listOfActiveUsers();
          }, 2000);
        }
        setAlertMessage(response.data.message);
        setIsDisplay(true);
      }).catch((error) => {
        setAlertMessage("something wrong");
        setIsDisplay(true);
      })
  }
  const listOfUsers = async (role) => {
    const headers = {
      'Authorization': `Token ${profileData.token}`,
      'userRoleHash': profileData.user_roles[0].user_role_hash,
    };
    let items = { user_role: role }
    await axios.post(`${baseUrl}/user/fetchRoleUser/`, items, { headers })
      .then((response) => {
        setUpdateUsers(response.data);
      }).catch((error) => {
        console.log(error);
      })
  }
  const closeSnankBar = () => {
    setIsDisplay(false);
    setIsDisplayDialerMessage(false);
  }
  const submitHaloocomUserName = ()=>{
    console.log("submitHaloocomUserName:"+vertageId);
    if(profileData.dialer === "HALOOCOM-Noida"){
      axios.post(`${haloocomNoidaDialerApi}/userCreation.php?user=${vertageId}&operation=Add`)
    .then((response)=>{
     setDialerAlertMessage(response.data.Description);
     setIsDisplayDialerMessage(true);
    }).catch((error)=>{
     setDialerAlertMessage("something wrong in dialer user creation");
     setIsDisplayDialerMessage(true);
    })
   }if(profileData.dialer === "HALOOCOM-Mumbai"){
     axios.post(`${haloocomMumbaiDialerApi}/userCreation.php?user=${vertageId}&operation=Add`)
   .then((response)=>{
     setDialerAlertMessage(response.data.Description);
     setIsDisplayDialerMessage(true);
   }).catch((error)=>{
     setDialerAlertMessage("something wrong in dialer user creation");
     setIsDisplayDialerMessage(true);
   })
  }
  }
  return (
    <PageLayerSection>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isDisplay} autoHideDuration={1500} onClose={closeSnankBar}>
        <Alert>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isDisplayDialerMessage} autoHideDuration={null} onClose={closeSnankBar} >
        <Alert onClose={closeSnankBar} severity="success">
          {dialerAlertMessage}
        </Alert>
      </Snackbar>
      <div className={classes.container}>
        <Paper>
          <div className={classes.buttonContainer}>
            <div className={classes.userType}>
              {isActiveUser ? <Typography>Active User</Typography> : <Typography>Deleted User</Typography>}
            </div>
            <div>
              <InputGroup>
                <TextField
                  className="searchTermBox"
                  variant="outlined"
                  placeholder="Search....."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm((e.target.value).toLowerCase().trim())} />
              </InputGroup>
            </div>
            <div className={classes.activeUserBtn}>
              <Button disabled={isActiveUser} className={classes.userButton} color="primary"
                variant="contained" onClick={listOfActiveUsers}>Active User</Button>
            </div>
            <div>
              <Button disabled={!isActiveUser} className={classes.userButton} color="primary"
                variant="contained" onClick={listOfDeletedUsers}>Deleted User</Button>
            </div>
          </div>
          <TableContainer className={classes.scroller}>
            <Table className={classes.table + ' tableMainContainer'}>
              <TableHead className={classes.tableheading}>
                <TableRow>
                  <TableCell className={classes.tableheading}>Sr No</TableCell>
                  <TableCell className={classes.tableheading}>User Name</TableCell>
                  <TableCell className={classes.tableheading}>First Name</TableCell>
                  <TableCell className={classes.tableheading}>Last Name</TableCell>
                  <TableCell className={classes.tableheading}>Email</TableCell>
                  <TableCell className={classes.tableheading}>Role</TableCell>
                  <TableCell className={classes.tableheading}>Product Type</TableCell>
                  <TableCell className={classes.tableheading}>Phone No</TableCell>
                  <TableCell className={classes.tableheading}>Gender</TableCell>
                  {/* <TableCell className={classes.tableheading}>DIALER API Key</TableCell> */}
                  <TableCell className={classes.tableheading}>Vertage Id</TableCell>
                  <TableCell className={classes.tableheading}>Vertage Pass</TableCell>
                  <TableCell className={classes.tableheading}>Parent</TableCell>
                  <TableCell className={classes.tableheading}>Location</TableCell>
                  <TableCell className={classes.tableheading}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isActiveUser ?
                  loading ? users.filter((user) => {
                    if (searchTerm === "") {
                      return user;
                    } else if (user.phone_no.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return user;
                    } else if (user.myuser.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return user;
                    } else if (user.myuser.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return user;
                    }
                  }).map((user, index) => {
                    let roleName;
                    if (user.role === "1") {
                      roleName = 'Admin'
                      return <TableRow className={classes.oddEvenRow} key={index} >
                        <TableCell className={classes.tableData}>{index + 1}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.username}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.first_name}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.last_name}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.email}</TableCell>
                        <TableCell className={classes.tableData}>{roleName}</TableCell>
                        <TableCell className={classes.tableData}>{user.product_type}</TableCell>
                        <TableCell className={classes.tableData}>{user.phone_no}</TableCell>
                        <TableCell className={classes.tableData}>{user.gender}</TableCell>
                        {/* <TableCell className={classes.tableData}>{user.myuser.dialer_pass}</TableCell> */}
                        <TableCell className={classes.tableData}>{user.myuser.vertage_id}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.vertage_pass}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.parent_id}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.location.join(',')}</TableCell>
                        <TableCell className={classes.tableIconData}>
                          <Tooltip title="Reset Password">
                            <IconButton onClick={() => resetPasswordHandler(user.myuser.username, index)}>
                              <LockIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => editUser(user.myuser.username, user.myuser.username, user.myuser.first_name,
                                user.myuser.last_name, user.myuser.email, user.role, user.gender, user.phone_no,
                                user.product_type, user.myuser.dialer_pass, user.myuser.vertage_id,
                                user.myuser.vertage_pass, user.myuser.username, user.myuser.location)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User">
                            {/* <IconButton onClick={() => deleteUser(user.myuser.username, index)}> */}
                            <IconButton onClick={() => deletedUserPopUpHandler(user.myuser.username,user.myuser.vertage_id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    }
                    if (user.role === "2") {
                      roleName = 'Manager'
                      return <TableRow className={classes.oddEvenRow} key={index} >
                        <TableCell className={classes.tableData}>{index + 1}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.username}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.first_name}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.last_name}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.email}</TableCell>
                        <TableCell className={classes.tableData}>{roleName}</TableCell>
                        <TableCell className={classes.tableData}>{user.product_type}</TableCell>
                        <TableCell className={classes.tableData}>{user.phone_no}</TableCell>
                        <TableCell className={classes.tableData}>{user.gender}</TableCell>
                        {/* <TableCell className={classes.tableData}>{user.myuser.dialer_pass}</TableCell> */}
                        <TableCell className={classes.tableData}>{user.myuser.vertage_id}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.vertage_pass}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.parent_id}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.location.join(',')}</TableCell>
                        <TableCell className={classes.tableIconData}>
                          <Tooltip title="Reset Password">
                            <IconButton onClick={() => resetPasswordHandler(user.myuser.username, index)}>
                              <LockIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => editUser(user.myuser.username, user.myuser.username, user.myuser.first_name,
                                user.myuser.last_name, user.myuser.email, user.role, user.gender, user.phone_no,
                                user.product_type, user.myuser.dialer_pass, user.myuser.vertage_id,
                                user.myuser.vertage_pass, user.myuser.username, user.myuser.location)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User">
                            {/* <IconButton onClick={() => deleteUser(user.myuser.username, index)}> */}
                            <IconButton onClick={() => deletedUserPopUpHandler(user.myuser.username,user.myuser.vertage_id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    }
                    if (user.role === "3") {
                      roleName = 'Agent'
                      return <TableRow className={classes.oddEvenRow} key={index} >
                        <TableCell className={classes.tableData}>{index + 1}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.username}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.first_name}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.last_name}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.email}</TableCell>
                        <TableCell className={classes.tableData}>{roleName}</TableCell>
                        <TableCell className={classes.tableData}>{user.product_type}</TableCell>
                        <TableCell className={classes.tableData}>{user.phone_no}</TableCell>
                        <TableCell className={classes.tableData}>{user.gender}</TableCell>
                        {/* <TableCell className={classes.tableData}>{user.myuser.dialer_pass}</TableCell> */}
                        <TableCell className={classes.tableData}>{user.myuser.vertage_id}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.vertage_pass}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.parent_id}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.location.join(',')}</TableCell>
                        <TableCell className={classes.tableIconData}>
                          <Tooltip title="Reset Password">
                            <IconButton onClick={() => resetPasswordHandler(user.myuser.username, index)}>
                              <LockIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => editUser(user.myuser.username, user.myuser.username, user.myuser.first_name,
                                user.myuser.last_name, user.myuser.email, user.role, user.gender, user.phone_no,
                                user.product_type, user.myuser.dialer_pass, user.myuser.vertage_id,
                                user.myuser.vertage_pass, user.myuser.username, user.myuser.location)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User">
                            {/* <IconButton onClick={() => deleteUser(user.myuser.username, index)}> */}
                            <IconButton onClick={() => deletedUserPopUpHandler(user.myuser.username,user.myuser.vertage_id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    }
                    if (user.role === "4") {
                      roleName = 'Super Admin'
                      return <TableRow className={classes.oddEvenRow} key={index} >
                        <TableCell className={classes.tableData}>{index + 1}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.username}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.first_name}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.last_name}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.email}</TableCell>
                        <TableCell className={classes.tableData}>{roleName}</TableCell>
                        <TableCell className={classes.tableData}>{user.product_type}</TableCell>
                        <TableCell className={classes.tableData}>{user.phone_no}</TableCell>
                        <TableCell className={classes.tableData}>{user.gender}</TableCell>
                        {/* <TableCell className={classes.tableData}>{user.myuser.dialer_pass}</TableCell> */}
                        <TableCell className={classes.tableData}>{user.myuser.vertage_id}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.vertage_pass}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.parent_id}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.location.join(',')}</TableCell>
                        <TableCell className={classes.tableIconData}>
                          <Tooltip title="Reset Password">
                            <IconButton onClick={() => resetPasswordHandler(user.myuser.username, index)}>
                              <LockIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => editUser(user.myuser.username, user.myuser.username, user.myuser.first_name,
                                user.myuser.last_name, user.myuser.email, user.role, user.gender, user.phone_no,
                                user.product_type, user.myuser.dialer_pass, user.myuser.vertage_id,
                                user.myuser.vertage_pass, user.myuser.username, user.myuser.location)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User">
                            {/* <IconButton onClick={() => deleteUser(user.myuser.username, index)}> */}
                            <IconButton onClick={() => deletedUserPopUpHandler(user.myuser.username,user.myuser.vertage_id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    }
                    if (user.role === "5") {
                      roleName = 'Team Leader'
                      return <TableRow className={classes.oddEvenRow} key={index} >
                        <TableCell className={classes.tableData}>{index + 1}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.username}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.first_name}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.last_name}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.email}</TableCell>
                        <TableCell className={classes.tableData}>{roleName}</TableCell>
                        <TableCell className={classes.tableData}>{user.product_type}</TableCell>
                        <TableCell className={classes.tableData}>{user.phone_no}</TableCell>
                        <TableCell className={classes.tableData}>{user.gender}</TableCell>
                        {/* <TableCell className={classes.tableData}>{user.myuser.dialer_pass}</TableCell> */}
                        <TableCell className={classes.tableData}>{user.myuser.vertage_id}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.vertage_pass}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.parent_id}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.location.join(',')}</TableCell>
                        <TableCell className={classes.tableIconData}>
                          <Tooltip title="Reset Password">
                            <IconButton onClick={() => resetPasswordHandler(user.myuser.username, index)}>
                              <LockIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => editUser(user.myuser.username, user.myuser.username, user.myuser.first_name,
                                user.myuser.last_name, user.myuser.email, user.role, user.gender, user.phone_no,
                                user.product_type, user.myuser.dialer_pass, user.myuser.vertage_id,
                                user.myuser.vertage_pass, user.myuser.username, user.myuser.location)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User">
                            {/* <IconButton onClick={() => deleteUser(user.myuser.username, index)}> */}
                            <IconButton onClick={() => deletedUserPopUpHandler(user.myuser.username,user.myuser.vertage_id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    }
                    if (user.role === "6") {
                      roleName = 'Backend'
                      return <TableRow className={classes.oddEvenRow} key={index} >
                        <TableCell className={classes.tableData}>{index + 1}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.username}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.first_name}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.last_name}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.email}</TableCell>
                        <TableCell className={classes.tableData}>{roleName}</TableCell>
                        <TableCell className={classes.tableData}>{user.product_type}</TableCell>
                        <TableCell className={classes.tableData}>{user.phone_no}</TableCell>
                        <TableCell className={classes.tableData}>{user.gender}</TableCell>
                        {/* <TableCell className={classes.tableData}>{user.myuser.dialer_pass}</TableCell> */}
                        <TableCell className={classes.tableData}>{user.myuser.vertage_id}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.vertage_pass}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.parent_id}</TableCell>
                        <TableCell className={classes.tableData}>{user.myuser.location.join(',')}</TableCell>
                        <TableCell className={classes.tableIconData}>
                          <Tooltip title="Reset Password">
                            <IconButton onClick={() => resetPasswordHandler(user.myuser.username, index)}>
                              <LockIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => editUser(user.myuser.username, user.myuser.username, user.myuser.first_name,
                                user.myuser.last_name, user.myuser.email, user.role, user.gender, user.phone_no,
                                user.product_type, user.myuser.dialer_pass, user.myuser.vertage_id,
                                user.myuser.vertage_pass, user.myuser.username, user.myuser.location)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User">
                            {/* <IconButton onClick={() => deleteUser(user.myuser.username, index)}> */}
                            <IconButton onClick={() => deletedUserPopUpHandler(user.myuser.username,user.myuser.vertage_id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    }
                  }) :
                    <div className={classes.loader}>
                      <ReactBootstrap.Spinner animation="border" />
                    </div>
                  : loadingDeletedUser ? deletedUsers.filter((deletedUser) => {
                    if (searchTerm === "") {
                      return deletedUser;
                    } else if (deletedUser.phone_no.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return deletedUser;
                    } else if (deletedUser.myuser.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return deletedUser;
                    } else if (deletedUser.myuser.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                      return deletedUser;
                    }
                  }).map((deletedUser, index) => {
                    let roleName;
                    if (deletedUser.role === "1") {
                      roleName = 'Admin'
                      return <TableRow className={classes.oddEvenRow} key={index} >
                        <TableCell className={classes.deleteUsersData}>{index + 1}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.username}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.first_name}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.last_name}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.email}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{roleName}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.product_type}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.phone_no}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.gender}</TableCell>
                        {/* <TableCell className={classes.deleteUsersData}>{user.myuser.dialer_pass}</TableCell> */}
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.vertage_id}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.vertage_pass}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.parent_id}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.location}</TableCell>
                        <TableCell className={classes.deleteUsersData}></TableCell>
                      </TableRow>
                    }
                    if (deletedUser.role === "2") {
                      roleName = 'Manager'
                      return <TableRow className={classes.oddEvenRow} key={index} >
                        <TableCell className={classes.deleteUsersData}>{index + 1}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.username}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.first_name}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.last_name}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.email}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{roleName}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.product_type}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.phone_no}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.gender}</TableCell>
                        {/* <TableCell className={classes.deleteUsersData}>{user.myuser.dialer_pass}</TableCell> */}
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.vertage_id}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.vertage_pass}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.parent_id}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.location}</TableCell>
                        <TableCell className={classes.deleteUsersData}></TableCell>
                      </TableRow>
                    }
                    if (deletedUser.role === "3") {
                      roleName = 'Agent'
                      return <TableRow className={classes.oddEvenRow} key={index} >
                        <TableCell className={classes.deleteUsersData}>{index + 1}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.username}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.first_name}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.last_name}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.email}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{roleName}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.product_type}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.phone_no}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.gender}</TableCell>
                        {/* <TableCell className={classes.deleteUsersData}>{user.myuser.dialer_pass}</TableCell> */}
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.vertage_id}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.vertage_pass}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.parent_id}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.location}</TableCell>
                        <TableCell className={classes.deleteUsersData}></TableCell>
                      </TableRow>
                    }
                    if (deletedUser.role === "4") {
                      roleName = 'Super Admin'
                      return <TableRow className={classes.oddEvenRow} key={index} >
                        <TableCell className={classes.deleteUsersData}>{index + 1}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.username}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.first_name}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.last_name}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.email}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{roleName}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.product_type}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.phone_no}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.gender}</TableCell>
                        {/* <TableCell className={classes.deleteUsersData}>{user.myuser.dialer_pass}</TableCell> */}
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.vertage_id}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.vertage_pass}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.parent_id}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.location}</TableCell>
                        <TableCell className={classes.deleteUsersData}></TableCell>
                      </TableRow>
                    }
                    if (deletedUser.role === "5") {
                      roleName = 'Team Leader'
                      return <TableRow className={classes.oddEvenRow} key={index} >
                        <TableCell className={classes.deleteUsersData}>{index + 1}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.username}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.first_name}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.last_name}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.email}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{roleName}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.product_type}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.phone_no}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.gender}</TableCell>
                        {/* <TableCell className={classes.deleteUsersData}>{user.myuser.dialer_pass}</TableCell> */}
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.vertage_id}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.vertage_pass}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.parent_id}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.location}</TableCell>
                        <TableCell className={classes.deleteUsersData}></TableCell>
                      </TableRow>
                    }
                    if (deletedUser.role === "6") {
                      roleName = 'Backend'
                      return <TableRow className={classes.oddEvenRow} key={index} >
                        <TableCell className={classes.deleteUsersData}>{index + 1}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.username}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.first_name}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.last_name}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.email}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{roleName}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.product_type}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.phone_no}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.gender}</TableCell>
                        {/* <TableCell className={classes.deleteUsersData}>{user.myuser.dialer_pass}</TableCell> */}
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.vertage_id}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.vertage_pass}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.parent_id}</TableCell>
                        <TableCell className={classes.deleteUsersData}>{deletedUser.myuser.location}</TableCell>
                        <TableCell className={classes.deleteUsersData}></TableCell>
                      </TableRow>
                    }
                  }) :
                    <div className={classes.loader}>
                      <ReactBootstrap.Spinner animation="border" />
                    </div>
                }
                <>
                  <Dialog open={isDeleteUser}>
                    <DialogTitle>Are You Want to Delete User?</DialogTitle>
                    <DialogContent style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: '0', marginBottom: '20px' }}>
                      <Button className="deleteButton" color="primary"
                        variant="contained" onClick={deleteUser}>Yes</Button>
                      <Button className="deleteButton" color="primary"
                        variant="contained" onClick={closeDeleteUserPopUp}>No</Button>
                    </DialogContent>
                  </Dialog>
                </>
                <>
                  <Dialog open={isResetPassword} onClose={closeResetPassword}>
                    <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
                    <DialogContent>
                      <Form onSubmit={confirmPasswordHandler}>
                        <Grid>
                          <TextField
                            type="password"
                            className="textField"
                            id="outlined-full-width"
                            label="Password"
                            style={{ margin: 8 }}
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            onFocus={() => setErrors("")}
                          />
                        </Grid>
                        <Grid>
                          <TextField
                            type="password"
                            className="textField"
                            id="outlined-full-width"
                            label="Confirm Password"
                            style={{ margin: 8 }}
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!!errors.cnfrmPassword}
                            helperText={errors.cnfrmPassword}
                            onFocus={() => setErrors("")}
                          />
                        </Grid>
                        <Button type="submit" className={classes.cnfrmPasswordBtn}>
                          Submit</Button>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </>
                <>
                  <Dialog open={isEditUser} onClose={closeEditUser}>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent className={classes.formContainer}>
                      <Form onSubmit={updateUserData} className={classes.formSubContainer}>
                        <Grid container style={{ justifyContent: 'center' }}>
                          <Grid>
                            <TextField
                              className="textField"
                              id="outlined-full-width"
                              label="Username"
                              style={{ margin: 8 }}
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              size="small"
                              value={updatedUserName}
                              onChange={(e) => setUpdatedUserName(e.target.value)}
                            />
                          </Grid>
                          <Grid>
                            <TextField
                              className="textField"
                              id="outlined-full-width"
                              label="First Name"
                              style={{ margin: 8 }}
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              size="small"
                              value={firstName}
                              onChange={(e) => setFirstName((e.target.value).trim())}
                            />
                          </Grid>
                        </Grid>
                        <Grid container style={{ justifyContent: 'center' }}>
                          <Grid>
                            <TextField
                              className="textField"
                              id="outlined-full-width"
                              label="Last Name"
                              style={{ margin: 8 }}
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              size="small"
                              value={lastName}
                              onChange={(e) => setLastName((e.target.value).trim())}
                            />
                          </Grid>
                          <Grid>
                            <TextField
                              className="textField"
                              id="outlined-full-width"
                              label="Email Id"
                              style={{ margin: 8 }}
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              size="small"
                              value={email}
                              onChange={(e) => setEmail((e.target.value).toLowerCase().trim())}
                            />
                          </Grid>
                        </Grid>
                        <Grid container style={{ justifyContent: 'center' }}>
                          <Grid>
                            <TextField
                              select
                              className="textField"
                              id="outlined-full-width"
                              label="Role"
                              style={{ margin: 8 }}
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              SelectProps={{
                                native: true,
                              }}
                              variant="outlined"
                              size="small"
                              value={role}
                              onChange={(e) => {
                                setRole(e.target.value)
                                listOfUsers(e.target.value)
                              }}
                            >
                              <option>Select One</option>
                              <option value="4">Super Admin</option>
                              <option value="1">Admin</option>
                              <option value="2">Manager</option>
                              <option value="5">Team Leader</option>
                              <option value="3">Agent</option>
                              <option value="6">Backend</option>
                            </TextField>
                          </Grid>
                          <Grid>
                            <TextField
                              select
                              className="textField"
                              id="outlined-full-width"
                              label="Product Type"
                              style={{ margin: 8 }}
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              SelectProps={{
                                native: true,
                              }}
                              variant="outlined"
                              size="small"
                              value={productType}
                              onChange={(e) => setProductType(e.target.value)}
                            >
                              <option>Select One</option>
                              <option value="PL">Personal Loan</option>
                              <option value="BL">Business Loan</option>
                              <option value="CC">Credit Card</option>
                              <option value="HL">Home Loan</option>
                              <option value="LAP">Loan Against Property</option>
                            </TextField>
                          </Grid>
                        </Grid>
                        <Grid container style={{ justifyContent: 'center' }}>
                          <Grid>
                            <TextField
                              className="textField"
                              id="outlined-full-width"
                              label="Phone No"
                              style={{ margin: 8 }}
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              size="small"
                              value={phoneNo}
                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                  setPhoneNo((e.target.value).trim())
                                }
                              }}
                            />
                          </Grid>
                          <Grid>
                            <TextField
                              select
                              className="textField"
                              id="outlined-full-width"
                              label="Gender"
                              style={{ margin: 8 }}
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              SelectProps={{
                                native: true,
                              }}
                              variant="outlined"
                              size="small"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="">Select One</option>
                              <option value="M">Male</option>
                              <option value="F">Female</option>
                              <option value="T">LGBT</option>
                            </TextField>
                          </Grid>
                        </Grid>
                        <Grid container style={{ justifyContent: 'center' }}>
                          <Grid>
                            <TextField
                              className="textField"
                              id="outlined-full-width"
                              label="Haloocoom Username"
                              style={{ margin: 8 }}
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={submitHaloocomUserName}>
                                       <SendIcon style={{ color: '#14cc9e' }}/>
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              size="small"
                              value={vertageId}
                              onChange={(e) => setVertageId((e.target.value).trim())}
                            />
                          </Grid>
                          <Grid>
                            <TextField
                              className="textField"
                              id="outlined-full-width"
                              label="Vertage Password"
                              style={{ margin: 8 }}
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              size="small"
                              value={vertagePass}
                              onChange={(e) => setVertagePass((e.target.value).trim())}
                            />
                          </Grid>
                        </Grid>
                        <Grid container style={{ justifyContent: 'center' }}>
                          <Grid>
                            <TextField
                              select
                              className="textField"
                              id="outlined-full-width"
                              label="Parent"
                              style={{ margin: 8 }}
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              size="small"
                              value={parent}
                              onChange={(e) => setparent(e.target.value)}
                            >
                              <option>Select One</option>
                              {updateUsers.map(item => {
                                return <option style={{ cursor: 'pointer' }} value={item.myuser.username}>{item.myuser.username}</option>
                              })}
                            </TextField>
                          </Grid>
                          <Grid>
                            <FormControl
                              className="textField"
                              style={{ margin: 8 }}
                              margin="normal"
                              variant="outlined"
                              size="small">
                              <InputLabel id="demo-mutiple-checkbox-label">Location</InputLabel>
                              <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={location}
                                onChange={(e) => setlocation(e.target.value)}
                                label="Location"
                                renderValue={(selected) => selected.join(', ')}
                              >
                                {pullLocation.map((name) => (
                                  <MenuItem value={name.id}>
                                    <Checkbox style={{ color: "#535ad1" }} checked={location.indexOf(name.id) > -1} />
                                    <ListItemText primary={name.city} />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                        <Button type="submit" className={classes.editUserBtn}>
                          Update</Button>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </PageLayerSection>
  );
}
