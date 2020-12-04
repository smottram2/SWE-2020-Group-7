/*eslint-disable*/
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AppContext } from "./libs/contextLib";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [uid, setUid] = useState("");

  function handleLogout() {
    localStorage.removeItem("uid");
    setUid("");
    userHasAuthenticated(false);
  } ;

  useEffect(() => {
    let uid = localStorage.getItem("uid");
    if(uid) {
      setUid(uid);
      userHasAuthenticated(true);
    }
  });

  function handleNotifications() {

  };

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
            ? <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            : <></>
            }
          </Nav>
          <Nav>
            {isAuthenticated
            ? <>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            : <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, uid, setUid }}>
        <Router>
          <Switch>
            {isAuthenticated
              ? <>
                  <Route path="/dashboard" component={Dashboard}>
                  </Route>
                  <Route path="/authentication">
                    <Redirect to="/dashboard" />
                  </Route>
                </>
              : <>
                  <Route path="/login" component={Login}>
                  </Route>
                  <Route path="/register" component={Register}>
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
