import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import baseUrl from '../../global/api';
import { useForm, Controller } from "react-hook-form";
import {
  Button, Container, FormControl, Grid, InputAdornment, InputLabel,
  Select, MenuItem, TextField, Typography, FormHelperText,Card
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import style from "./UserCreate.module.css";
import PageLayerSection from '../PageLayerSection/PageLayerSection';

const useStyles = makeStyles((theme) => ({
  CreateUser:{
    padding: '25px 300px'
  },
  alertBox:{
    color: "#004085",
    backgroundColor: "#cce5ff",
    borderColor: "#b8daff",
    textAlign: "center",
    margin: "0 auto"
  },
  UserCreateText:{
    fontWeight: "bold",
    color: "#183365",
    fontFamily: "Lato"
  },
  UserCreateBar:{
    border: '1px solid #FDA770 !important',
    marginTop: '0!important'
  },
  input_field: {
    margin: theme.spacing(1, 0),
    '&:hover': {
        borderRadius: '1px solid #535ad1',
    }
},
create_user_btn:{
  margin: theme.spacing(1, 0),
  padding: theme.spacing(2),
  borderRadius: '5px',
},
UserCreateCard:{
    backgroundColor:'#FFFFFF!important',
        borderRadius: '16px!important',
        padding: '40px',
        opacity: 1,
        boxShadow: '-6px 6px 30px #0000004D'
  },
}));
export default function UserCreate() {
  const classes = useStyles();
  const [alertMessage, setAlertMessage] = useState('');
  const [isDisplay, setIsDisplay] = useState(false);
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = async(data) => {
    const {userName,firstName,lastName,email,role,productType,phoneNo,gender} = data;
    let item = {
      username: userName, first_name: firstName, last_name: lastName, email, role,
      product_type: productType, phone_no: phoneNo, gender
    };

    await axios.post(`${baseUrl}/user/userRegistration/`, item)
      .then((response) => {
        setAlertMessage(response.data['data']);
        setIsDisplay(true);
      }).catch((error) => {
        setAlertMessage('something wrong');
        setIsDisplay(true);
      })
    }
  return (
    <PageLayerSection>
      <Container className={classes.CreateUser}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className={classes.UserCreateCard}> 
            {isDisplay && <Alert className={classes.alertBox} 
            severity="error"
            >{alertMessage}</Alert>}
            <Grid>
              <Grid>
            <Typography className={classes.UserCreateText}>
              User Create
              <hr className={classes.UserCreateBar} />
            </Typography>
            </Grid>
            <Grid >
              <Typography>User Name</Typography>
              <TextField
                className={classes.input_field}
                variant="filled"
                fullWidth
                type="text"
                name="userName"
                inputRef={register({
                  required: 'User name is required',
                  pattern:{
                    value:/^(?! )[a-z0-9]*(?<! )$/g,
                    message:'please enter a valid user name'
                  }
              })}
              error={Boolean(errors.userName)}
              helperText={errors.userName?.type === "required" ? errors.userName?.message :errors.userName?.message}/>
            </Grid>
            <Grid >
              <Typography>First Name</Typography>
              <TextField
                className={classes.input_field}
                variant="filled"
                fullWidth
                type="text"
                name="firstName" 
                inputRef={register({
                  required: 'First name is required',
                  pattern:{
                    value:/^(?! )[a-z]*(?<! )$/g,
                    message:'please enter a valid first name'
                  }
              })}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.type === "required" ? errors.firstName?.message :errors.firstName?.message}/>
            </Grid>
            <Grid >
              <Typography>Last Name</Typography>
              <TextField
                className={classes.input_field}
                variant="filled"
                fullWidth
                type="text"
                name="lastName"
                inputRef={register({
                  required: 'Last name is required',
                  pattern:{
                    value:/^(?! )[a-z]*(?<! )$/g,
                    message:'please enter a valid last name'
                  }
              })}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.type === "required" ? errors.lastName?.message :errors.lastName?.message} />
            </Grid>
            <Grid >
              <Typography>Email Id</Typography>
              <TextField
                className={classes.input_field}
                variant="filled"
                fullWidth
                type="text"
                name="email"
                inputRef={register({
                  required: 'E-mail is required',
                  pattern:{
                    value:/^(?! )[a-z0-9._%+-]+@[c][r][e][d][f][i][n][e]+\.[a-z]{2,15}/g,
                    message:'please enter a valid email'
                  }
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.type === "required" ? errors.email?.message :errors.email?.message}
              />
            </Grid>
            <Grid >
              <Typography>Role</Typography>
              <FormControl
                  className={classes.input_field}
                  fullWidth
                  variant="filled"
                  error={Boolean(errors.role)}>
                  <InputLabel>Select</InputLabel>
                  <Controller
                      render={(props) => (
                          <Select value={props.value} onChange={props.onChange}>
                              <MenuItem value="1">Admin</MenuItem>
                              <MenuItem value="2">Manager</MenuItem>
                              <MenuItem value="3">Agent</MenuItem>
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
            <Grid >
              <Typography>Product Type</Typography>
              <FormControl
                  className={classes.input_field}
                  fullWidth
                  variant="filled"
                  error={Boolean(errors.productType)}>
                  <InputLabel>Select</InputLabel>
                  <Controller
                      render={(props) => (
                          <Select value={props.value} onChange={props.onChange}>
                              <MenuItem value="PL">Personal Loan</MenuItem>
                              <MenuItem value="BL">Business Loan</MenuItem>
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
            <Grid >
              <Typography>Phone No</Typography>
              <TextField
              className={classes.input_field}
              variant="filled"
                fullWidth
                type="number"
                name="phoneNo"
                inputRef={register({
                  required: 'Phone no is required',
                  pattern:{
                    value:/^[0-9]{10}$/g,
                    message:'Phone no should be 10 digits'
                  }
              })}
              error={Boolean(errors.phoneNo)}
              helperText={errors.phoneNo?.type === "required" ? errors.phoneNo?.message :errors.phoneNo?.message}
              />
            </Grid>
            <Grid >
              <Typography>Gender</Typography>
              <FormControl
                  className={classes.input_field}
                  fullWidth
                  variant="filled"
                  error={Boolean(errors.gender)}>
                  <InputLabel>Select</InputLabel>
                  <Controller
                      render={(props) => (
                          <Select value={props.value} onChange={props.onChange}>
                              <MenuItem value="M">Male</MenuItem>
                              <MenuItem value="B">Female</MenuItem>
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
