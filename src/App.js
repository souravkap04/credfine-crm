import React ,{useState , useEffect} from 'react';
import Login from "./containers/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Userlist from "./containers/UserList/Userlist";
import IdleTimer from './timer/IdelTimer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Profile from './containers/UserList/Profile/Profile';


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
        <Route path="/userlist">
          <Userlist/>
        </Route>
        <Route path="/profile">
         <Profile/>
        </Route>
      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
