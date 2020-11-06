import React, { useState } from 'react';
import './Register.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function validateForm() {
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="Register">
      <h1>Register Account</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" 
                        placeholder="Enter first name"
                        autoFocus
                        value={fname}
                        onChange={e => setFname(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" 
                        placeholder="Enter last name"
                        value={lname}
                        onChange={e => setLname(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" 
                        placeholder="Password" 
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}/>
        </Form.Group>
        {/* <Form.Group controlId="rememerMe">
          <Form.Check type="checkbox" label="Remember Me" />
        </Form.Group> */}
        <Button variant="primary" 
                type="submit"
                disabled={!validateForm()}>
          Submit
        </Button>
      </Form>
    </div>
  );

}

export default Register;
