/*eslint-disable*/

import React, { useState } from "react";
import "./Account.css";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Account() {
  let [accountType, account_type_change] = useState("Checking");
  let [accountNumber, account_number_change] = useState("");
  let [accountBalance, account_balance_change] = useState("");

  function typeChange() {
    accounttypechange("Saving");
  }

  return (
    <div className="Account">
      <Form className="Form">
        <Form.Group controlId="account_number">
          <Form.Label>Select Your Account</Form.Label>
          <Form.Control
            type="account_number"
            placeholder="must be 13 digits."
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="account_type">
          <Form.Label>Select Your Account Type</Form.Label>
          <Form.Control as="select">
            <option>Checking</option>
            <option>Saving</option>
          </Form.Control>
        </Form.Group>
      </Form>

      <div>
        <h1>Your {accountType} Balance is </h1>
        <Card>
          <Card.Body>{accountBalance}</Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Account;
