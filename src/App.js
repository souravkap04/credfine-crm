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
import Dashboard from './containers/Dashboard/Dashboard';
function App() {
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
          {/* <Route exact path="/test/:page?" render={props => <TestMenu {...props} />} /> */}
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/dashboards/leads">
            <Leads />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
