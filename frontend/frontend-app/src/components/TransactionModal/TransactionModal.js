import React, { Component} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const getAccountEndpoint = "http://localhost:8080/accounts/";

class TransactionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "show": false,
        "depositAmount": 0,
        "withdrawalAmount": 0,
    }
  }

  componentDidMount() {
    let transferAccountType = this.props.accountType === "savings" ? "checking" : "savings";
    this.setState({"transferAccountType": transferAccountType});

    fetch(getAccountEndpoint + transferAccountType, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.setState({"transferAccountBalance": data.balance});
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleClose = () => {
      this.setState({"show": false});
      this.props.callbackFromParent();
  }

  handleShow = () => {
      this.setState({"show": true});
  }

  handleWithdrawal = (e) => {
    e.preventDefault();
    console.log(getAccountEndpoint + this.props.accountType);
    console.log(this.props.accountBalance, this.state.withdrawalAmount);
    fetch(getAccountEndpoint + this.state.accountType, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"name": this.props.accountType, "balance": this.props.accountBalance - parseFloat(this.state.withdrawalAmount)})
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
    console.log(getAccountEndpoint + this.props.accountType);
    console.log(this.props.accountBalance, this.state.depositAmount);
    fetch(getAccountEndpoint + this.props.accountType, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"name": this.props.accountType, "balance": this.props.accountBalance + parseFloat(this.state.depositAmount)})
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

    console.log(getAccountEndpoint + this.props.accountType);
    console.log(this.props.accountBalance, this.state.withdrawalAmount);
    fetch(getAccountEndpoint + this.state.accountType, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"name": this.props.accountType, "balance": this.props.accountBalance - parseFloat(this.state.transferAmount)})
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ "accountBalance": data.balance });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    console.log(this.state.transferAccountBalance, this.state.transferAmount);
    fetch(getAccountEndpoint + this.state.transferAccountType, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"name": this.state.transferAccountType, "balance": this.state.transferAccountBalance + parseFloat(this.state.transferAmount)})
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
