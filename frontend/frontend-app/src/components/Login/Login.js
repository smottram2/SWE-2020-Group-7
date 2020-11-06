import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAppContext } from '../../libs/contextLib';

function Login() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();

  function validateForm() {
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    userHasAuthenticated(true);
    history.push('/accounts');
  }

  return (
    <div className="Login">
      <h1>Log in</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" 
                        placeholder="Enter email"
                        autoFocus
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
        {/* <Form.Group controlId="rememberMe">
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

export default Login;
