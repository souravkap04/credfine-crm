import React ,{useState , useEffect} from 'react';
import Login from "./containers/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import IdleTimer from './timer/IdelTimer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MainMenu from './containers/UserList/MainMenu';
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
