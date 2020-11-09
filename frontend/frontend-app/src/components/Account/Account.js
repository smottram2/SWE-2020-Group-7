import React, { Component } from "react";
import "./Account.css";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
const getAccountEndpoint = "http://localhost:8080/accounts/";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      accountType: "",
      accountNumber: "",
      accountBalance: 0,
      withdrawalAmount: 0,
      savingsAccount: {
        accountType: "savings",
        accountName: "",
        accountBalance: 0,
      },
      checkingsAccount: {
        accountType: "checking",
        accountName: "",
        accountBalance: 0,
      }
    }
  }

  componentDidMount() {
    // GET CHECKINGS ACCOUNT
    fetch(getAccountEndpoint + this.state.checkingsAccount.accountType, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => {
          let checkingsAccount = Object.assign({}, prevState.checkingsAccount);
          checkingsAccount.accountBalance = data.balance;               
          return { checkingsAccount };
        })
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // GET SAVINGS ACCOUNT
    fetch(getAccountEndpoint + this.state.savingsAccount.accountType, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => {
          let savingsAccount = Object.assign({}, prevState.savingsAccount);
          savingsAccount.accountBalance = data.balance;               
          return { savingsAccount };
        })
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(getAccountEndpoint + this.state.accountType);
  //   fetch(getAccountEndpoint + this.state.accountType, {
  //     method: 'GET',
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({ "accountBalance": data.balance });
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }

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
    const checkingsAccount = this.state.checkingsAccount;
    const savingsAccount = this.state.savingsAccount;
    return (
      <div className="Account">
        <Card>
          <Card.Header>{checkingsAccount.accountType}</Card.Header>
          <Card.Body>
            {/* <Card.Title>{checkingsAccount.accountType} Account</Card.Title> */}
            <Card.Text>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Amount (to the nearest dollar)"
                             value={checkingsAccount.accountBalance}/>
              </InputGroup>
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
        <br/>
        <Card>
          <Card.Header>{savingsAccount.accountType}</Card.Header>
          <Card.Body>
            {/* <Card.Title>{savingsAccount.accountType} Account</Card.Title> */}
            <Card.Text>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Amount (to the nearest dollar)"
                             value={savingsAccount.accountBalance}/>
              </InputGroup>
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
        {/* <Form className="Form" onSubmit={this.handleSubmit}>
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
            <Form.Control id="withdrawalAmount" type="number" 
                          value={this.state.withdrawalAmount} 
                          placeholder="Enter withdrawal amount"
                          step="0.01"
                          min="0" 
                          max={this.state.accountBalance}
                          onChange={this.handleChange}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Withdraw
          </Button>
        </Form> */}
      </div>
    );
  }
}

export default Account;
