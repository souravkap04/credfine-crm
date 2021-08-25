import React, { useState } from 'react';
import Login from './containers/Login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// import MainMenu from './containers/UserList/MainMenu';
import Profile from './containers/UserList/Profile/Profile';
import Leads from './containers/Leads/Leads';
import LeadDetails from './containers/Leads/LeadDetails';
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
function App() {
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
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/test/edit/:leadid" component={LeadDetailsNew} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/dashboards/leads" component={Leads} />
          <PrivateRoute exact path="/dashboards/leads/edit/:leadid" component={LeadDetails} />
          <PrivateRoute exact path="/dashboards/freshlead" component={FreshLeads} />
          <PrivateRoute exact path="/dashboards/followup" component={FollowUp} />
          <PrivateRoute exact path="/dashboards/followup/edit/:leadid" component={LeadDetails} />
          <PrivateRoute exact path="/dashboards/myleads" component={MyLeads} />
          <PrivateRoute exact path="/dashboards/myleads/edit/:leadid" component={LeadDetails} />
          <PrivateRoute exact path="/dashboards/users" component={Users} />
          <PrivateRoute exact path="/dashboards/verifyusers" component={VerifyUsers} />
          <PrivateRoute exact path="/dashboards/addleads" component={AddLeads} />
          <PrivateRoute exact path="/dashboards/reports" component={Reports} />
          <PrivateRoute exact path="/dashboards/bulkuploads" component={BulkUploads} />
          <PrivateRoute exact path="/dashboards/addusers" component={AddUsers} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
