import React from 'react';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => (
  <div className="Login">
    <h1>Log in</h1>
    <Form>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      {/* <Form.Group controlId="rememberMe">
        <Form.Check type="checkbox" label="Remember Me" />
      </Form.Group> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
);

export default Login;
