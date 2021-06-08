import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/layout/home/home";
import Update from "./components/auth/update";
import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import Profile from "./components/user/profile";
import Events from "./components/common/events";
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
          <div className="container">
            <Navbar />
            <Switch>
							<Route exact path="/" component={Home} />
              <Route exact path="/update" component={Update} />
              <Route exact path="/events" component={Events} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
