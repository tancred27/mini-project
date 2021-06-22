import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import CollegeState from "./context/college/CollegeState";
import UserState from "./context/user/UserState";
import setAuthToken from "./utils/setAuthToken";
import Fallback from "./fallback";
import "./App.css";

const Home = lazy(() => import("./components/layout/home/home"));
const Events = lazy(() => import("./components/college/events/events"));
const Users = lazy(() => import("./components/college/users/users"));
const Alumni = lazy(() => import("./components/college/users/alumni"));
const Profile = lazy(() => import("./components/common/profile"));
const Update = lazy(() => import("./components/auth/update"));
const Contact = lazy(() => import("./components/common/contact"));

const App = () => {
  if(localStorage.token) setAuthToken(localStorage.token);
  return (
    <AuthState>
      <CollegeState>
        <UserState>
          <AlertState>
            <Router>
              <Navbar />
              <Suspense fallback={<Fallback />}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/users" component={Users} />
                  <Route exact path="/events" component={Events} />
                  <Route exact path="/alumni" component={Alumni} />
                  <Route exact path="/update" component={Update} />
                  <Route exact path="/profile/:id" component={Profile} />
                  <Route exact path="/contact/:id" component={Contact} />  
                </Switch>
              </Suspense>
              <Footer />
            </Router>
          </AlertState>
        </UserState>
      </CollegeState>
    </AuthState>
  );
};

export default App;
