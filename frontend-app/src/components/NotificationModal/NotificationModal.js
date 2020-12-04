import React, { Component} from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AppContext } from "../../libs/contextLib";
const multipleNotificationsEndpoint = "http://localhost:8080/alerts";
const singleNotificationEndpoint = "http://localhost:8080/alert/";

class NotificationModal extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
        "show": false,
    }
  }

  componentDidMount() {
  }

  handleClose = () => {
      this.setState({"show": false})
  }

  handleShow = () => {
      this.setState({"show": true})
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleDeletion = (e) => {
    e.preventDefault();
    fetch(singleNotificationEndpoint + e.target.value, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"uid": this.context.uid})
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
        <Button onClick={this.handleShow}>
          Notifications
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ this.props.accountName }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {
                        this.props.notifications &&
                        Object.keys(this.props.notifications).map((key) => {
                            return (
                            <Card key={key}>
                                <Card.Body>
                                    <div>{this.props.notifications[key].account.toUpperCase()} Account</div>
                                    <div>{this.props.notifications[key].type.toUpperCase()}</div>
                                    <Button value={key} onClick={this.handleDeletion} variant="danger">Delete</Button>
                                </Card.Body>
                            </Card>
                            )
                        })
                    }
                </ul>
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

export default NotificationModal;
