import React, { useState, useEffect } from 'react';
import Login from './containers/Login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useDrag } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/web';
// import MainMenu from './containers/UserList/MainMenu';
import Profile from './containers/UserList/Profile/Profile';
import Leads from './containers/Leads/Leads';
// import LeadDetails from './containers/Leads/LeadDetails';
import Dashboard from './containers/Dashboard/Dashboard';
import FreshLeads from './containers/FreshLead/FreshLeads';
import FollowUp from './containers/FollowUp/FollowUp';
import MyLeads from './containers/MyLeads/MyLeads';
import Users from './containers/Users/ResetPassword';
import VerifyUsers from './containers/UserList/VerifyUsers';
import AddLeads from './containers/PlData/PlForm';
import Reports from './containers/Report/Report';
import BulkUploads from './containers/UploadLeads/UploadLeads';
import AddUsers from './containers/UserCreate/UserCreate';
import LeadDetailsNew from './containers/LeadDetailsNew/LeadDetailsNew';
import { getProfileData } from './global/leadsGlobalData';
import axios from 'axios';
import baseUrl from './global/api';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import PricingPopup from './containers/PricingPopup/PricingPopup';
import PersonalLoanForm from './containers/PersonalLoanForm/PersonalLoanForm';
import HDFCForm from './containers/HDFCForm/HDFCForm';
import Loanbaba from './containers/LOANBABAForm/Loanbaba';
import Paysense from './containers/PaysenseForm/Paysense';
import CalculatorTable from './containers/CalculatorTable/CalculatorTable';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function App() {
  const [showStatus, setshowStatus] = useState(false)
  const [showStatusOnline, setshowStatusOnline] = useState(false)
  const [showStatusMessage, setshowStatusMessage] = useState('')
  const getProfile = getProfileData()
  const posP = useSpring({ x: 0, y: 0 });
  const bindP = useDrag((params) => {
    posP.x.set(params.offset[0]);
    posP.y.set(params.offset[1]);
  });
  const notification = async () => {
    const headers = {
      'Authorization': `Token ${getProfile.token}`,
    };
    await axios.get(`${baseUrl}/leads/CheckFollowupLead/`, { headers })
      .then((response) => {
        if (response.data.followup_lead_avail === true && response.data.total_followup_lead > 0) {
          localStorage.setItem('notification', response.data.total_followup_lead);
        } else if (response.data.followup_lead_avail === false && response.data.total_followup_lead === 0) {
          localStorage.removeItem('notification')
        }
      }).catch((error) => {

      })
  }
  useEffect(() => {
    var today = new Date().getHours();
    if (today >= 7 && today <= 20) {
      setInterval(() => {
        if (localStorage.getItem('user_info')) {
          notification();
        }
      }, 300000)
    }
    if (localStorage.removeItem('notification')) {
      clearInterval();
    }
  }, []);
  useEffect(() => {
    // now we listen for network status changes
    window.addEventListener('online', () => {
      setshowStatusMessage("Back to Online")
      setshowStatus(false);
      setshowStatusOnline(true);
    });

    window.addEventListener('offline', () => {
      setshowStatusMessage("Please Check your internet connection!")
      setshowStatus(true);
    });
  }, []);
  function getLocalStream() {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
      window.localStream = stream;
      window.localAudio.srcObject = stream;
      window.localAudio.autoplay = true;
    }).catch((err) => {
      console.error(`you got an error: ${err}`)
    });
  }

  useEffect(() => {
    getLocalStream();
    // window.onload = function () {
    //   var constraints = { audio: true }
    //   navigator.mediaDevices.getUserMedia(constraints)
    // }
  }, [])
  const disableConnection = () => {
    setshowStatus(false)
    setshowStatusOnline(false)
  }
  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
        localStorage.getItem('user_info') ?
          <Component {...props} />
          : <Redirect to="/" />
      )} />
    );
  };
  return (
    <div>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={showStatusOnline} autoHideDuration={2000} onClose={disableConnection}>
        <Alert onClose={disableConnection} severity="success">
          {showStatusMessage}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={showStatus}>
        <Alert onClose={disableConnection} severity="error">
          {showStatusMessage}
        </Alert>
      </Snackbar>
      <animated.div {...bindP()} style={{
        x: posP.x,
        y: posP.y,
        touchAction: 'none',
        userSelect: 'none',
        backgroundColor: '#14cc9e',
        paddingTop: '50px',
        width: '300px',
        height: '350px',
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 10000,
        cursor: "move",
      }} >
        <div className='iframeContainer'>
          <iframe
            src="https://credfine.slashrtc.in/index.php/ssoLogin?crmUniqueId=gv/OYoWng8rSuq+e1i6W6Q==&usernameId=SouravKapri1&requestOrigin=http://crm.credfine.com/"
            frameBorder='0'
            allow="microphone https://credfine.slashrtc.in"
            width='100%'
            height='350'
          ></iframe>
        </div>
      </animated.div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <PrivateRoute exact path="/profile" component={Profile} />
          {/* <PrivateRoute exact path="/test/edit/:leadid" component={LeadDetailsNew} /> */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/dashboards/leads" component={Leads} />
          <PrivateRoute exact path="/dashboards/leads/edit/:leadid" component={LeadDetailsNew} />
          <PrivateRoute exact path="/dashboards/freshlead" component={FreshLeads} />
          <PrivateRoute exact path="/dashboards/followup" component={FollowUp} />
          <PrivateRoute exact path="/dashboards/followup/edit/:leadid" component={LeadDetailsNew} />
          <PrivateRoute exact path="/dashboards/myleads" component={MyLeads} />
          <PrivateRoute exact path="/dashboards/myleads/edit/:leadid" component={LeadDetailsNew} />
          <PrivateRoute exact path="/dashboards/users" component={Users} />
          <PrivateRoute exact path="/dashboards/verifyusers" component={VerifyUsers} />
          <PrivateRoute exact path="/dashboards/addleads" component={AddLeads} />
          <PrivateRoute exact path="/dashboards/reports" component={Reports} />
          <PrivateRoute exact path="/dashboards/bulkuploads" component={BulkUploads} />
          <PrivateRoute exact path="/dashboards/addusers" component={AddUsers} />
          <PrivateRoute exact path="/dashboards/pricing" component={PricingPopup} />
          <PrivateRoute exact path="/dashboards/PersonalLoanForm/:leadid" component={PersonalLoanForm} />
          <PrivateRoute exact path="/dashboards/HDFCForm/:leadid" component={HDFCForm} />
          <PrivateRoute exact path="/dashboards/LOANBABAForm/:leadid" component={Loanbaba} />
          <PrivateRoute exact path="/dashboards/PAYSENSEForm/:leadid" component={Paysense} />
          <PrivateRoute exact path="/dashboards/EMIcalculator" component={CalculatorTable} />
        </Switch>
      </Router>
    </div >
  );
}

export default App;
