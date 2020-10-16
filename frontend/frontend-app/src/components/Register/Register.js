import React from 'react';
import './Register.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => (
  <div className="Register">
    <h1>Register Account</h1>
    <Form>
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter first name" />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter last name" />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      {/* <Form.Group controlId="rememerMe">
        <Form.Check type="checkbox" label="Remember Me" />
      </Form.Group> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
);

export default Register;
