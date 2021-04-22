import Login from "./containers/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";

import UserCreate from "./containers/UserCreate/UserCreate";
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
