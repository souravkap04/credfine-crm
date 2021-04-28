import React ,{useState , useEffect} from 'react';
import Login from "./containers/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCreate from "./containers/UserCreate/UserCreate";
import Userlist from "./containers/UserList/Userlist";
import IdleTimer from './timer/IdelTimer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PlForm from './containers/PlData/PlForm';
import BlForm from './containers/BlData/BlForm';

function App() {
  const [isTimeout, setIsTimeout] = useState(false);
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 10, //expire after 10 seconds
      onTimeout: () => {
        setIsTimeout(true);
      },
      onExpired: () => {
        //do something if expired on load
        setIsTimeout(true);
      }
    });
    return () => {
      timer.cleanUp();
    
    };
  }, [])
  return (
    <Router>
      <div>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/usercreate">
          <UserCreate/>
        </Route>
        <Route path="/userlist">
          <Userlist/>
        </Route>
        <Route path="/plform">
          <PlForm/>
        </Route>
        <Route path="/blform">
          <BlForm/>
        </Route>
        
      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
