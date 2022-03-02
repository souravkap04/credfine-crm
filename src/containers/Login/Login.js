import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import baseUrl from "../../global/api";
import crmLogo from "../../images/crmLogo.svg";
import loinImage from "../../images/loginImage.png";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import { getCampaign, getDialer } from "../../global/leadsGlobalData";
import {haloocomNoidaDialerApi,haloocomMumbaiDialerApi} from '../../global/callApi';
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import "./login.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    display: "flex",
    backgroundColor: "#ffffff",
  },
  login_form: {
    width: "50vw",
    marginTop: "77px",
    paddingLeft: "13vw",
    paddingRight: "8vw",
    // padding: theme.spacing(0, 21),
  },
  input_field: {
    margin: theme.spacing(1, 0),
    "&:hover": {
      borderRadius: "1px solid #535ad1",
    },
  },
  login_btn: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
  welcome_back: {
    fontFamily: "Lato",
    fontSize: "20px",
    color: "#393939",
  },
  login_account: {
    fontFamily: "Lato",
    fontSize: "32px",
    fontWeight: "900",
    color: "#393939",
    marginBottom: theme.spacing(3),
  },
  crm_logo: {
    height: "13vh",
    margin: theme.spacing(0, 0, 3, 2),
  },
  alert_box: {
    margin: theme.spacing(0, 0, 2, 0),
  },
}));

export default function Login() {
  const classes = useStyles();
  const campaignData = getCampaign();
  const dialerData = getDialer();
  let history = useHistory();
  const [alertMessage, setAlertMessage] = useState("");
  const [isDisplay, setIsDisplay] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [selectedDialer,setSelectedDialer] = useState("");
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = async (data) => {
    const { email, password, campaign, dialer } = data;
    let item = {
      username: email,
      password,
      campaign_category: campaign,
      dialer,
    };
    await axios
      .post(`${baseUrl}/user/login/`, item)
      .then((response) => {
        localStorage.setItem("user_info", JSON.stringify(response.data));
        const profileData = JSON.parse(localStorage.getItem("user_info"));
        if (profileData.is_admin_verified) {
          if (profileData.user_roles[0].user_type === 3) {
            history.push("/dashboards/leads");
          } else {
            history.push("/dashboard");
          }
          let headers = { Authorization: `Token ${profileData.token}` };
          axios
            .get(`${baseUrl}/leads/fetchAllLeads/`, { headers })
            .then((response) => {
              localStorage.setItem(
                "status_info",
                JSON.stringify(response.data)
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if(dialer === "HALOOCOM-Noida"){
         axios.post(`${haloocomNoidaDialerApi}/action.php?user=${profileData.vertage_id}&type=Login`)
         .then((response)=>{
          console.log("dialer-noida loin successfull")
         }).catch((error)=>{
          console.log(error);
         })
        }else if(dialer === "HALOOCOM-Mumbai"){
          axios.post(`${haloocomMumbaiDialerApi}/action.php?user=${profileData.vertage_id}&type=Login`)
          .then((response)=>{
           console.log("dialer-mumbai loin successfull")
          }).catch((error)=>{
           console.log(error);
          })
        }
      })
      .catch((error) => {
        setAlertMessage("This is an error alert — check it out!");
        setIsDisplay(true);
      });
  };
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };
  return (
    <div className={classes.root}>
      <div className="leftSectionImage">
        <img src={loinImage} alt="login image" />
      </div>
      <Container className={classes.login_form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isDisplay && (
            <Alert className={classes.alert_box} severity="error">
              {alertMessage}
            </Alert>
          )}
          <Grid>
            <Grid>
              <img src={crmLogo} alt="CRM Logo" className={classes.crm_logo} />
            </Grid>
            <Grid>
              <Typography className={classes.welcome_back}>
                Welcome back
              </Typography>
              <Typography className={classes.login_account}>
                Login to your account
              </Typography>
            </Grid>
            <Grid item lg={12}>
              <Typography>Username</Typography>
              <TextField
                className={classes.input_field}
                placeholder="UserName1234"
                variant="standard"
                fullWidth
                name="email"
                inputRef={register({
                  required: "E-mail is required",
                })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item lg={12}>
              <Typography>Password</Typography>
              <TextField
                className={classes.input_field}
                variant="standard"
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                inputRef={register({
                  required: "Password is required",
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HttpsOutlinedIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item lg={12}>
              {/* <Typography>Dialer</Typography> */}
              <FormControl
                className={classes.input_field}
                fullWidth
                variant="standard"
                error={Boolean(errors.dialer)}
                value={selectedDialer}
                onChange={(e)=>setSelectedDialer(e.target.value)}
              >
                <InputLabel>Select Dialer</InputLabel>
                <Controller
                  render={(props) => (
                    <Select value={props.value} onChange={props.onChange}>
                      {dialerData.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  defaultValue=""
                  name="dialer"
                  control={control}
                  rules={{
                    required: "Please choose your dialer",
                  }}
                />
                <FormHelperText>{errors.dialer?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={12}>
              {/* <Typography>Campaign</Typography> */}
              <FormControl
                className={classes.input_field}
                fullWidth
                variant="standard"
                error={Boolean(errors.campaign)}
              >
                <InputLabel>Select Campaign</InputLabel>
                <Controller
                  render={(props) => (
                    <Select value={props.value} onChange={props.onChange}>
                      {campaignData.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  defaultValue=""
                  name="campaign"
                  control={control}
                  rules={{
                    required: "Please choose your campaign",
                  }}
                />
                <FormHelperText>{errors.campaign?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={12}>
              <Button
                className={classes.login_btn}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
