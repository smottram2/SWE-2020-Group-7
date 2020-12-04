import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAppContext } from '../../libs/contextLib';

const loginEndpoint = "http://localhost:8080/login"

function Login() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userHasAuthenticated, setUid } = useAppContext();
  const history = useHistory();

  function validateForm() {
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let user = {
      "email": email,
      "password": password
    };

    await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("uid", data["uid"]);
        setUid(data["uid"]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    userHasAuthenticated(true);
    history.push('/dashboard');
    
    
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
