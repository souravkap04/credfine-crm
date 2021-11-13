import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import baseUrl from '../../global/api';
import { useForm, Controller } from "react-hook-form";
import {
  Button, Container, FormControl, Grid, InputAdornment, ListItemText, Checkbox, InputLabel,
  Select, MenuItem, TextField, Typography, FormHelperText, Card
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import { getProfileData } from '../../global/leadsGlobalData';
import './usercreate.css';
const useStyles = makeStyles((theme) => ({
  CreateUser: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px'
  },
  alertBox: {
    color: "#004085",
    backgroundColor: "#cce5ff",
    borderColor: "#b8daff",
    textAlign: "center",
    margin: "0 auto"
  },
  UserCreateText: {
    fontWeight: "bold",
    color: "#183365",
    fontFamily: "Lato",
    marginTop: '20px',
    paddingLeft: '25px'
  },
  UserCreateBar: {
    width: '90%',
    border: '1px solid #FDA770 !important',
    marginTop: '0 !important'
  },
  input_field: {
    margin: theme.spacing(1, 0),
    '&:hover': {
      borderRadius: '2px solid #c5cee0',
    }
  },
  create_user_btn: {
    width: '50%',
    boxShadow: 'none',
    padding: theme.spacing(2),
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '20px'
  },
  UserCreateCard: {
    width: '37.5vw',
    opacity: 1,
    boxShadow: 'none'
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function UserCreate() {
  const classes = useStyles();
  const profileData = getProfileData();
  const [users, setUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [isDisplay, setIsDisplay] = useState(false);
  const [isError, setIsError] = useState(false);
  const [location, setlocation] = useState([]);
  const [pullLocation, setpullLocation] = useState([]);
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = async (data) => {
    const { userName, firstName, lastName, email, role, productType, phoneNo, gender, parent ,dialerId ,dialerPassword} = data;
    let item = {
      username: userName, first_name: firstName, last_name: lastName, email, role,
      product_type: productType, phone_no: phoneNo, gender: gender, parent_user: parent, locations: location
    };
    await axios.post(`${baseUrl}/user/userRegistration/`, item)
      .then((response) => {
        setAlertMessage(response.data['data']);
        setIsDisplay(true);
        data = ''
      }).catch((error) => {
        if (error.response?.status === 409) {
          setAlertMessage(error.response.data.error);
          setIsError(true);
        } else {
          setAlertMessage('Something wrong');
          setIsError(true);
        }
      })
  }
  const disableSnacksBar = () => {
    setIsDisplay(false);
    setIsError(false);
  }
  useEffect(() => {
    // listOfUsers()
    listOfLocations()
  }, []);
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
  const listOfUsers = async (role) => {
    const headers = {
      'Authorization': `Token ${profileData.token}`,
      'userRoleHash': profileData.user_roles[0].user_role_hash,
    };
    let items = { user_role: role }
    await axios.post(`${baseUrl}/user/fetchRoleUser/`, items, { headers })
      .then((response) => {
        setUsers(response.data);
      }).catch((error) => {
        console.log(error);
      })
  }
  return (
    <PageLayerSection>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isDisplay} autoHideDuration={1500} onClose={disableSnacksBar}>
        <Alert onClose={disableSnacksBar} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isError} autoHideDuration={1500} onClose={disableSnacksBar}>
        <Alert onClose={disableSnacksBar} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Container className={classes.CreateUser}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className={classes.UserCreateCard}>
            <Grid>
              <Grid>
                <Typography className={classes.UserCreateText}>
                  User Create
                </Typography>
                <hr className={classes.UserCreateBar} />
              </Grid>
              <Grid container style={{ justifyContent: 'space-evenly' }}>
                <Grid>
                  <TextField
                    className={classes.input_field + ' input_field'}
                    variant="outlined"
                    fullWidth
                    type="text"
                    name="userName"
                    label="User Name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputRef={register({
                      required: 'User name is required',
                      pattern: {
                        value: /^(?! )[A-Za-z0-9]*(?<! )$/g,
                        message: 'please enter a valid user name'
                      }
                    })}
                    error={Boolean(errors.userName)}
                    helperText={errors.userName?.type === "required" ? errors.userName?.message : errors.userName?.message}
                  />
                </Grid>
                <Grid >
                  <TextField
                    className={classes.input_field + ' input_field'}
                    variant="outlined"
                    fullWidth
                    type="text"
                    name="firstName"
                    label="First Name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputRef={register({
                      required: 'First name is required',
                      pattern: {
                        value: /^[a-zA-Z ]{2,30}$/,
                        message: 'please enter a valid first name'
                      }
                    })}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.type === "required" ? errors.firstName?.message : errors.firstName?.message} 
                    />
                </Grid>
              </Grid>
              <Grid container style={{ justifyContent: 'space-evenly' }}>
                <Grid>
                  <TextField
                    className={classes.input_field + ' input_field'}
                    variant="outlined"
                    fullWidth
                    type="text"
                    name="lastName"
                    label="Last Name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputRef={register({
                      required: 'Last name is required',
                      pattern: {
                        value: /^[a-zA-Z ]{2,30}$/,
                        message: 'please enter a valid last name'
                      }
                    })}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.type === "required" ? errors.lastName?.message : errors.lastName?.message} 
                    />
                </Grid>
                <Grid >
                  <TextField
                    className={classes.input_field + ' input_field'}
                    variant="outlined"
                    fullWidth
                    type="number"
                    name="phoneNo"
                    label="Phone No"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputRef={register({
                      required: 'Phone no is required',
                      pattern: {
                        value: /^[0-9]{10}$/g,
                        message: 'Phone no should be 10 digits'
                      }
                    })}
                    error={Boolean(errors.phoneNo)}
                    helperText={errors.phoneNo?.type === "required" ? errors.phoneNo?.message : errors.phoneNo?.message}
                  />
                </Grid>
              </Grid>
              <Grid container style={{ justifyContent: 'space-evenly' }}>
                <Grid>
                  <TextField
                    className={classes.input_field + ' input_field'}
                    variant="outlined"
                    fullWidth
                    type="text"
                    name="email"
                    label="Email Id"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputRef={register({
                      required: 'E-mail is required',
                      pattern: {
                        value: /^(?! )[a-z0-9._%+-]+@[c][r][e][d][f][i][n][e]+\.[a-z]{2,15}/g,
                        message: 'please enter a valid email'
                      }
                    })}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.type === "required" ? errors.email?.message : errors.email?.message}
                  />
                </Grid>
                <Grid>
                  <FormControl
                    className={classes.input_field + ' input_field'}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors.gender)}>
                    <InputLabel>Gender</InputLabel>
                    <Controller
                      render={(props) => (
                        <Select label="Gender" value={props.value} onChange={props.onChange}>
                          <MenuItem value="M">Male</MenuItem>
                          <MenuItem value="F">Female</MenuItem>
                          <MenuItem value="T">LGBT</MenuItem>
                        </Select>
                      )}
                      defaultValue=""
                      name="gender"
                      control={control}
                      rules={{
                        required: 'Please choose your gender'
                      }}
                    />
                    <FormHelperText>{errors.gender?.message}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container style={{ justifyContent: 'space-evenly' }}>
                <Grid>
                  <FormControl
                    className={classes.input_field + ' input_field'}
                    fullWidth
                    variant="outlined"
                    error={Boolean(errors.role)}>
                    <InputLabel>Role</InputLabel>
                    <Controller
                      render={(props) => (
                        <Select label="Role" value={props.value} onChange={props.onChange}>
                          <MenuItem value="4" onClick={() => listOfUsers(4)}>Super Admin</MenuItem>
                          <MenuItem value="1" onClick={() => listOfUsers(1)}>Admin</MenuItem>
                          <MenuItem value="2" onClick={() => listOfUsers(2)}>Manager</MenuItem>
                          <MenuItem value="5" onClick={() => listOfUsers(5)}>Team Leader</MenuItem>
                          <MenuItem value="3" onClick={() => listOfUsers(3)}>Agent</MenuItem>
                          <MenuItem value="6" onClick={() => listOfUsers(6)}>Backend</MenuItem>
                        </Select>
                      )}
                      defaultValue=""
                      name="role"
                      control={control}
                      rules={{
                        required: 'Please choose your role'
                      }}
                    />
                    <FormHelperText>{errors.role?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl
                    className={classes.input_field + ' input_field'}
                    fullWidth
                    variant="outlined"
                    error={Boolean(errors.productType)}>
                    <InputLabel>Product Type</InputLabel>
                    <Controller
                      render={(props) => (
                        <Select label="Product Type" value={props.value} onChange={props.onChange}>
                          <MenuItem value="PL">Personal Loan</MenuItem>
                          <MenuItem value="BL">Business Loan</MenuItem>
                          <MenuItem value="CC">Credit Card</MenuItem>
                          <MenuItem value="HL">Home Loan</MenuItem>
                          <MenuItem value="LAP">Loan Against Property</MenuItem>
                        </Select>
                      )}
                      defaultValue=""
                      name="productType"
                      control={control}
                      rules={{
                        required: 'Please choose your product Type'
                      }}
                    />
                    <FormHelperText>{errors.productType?.message}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container style={{ justifyContent: 'space-evenly' }}>
                <Grid>
                  <FormControl
                    className={classes.input_field + ' input_field'}
                    fullWidth
                    variant="outlined"
                    error={Boolean(errors.parent)}>
                    <InputLabel>Parent</InputLabel>
                    <Controller
                      render={(props) => (
                        <Select label="Parent" value={props.value} onChange={props.onChange}>
                          {users.map(item => {
                            return <MenuItem value={item.myuser.username}>{item.myuser.username}</MenuItem>
                          })}
                        </Select>
                      )}
                      defaultValue=""
                      name="parent"
                      control={control}
                      rules={{
                        required: 'Please choose your parent'
                      }}
                    />
                    <FormHelperText>{errors.parent?.message}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl className={classes.input_field + ' input_field'}
                    fullWidth
                    variant="outlined"
                    error={Boolean(errors.location)}
                  >
                    <InputLabel>Location</InputLabel>
                    <Select
                      label="Location"
                      labelId="demo-mutiple-name-label"
                      id="demo-mutiple-name"
                      multiple
                      value={location}
                      onChange={(e) => setlocation(e.target.value)}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {pullLocation.map((name) => (
                        <MenuItem value={name.id}>
                          <Checkbox style={{ color: "#535ad1" }} checked={location.indexOf(name.id) > -1} />
                          <ListItemText primary={name.city} />
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.location?.message}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item lg={12}>
                <Button
                  className={classes.create_user_btn}
                  type="submit"
                  variant='contained'
                  color='primary'
                  fullWidth>
                  Create
                </Button>
              </Grid>
            </Grid>
          </Card>
        </form>

      </Container>
    </PageLayerSection>
  );
}
