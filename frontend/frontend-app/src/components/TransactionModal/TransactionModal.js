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
    }
  }

  handleClose = () => {
      this.setState({"show": false})
  }

  handleShow = () => {
      this.setState({"show": true})
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
                                placeholder="Enter withdrawal amount"
                                step="0.01"
                                min="0" 
                                max={this.state.accountBalance}
                                onChange={this.handleChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Withdraw
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default TransactionModal;
