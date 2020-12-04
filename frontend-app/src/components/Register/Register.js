import React, {Component} from 'react';
import './Register.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const registerEndpoint = "http://localhost:8080/register";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "firstName": "",
      "lastName": "",
      "email": "",
      "password": "",
      "confirmPassword": "",
      "phoneNumber": ""
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleRegister = (e) => {
    e.preventDefault();
    let user = {
      "first_name": this.state.firstName,
      "last_name": this.state.lastName,
      "email": this.state.email,
      "password": this.state.password,
      "phone_no": this.state.phoneNumber
    };

    fetch(registerEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if(response.ok){
          alert("Account registration was successful!");
          this.props.history.push("/login");
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {})
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <div className="Register">
        <h1>Register Account</h1>
        <Form onSubmit={this.handleRegister}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" value={this.state.firstName} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" value={this.state.lastName} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" value={this.state.phoneNumber} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={this.state.confirmPassword} onChange={this.handleChange}/>
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
  }
}

export default Register;
