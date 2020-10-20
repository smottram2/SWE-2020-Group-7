import React, { Component } from "react";
import "./Account.css";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const getAccountEndpoint = "http://localhost:8080/accounts/";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      accountType: "",
      accountNumber: "",
      accountBalance: 0,
      withdrawalAmount: 0,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(getAccountEndpoint + this.state.accountType);
    fetch(getAccountEndpoint + this.state.accountType, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ "accountBalance": data.balance });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleWithdrawal = (e) => {
    e.preventDefault();
    console.log(getAccountEndpoint + this.state.accountType);
    console.log(this.state.accountBalance, this.state.withdrawalAmount);
    fetch(getAccountEndpoint + this.state.accountType, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"name": this.state.accountType, "balance": this.state.accountBalance - this.state.withdrawalAmount})
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ "accountBalance": data.balance });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    // console.log(this.state.accountType);
    // console.log(getAccountEndpoint + this.state.accountType);
    // fetch(getAccountEndpoint + this.state.accountType, {
    //   method: 'GET',
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({ "accountBalance": data.balance });
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  }

  render() {
    const accountType = this.state.accountType;
    const accountBalance = this.state.accountBalance;
    return (
      <div className="Account">
        <Form className="Form" onSubmit={this.handleSubmit}>
          {/* <Form.Group controlId="account_number">
          <Form.Label>Select Your Account</Form.Label>
          <Form.Control
            type="account_number"
            placeholder="must be 13 digits."
          ></Form.Control>
        </Form.Group> */}
          <Form.Group controlId="accountType">
            <Form.Label>Select Your Account Type</Form.Label>
            <Form.Control as="select" onChange={this.handleChange} value={this.state.accountType} >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        <br></br>

        <div>
          <Card border="primary" className="text-center">
            <Card.Header>
              Your {accountType} account balance is
          </Card.Header>
            <Card.Body>${accountBalance}</Card.Body>
          </Card>
        </div>
        <br></br>

        <Form onSubmit={this.handleWithdrawal}>
          <Form.Group>
            <Form.Label>Withdraw Money</Form.Label>
            <Form.Control id="withdrawalAmount" type="number" value={this.state.withdrawalAmount} 
                          placeholder="Enter withdrawal amount" max={this.state.accountBalance}
                          onChange={this.handleChange}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Withdraw
          </Button>
        </Form>
      </div>
    );
  }
}

export default Account;
