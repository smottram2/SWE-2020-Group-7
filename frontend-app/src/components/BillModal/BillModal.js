import React, { Component} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { AppContext } from "../../libs/contextLib";
const baseBillsEndpoint = "http://localhost:8080/account/";

class BillModal extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
        "show": false,
        "bills": {},
        "amount": 0,
        "day": 1,
        "recurring_cycle": "",
        "to_acct": ""
    }
  }

  handleClose = () => {
      this.setState({"show": false})
  }

  handleShow = () => {
      this.setState({"show": true})
  }

  handleBillSubmission = (e) => {
    e.preventDefault();
    fetch(baseBillsEndpoint + this.props.accountType + "/bills?uid=" + this.context.uid, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"uid": this.context.uid, 
                            "amount": parseFloat(this.state.amount),
                            "to_acct": this.state.to_acct,
                            "recurring_cycle": this.state.recurring_cycle,
                            "day": this.state.day
                           })
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      this.handleClose()
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleDeletion = (e) => {
    e.preventDefault();
    fetch(baseBillsEndpoint + this.props.accountType + "/bill/" + e.target.value + "?uid=" + this.context.uid, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"uid": this.context.uid, 
                            "amount": parseFloat(this.state.amount),
                            "to_acct": this.state.to_acct,
                            "recurring_cycle": this.state.recurring_cycle,
                            "day": this.state.day
                           })
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Open Bills Menu
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ this.props.accountName }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                {
                    this.props.bills &&
                    Object.keys(this.props.bills).map((key) => {
                        return (
                        <Card key={key}>
                            <Card.Body>
                                <div>Amount: ${ this.props.bills[key].amount }</div>
                                <div>Cycle: { this.props.bills[key].recurring_cycle }</div>
                                <div>To: { this.props.bills[key].to_acct }</div>
                                <Button value={key} onClick={this.handleDeletion} variant="danger">Delete</Button>
                            </Card.Body>
                        </Card>
                        )
                    })
                }
                </ul>
                <br/>
                <Form onSubmit={this.handleBillSubmission}>
                    <Form.Group>
                        <div>Schedule Bill Payment</div>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control id="amount" type="number"
                                        value={this.state.amount} 
                                        onChange={this.handleChange}
                                        placeholder="Enter bill payment amount"
                                        step="0.01"
                                        min="0" 
                                        max={this.props.accountBalance}/>
                        <Form.Label>Payment To</Form.Label>
                        <Form.Control id="to_acct" type="text"
                                        value={this.state.to_acct} 
                                        onChange={this.handleChange}
                                        placeholder="Enter account to which to pay bill"/>
                        <Form.Label>Cycle</Form.Label>
                        <Form.Control id="recurring_cycle" type="text"
                                        value={this.state.recurring_cycle} 
                                        onChange={this.handleChange}
                                        placeholder="Yearly, Monthly, Weekly"/>
                        
                    </Form.Group>

                    <Button variant="primary" type="submit">
                    Submit
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

export default BillModal;
