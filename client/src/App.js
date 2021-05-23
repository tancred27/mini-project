import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/layout/home";
import Login from "./components/auth/user/login";
import Register from "./components/auth/user/register";
import CollegeLogin from "./components/auth/college/login";
import CollegeRegister from "./components/auth/college/register";
import Update from "./components/auth/update";
import Navbar from "./components/layout/navbar";
import Alert from "./components/layout/alert";
import AuthState from "./context/auth/AuthState";
import setAuthToken from "./utils/setAuthToken";
import AlertState from "./context/alert/AlertState";
import "./App.css";

localStorage.token && setAuthToken(localStorage.token);

function App() {
  
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
							<Route exact path="/" component={Home} />
              <Route exact path="/user/login" component={Login} />
              <Route exact path="/user/register" component={Register} />
							<Route exact path="/college/login" component={CollegeLogin} />
              <Route exact path="/college/register" component={CollegeRegister} />
              <Route exact path="/update" component={Update} />
            </Switch>
          </div>
        </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;
