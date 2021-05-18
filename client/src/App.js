import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Update from "./components/auth/update";
import Navbar from "./components/layout/navbar";
import Alert from "./components/layout/alert";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/update" component={Update} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
