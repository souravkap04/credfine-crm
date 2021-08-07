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
import MyLeads from './containers/MyLeads/MyLeads';
import Users from './containers/Users/ResetPassword';
import VerifyUsers from './containers/UserList/VerifyUsers';
import AddLeads from './containers/PlData/PlForm';
import Reports from './containers/Report/Report';
import BulkUploads from './containers/UploadLeads/UploadLeads';
import AddUsers from './containers/UserCreate/UserCreate';
function App() {
  // const [viewLeadDetails, setViewLeadDetails] = useState(false);
  // const [leadId, setLeadId] = useState(null);
  // const leadDetailsHandler = (childData, leadId) => {
  //   setViewLeadDetails(childData);
  //   setLeadId(leadId)
  // }
  return (
    <div>
      <Router>
        <Switch>

          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/profile"> <Profile /></Route>
          {/* <Redirect exact from="/dashboard" to="/dashboard/leads" /> */}
          {/* <Route exact path="/dashboard/:page?" render={props => <TestMenu {...props} />} /> */}
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/dashboards/leads">
            <Leads />
          </Route>
          <Route exact path="/dashboards/leads/edit/:leadid">
            <LeadDetails />
          </Route>
          <Route exact path="/dashboards/freshlead">
            <FreshLeads />
          </Route>
          <Route exact path="/dashboards/myleads">
            <MyLeads />
          </Route>
          <Route exact path="/dashboards/myleads/edit/:leadid">
            <LeadDetails />
          </Route>
          <Route exact path="/dashboards/users">
            <Users />
          </Route>
          <Route exact path="/dashboards/verifyusers">
            <VerifyUsers />
          </Route>
          <Route exact path="/dashboards/addleads">
            <AddLeads />
          </Route>
          <Route exact path="/dashboards/reports">
            <Reports />
          </Route>
          <Route exact path="/dashboards/bulkuploads">
            <BulkUploads />
          </Route>
          <Route exact path="/dashboards/addusers">
            <AddUsers />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
