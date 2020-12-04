import React, { Component } from "react";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import TransactionModal from "../TransactionModal/TransactionModal";
import BillModal from "../BillModal/BillModal";
import { AppContext } from "../../libs/contextLib";
import NotificationModal from "../NotificationModal/NotificationModal";
const getAccountEndpoint = "http://localhost:8080/accounts";
const baseTransactionsEndpoint = "http://localhost:8080/transactions/";

class Dashboard extends Component {
  static contextType = AppContext;
  constructor() {
    super();
    this.state = {
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

  transactionModalHandler() {
    window.location.reload();
  }

  componentDidMount = (e) => {
    console.log(this.context.uid);
    fetch(getAccountEndpoint + "?uid=" + this.context.uid, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => {
          let checkingsAccount = Object.assign({}, prevState.checkingsAccount);
          checkingsAccount.accountBalance = data.checking.balance;
          checkingsAccount.transactions = data.checking.transactions;
          checkingsAccount.bills = data.checking.bills;
          return { checkingsAccount };
        });
        this.setState(prevState => {
          let savingsAccount = Object.assign({}, prevState.savingsAccount);
          savingsAccount.accountBalance = data.savings.balance;
          savingsAccount.transactions = data.savings.transactions;
          savingsAccount.bills = data.savings.bills;
          return { savingsAccount };
        })
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      console.log(this.context.uid);
    fetch("http://localhost:8080/alerts" + "?uid=" + this.context.uid, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({"notifications": data})
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const checkingsAccount = this.state.checkingsAccount;
    const savingsAccount = this.state.savingsAccount;
    return (
      <div className="Account">
        <div style={{"text-align": "right"}}>
          <NotificationModal notifications={this.state.notifications}></NotificationModal>
        </div>
        <br/>
        <Card>
          <Card.Header>Checking</Card.Header>
          <Card.Body>
            <Card.Title>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Amount"
                  value={checkingsAccount.accountBalance}
                  readOnly />
              </InputGroup>
            </Card.Title>
            <ul>
              {
                this.state.checkingsAccount.transactions &&
                Object.keys(this.state.checkingsAccount.transactions).map((key) => {
                  return (
                    <Card key={key}>
                      <Card.Body>
                        <div>Amount: ${this.state.checkingsAccount.transactions[key].amount}</div>
                        <div>Timestamp: {this.state.checkingsAccount.transactions[key].timestamp}</div>
                        <div>Type: {this.state.checkingsAccount.transactions[key].type}</div>
                      </Card.Body>
                    </Card>
                  )
                })
              }
            </ul>
          </Card.Body>
          <Card.Footer>
            <TransactionModal accountName={this.state.checkingsAccount.accountName}
              accountBalance={this.state.checkingsAccount.accountBalance}
              accountType={this.state.checkingsAccount.accountType}
              handler={this.transactionModalHandler}>
            </TransactionModal>
            <span>   </span>
            <BillModal accountType={this.state.checkingsAccount.accountType}
              accountBalance={this.state.checkingsAccount.accountBalance}
              bills={this.state.checkingsAccount.bills}>
            </BillModal>
          </Card.Footer>
        </Card>
        <br />
        <Card>
          <Card.Header>Savings</Card.Header>
          <Card.Body>
            <Card.Title>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Amount (to the nearest dollar)"
                  value={savingsAccount.accountBalance}
                  readOnly />
              </InputGroup>
            </Card.Title>
            <ul>
              {
                this.state.savingsAccount.transactions &&
                Object.keys(this.state.savingsAccount.transactions).map((key) => {
                  return (
                    <Card key={key}>
                      <Card.Body>
                        <div>Amount: ${this.state.savingsAccount.transactions[key].amount}</div>
                        <div>Timestamp: {this.state.savingsAccount.transactions[key].timestamp}</div>
                        <div>Type: {this.state.savingsAccount.transactions[key].type}</div>
                      </Card.Body>
                    </Card>
                  )
                })
              }
            </ul>
          </Card.Body>
          <Card.Footer>
            <TransactionModal accountName={this.state.savingsAccount.accountName}
              accountBalance={this.state.savingsAccount.accountBalance}
              accountType={this.state.savingsAccount.accountType}
              handler={this.transactionModalHandler}>
            </TransactionModal>
            <span>   </span>
            <BillModal accountType={this.state.savingsAccount.accountType}
              accountBalance={this.state.savingsAccount.accountBalance}
              bills={this.state.savingsAccount.bills}>
            </BillModal>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default Dashboard;
