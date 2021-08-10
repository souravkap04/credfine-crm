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
} from "@material-ui/core";
import { Form, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
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
const useStyles = makeStyles({
  container: {
    marginTop: '10px'
  },
  scroller: {
    overflow: 'auto',
    maxHeight: '500px',
  },
  searchInput: {
    margin: '0px 200px',
    padding: '20px'
  },
  header: {
    position: 'sticky',
    top: 0,
  },
  table: {
    Width: "100%",
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
    margin: '0 56px',
    padding: '5px',
    width: '50%',
    color: 'white',
    '&:hover': {
      backgroundColor: '#447d40'
    }
  },
  editUserBtn: {
    borderRadius: '15px',
    backgroundColor: '#13B980',
    fontSize: '15px',
    fontFamily: 'Lato',
    margin: '12px 121px',
    padding: '5px',
    width: '50%',
    color: 'white',
    '&:hover': {
      backgroundColor: '#447d40'
    }
  },
  tableheading: {
    padding: '0 8px',
    fontSize: '12px',
    textAlign: 'center'
  },
  tabledata: {
    padding: '0 8px',
    fontSize: '12px',
    textAlign: 'center'
  },

});
export default function Users() {
  const classes = useStyles();
  const profileData = getProfileData();
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [productType, setProductType] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [dialerApiKey, setDialerApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rowData, setRowData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [isDisplay, setIsDisplay] = useState(false);
  const [deleteCount, setDeleteCount] = useState(0);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [vertageId, setVertageId] = useState("");
  const [vertagePass, setVertagePass] = useState("");
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
          })
      } catch (error) {
        setAlertMessage("something wrong");
        setIsDisplay(true);
      }
    }

  }
  useEffect(() => {
    const fetchUserData = async () => {
      const headers = {
        'userRoleHash': profileData.user_roles[0].user_role_hash,
      };
      try {
        const response = await axios.get(`${baseUrl}/user/fetchUsers/`, { headers });
        setUsers(response.data);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [deleteCount])
  const deleteUser = async (userName, index) => {
    const headers = {
      'userRoleHash': profileData.user_roles[0].user_role_hash,
      // 'userRoleHash' : 'f63e2d14-b15a-11eb-bc7e-000000000013'
    };
    let item = null;
    await axios.post(`${baseUrl}/user/deleteUser/${userName}`, item, { headers })
      .then((response) => {
        setDeleteCount(deleteCount + 1);
      }).catch((error) => {
        console.log(error);
      })
  }
  const editUser = (userName, firstName, lastName, email, role, gender, phoneNo, productType, dialerPass, vertageId, vertagePass) => {
    setIsEditUser(true);
    setSelectedUserName(userName);
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
  }
  const closeEditUser = () => {
    setIsEditUser(false);
  }
  const updateUserData = async (e) => {
    e.preventDefault();
    let item = {
      first_name: firstName, last_name: lastName, email, role, gender, phone_no: phoneNo,
      product_type: productType, dialer_pass: dialerApiKey, vertage_id: vertageId, vertage_pass: vertagePass
    };
    const headers = {
      'userRoleHash': profileData.user_roles[0].user_role_hash,
    };
    await axios.put(`${baseUrl}/user/updateUser/${selectedUserName}`, item, { headers })
      .then((response) => {
        setAlertMessage(response.data.message);
        setIsDisplay(true);
      }).catch((error) => {
        setAlertMessage("something wrong");
        setIsDisplay(true);
      })
  }

  return (
    <PageLayerSection>
      <div className={classes.container}>
        <Paper>
          <div className={classes.searchInput}>
            <InputGroup>
              <FormControl type="text" placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm((e.target.value).toLowerCase().trim())} />
            </InputGroup>
          </div>
          <TableContainer className={classes.scroller}>
            <Table>
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell className={classes.tableheading}>USER NAME</TableCell>
                  <TableCell className={classes.tableheading}>FIRST NAME</TableCell>
                  <TableCell className={classes.tableheading}>LAST NAME</TableCell>
                  <TableCell className={classes.tableheading}>EMAIL</TableCell>
                  <TableCell className={classes.tableheading}>Role</TableCell>
                  <TableCell className={classes.tableheading}>Product Type</TableCell>
                  <TableCell className={classes.tableheading}>Phone No</TableCell>
                  <TableCell className={classes.tableheading}>Gender</TableCell>
                  {/* <TableCell className={classes.tableheading}>DIALER API Key</TableCell> */}
                  <TableCell className={classes.tableheading}>Vertage Id</TableCell>
                  <TableCell className={classes.tableheading}>Vertage Pass</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? users.filter((user) => {
                  if (searchTerm === "") {
                    return user;
                  } else if (user.phone_no.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return user;
                  } else if (user.myuser.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return user;
                  } else if (user.myuser.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return user;
                  }
                }).map((user, index) => (
                  <TableRow key={index} >
                    <TableCell className={classes.tabledata}>{user.myuser.username}</TableCell>
                    <TableCell className={classes.tabledata}>{user.myuser.first_name}</TableCell>
                    <TableCell className={classes.tabledata}>{user.myuser.last_name}</TableCell>
                    <TableCell className={classes.tabledata}>{user.myuser.email}</TableCell>
                    <TableCell className={classes.tabledata}>{user.role}</TableCell>
                    <TableCell className={classes.tabledata}>{user.product_type}</TableCell>
                    <TableCell className={classes.tabledata}>{user.phone_no}</TableCell>
                    <TableCell className={classes.tabledata}>{user.gender}</TableCell>
                    {/* <TableCell className={classes.tabledata}>{user.myuser.dialer_pass}</TableCell> */}
                    <TableCell className={classes.tabledata}>{user.myuser.vertage_id}</TableCell>
                    <TableCell className={classes.tabledata}>{user.myuser.vertage_pass}</TableCell>
                    <TableCell className={classes.tabledata}>
                      <Tooltip title="Reset Password">
                        <IconButton onClick={() => resetPasswordHandler(user.myuser.username, index)}>
                          <LockIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => editUser(user.myuser.username, user.myuser.first_name,
                            user.myuser.last_name, user.myuser.email, user.role, user.gender, user.phone_no,
                            user.product_type, user.myuser.dialer_pass, user.myuser.vertage_id,
                            user.myuser.vertage_pass)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete User">
                        <IconButton onClick={() => deleteUser(user.myuser.username, index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )) :
                  <div className={classes.loader}>
                    <ReactBootstrap.Spinner animation="border" />
                  </div>
                }
                <>
                  <Dialog open={isResetPassword} onClose={closeResetPassword}>
                    <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
                    <DialogContent>
                      <Form onSubmit={confirmPasswordHandler}>
                        {isDisplay ? <ReactBootstrap.Alert variant="primary">{alertMessage}</ReactBootstrap.Alert> : null}
                        <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            autoFocus
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={!!errors.password} />
                          <Form.Control.Feedback type="invalid"> {errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            isInvalid={!!errors.cnfrmPassword} />
                          <Form.Control.Feedback type="invalid"> {errors.cnfrmPassword}</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" className={classes.cnfrmPasswordBtn}>
                          Submit</Button>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </>
                <>
                  <Dialog open={isEditUser} onClose={closeEditUser}>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent>
                      <Form onSubmit={updateUserData}>
                        {isDisplay ? <ReactBootstrap.Alert variant="primary">{alertMessage}</ReactBootstrap.Alert> : null}
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName((e.target.value).toLowerCase().trim())} />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName((e.target.value).toLowerCase().trim())} />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label>EmailId</Form.Label>
                              <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail((e.target.value).toLowerCase().trim())} />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Label>Role</Form.Label>
                              <Form.Control
                                as="select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}>
                                <option>Select One</option>
                                <option value="1">Admin</option>
                                <option value="2">Manager</option>
                                <option value="3">Agent</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label>Product Type</Form.Label>
                              <Form.Control
                                as="select"
                                value={productType}
                                onChange={(e) => setProductType(e.target.value)}>
                                <option value="">Select One</option>
                                <option value="PL">Personal Loan</option>
                                <option value="BL">Business Loan</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Label>Phone No</Form.Label>
                              <Form.Control
                                type="number"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo((e.target.value).trim())} />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label>Gender</Form.Label>
                              <Form.Control
                                as="select"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select One</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                              </Form.Control>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Label>Dialer Api Key</Form.Label>
                              <Form.Control
                                type="text"
                                value={dialerApiKey}
                                onChange={(e) => setDialerApiKey((e.target.value).trim())} />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label>Vertage Id</Form.Label>
                              <Form.Control
                                type="text"
                                value={vertageId}
                                onChange={(e) => setVertageId((e.target.value).trim())} />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Label>Vertage Pass</Form.Label>
                              <Form.Control
                                type="text"
                                value={vertagePass}
                                onChange={(e) => setVertagePass((e.target.value).trim())} />
                            </Form.Group>
                          </Col>
                        </Row>
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
