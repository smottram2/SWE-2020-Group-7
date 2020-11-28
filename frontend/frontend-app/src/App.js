/*eslint-disable*/
import React, { useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Account from "./components/Account/Account";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from "react-router-dom";
import { AppContext } from "./libs/contextLib";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();

  function handleLogout() {
    userHasAuthenticated(false);
  } 

  return (
    <div>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand href="/authentication">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Citadel logo"
          />
          Citadel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isAuthenticated
            ? <Nav.Link href="/accounts">Accounts</Nav.Link>
            : <></>
            }
          </Nav>
          <Nav>
            {isAuthenticated
            ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            : <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Router>
          <Switch>
            {isAuthenticated
              ? <>
                  <Route path="/accounts">
                    <div className="d-flex justify-content-center">
                      <Account></Account>
                    </div>
                  </Route>
                  <Route path="/authentication">
                    <Redirect to="/accounts" />
                  </Route>
                </>
              : <>
                  <Route path="/login">
                    <div className="d-flex justify-content-center">
                      <Login></Login>
                    </div>
                  </Route>
                  <Route path="/register">
                    <div className="d-flex justify-content-center">
                      <Register></Register>
                    </div>
                  </Route>
                  <Route path="/authentication">
                    <Redirect to="/login" />
                  </Route>
                </>  
            }
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
