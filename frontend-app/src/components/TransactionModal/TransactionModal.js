import React, { Component} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AppContext } from "../../libs/contextLib";
const baseAccountEndpoint = "http://localhost:8080/account/";

class TransactionModal extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
        "show": false,
        "depositAmount": 0,
        "withdrawalAmount": 0,
        "transferAmount": 0,
        "paymentAmount": 0,
        "to_acct": ""
    }
  }

  componentDidMount() {
    console.log(this.context.uid);
    // let transferAccountType = this.props.accountType === "savings" ? "checking" : "savings";
    // this.setState({"transferAccountType": transferAccountType});

    // fetch(getAccountEndpoint + transferAccountType, {
    //   method: 'GET',
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({"transferAccountBalance": data.balance});
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  }

  handleClose = () => {
      this.setState({"show": false})
  }

  handleShow = () => {
      this.setState({"show": true})
  }

  handlePayment = (e) => {
    e.preventDefault();
    fetch(baseAccountEndpoint + this.props.accountType + "/payment", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"uid": this.context.uid, 
                            "amount": parseFloat(this.state.paymentAmount),
                            "to_acct": this.state.to_acct})
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ "accountBalance": data.balance });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      this.handleClose()
  }

  handleWithdrawal = (e) => {
    e.preventDefault();
    fetch(baseAccountEndpoint + this.props.accountType + "/withdraw", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"uid": this.context.uid, "amount": parseFloat(this.state.withdrawalAmount)})
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ "accountBalance": data.balance });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      this.handleClose()
  }

  handleDeposit = (e) => {
    e.preventDefault();
    fetch(baseAccountEndpoint + this.props.accountType + "/deposit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"uid": this.context.uid, "amount": parseFloat(this.state.depositAmount)})
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ "accountBalance": data.balance });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.handleClose()
  }

  handleTransfer = (e) => {
    e.preventDefault();
    let transferAccountType = this.props.accountType === "savings" ? "checking" : "savings";
    fetch(baseAccountEndpoint + this.props.accountType + "/transfer", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"uid": this.context.uid, "amount": parseFloat(this.state.transferAmount), "to_acct": transferAccountType})
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ "accountBalance": data.balance });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.handleClose()
    
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Open Transactions Menu
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ this.props.accountName }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleWithdrawal}>
                <Form.Group>
                  <Form.Label>Withdraw Money</Form.Label>
                  <Form.Control id="withdrawalAmount" type="number"
                                value={this.state.withdrawalAmount} 
                                onChange={this.handleChange}
                                placeholder="Enter withdrawal amount"
                                step="0.01"
                                min="0" 
                                max={this.props.accountBalance}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Withdraw
                </Button>
              </Form>
              <br/>
              <Form onSubmit={this.handleDeposit}>
                <Form.Group>
                  <Form.Label>Deposit Money</Form.Label>
                  <Form.Control id="depositAmount" type="number"
                                value={this.state.depositAmount} 
                                onChange={this.handleChange} 
                                placeholder="Enter deposit amount"
                                step="0.01"
                                min="0"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Deposit
                </Button>
              </Form>

              <br/>
              <Form onSubmit={this.handleTransfer}>
                <Form.Group>
                  <Form.Label>Transfer Money</Form.Label>
                  <Form.Control id="transferAmount" type="number"
                                value={this.state.transferAmount} 
                                onChange={this.handleChange} 
                                placeholder="Enter transfer amount"
                                step="0.01"
                                min="0"
                                max={this.props.accountBalance}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Transfer
                </Button>
              </Form>
              <br/>
              <Form onSubmit={this.handlePayment}>
                <Form.Group>
                  <div>Make Payment</div>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control id="paymentAmount" type="number"
                                value={this.state.paymentAmount} 
                                onChange={this.handleChange} 
                                placeholder="Enter payment amount"
                                step="0.01"
                                min="0"
                                max={this.props.accountBalance}/>
                  
                  <Form.Label>To</Form.Label>
                  <Form.Control id="to_acct" type="text"
                                value={this.state.to_acct} 
                                onChange={this.handleChange} 
                                placeholder="Enter account to which to make payment to"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Make Payment
                </Button>
              </Form>
              
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default TransactionModal;
