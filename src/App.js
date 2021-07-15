import React from 'react';
import Login from "./containers/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MainMenu from './containers/UserList/MainMenu';
import Profile from './containers/UserList/Profile/Profile';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/profile"> <Profile/></Route>
        <Redirect exact from="/dashboard" to="/dashboard/leads"/>
        <Route exact path="/dashboard/:page?" render={props => <MainMenu {...props}/>} />
      </Switch>
      </Router>
    
  );
}

export default App;
