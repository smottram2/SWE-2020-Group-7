import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CheckBalance from './components/CheckBalance/CheckBalance';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand href="/">
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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/checkBalance">Check Balance</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Router>
        <Switch>
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
          <Route path="/checkbalance">
            <div className="d-flex justify-content-center">
              <CheckBalance></CheckBalance>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
