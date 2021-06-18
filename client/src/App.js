import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import CollegeState from "./context/college/CollegeState";
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

localStorage.token && setAuthToken(localStorage.token);

function App() {
  
  return (
    <AuthState>
      <CollegeState>
        <AlertState>
          <Router>
            <Navbar />
              <Switch>
                <Suspense fallback={Fallback}>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/update" component={Update} />
                  <Route exact path="/events" component={Events} />
                  <Route exact path="/users" component={Users} />
                  <Route exact path="/alumni" component={Alumni} />
                  <Route exact path="/profile/:id" component={Profile} />
                  <Route exact path="/contact/:id" component={Contact} />
                </Suspense>
              </Switch>
            <Footer />
          </Router>
        </AlertState>
      </CollegeState>
    </AuthState>
  );
};

export default App;
