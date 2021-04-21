import Login from "./containers/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import SimpleHeader from "./includes/SimpleHeader";
import UserCreate from "./containers/Login/UserCreate/UserCreate";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/userCreate">
          <UserCreate/>
        </Route>
      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
