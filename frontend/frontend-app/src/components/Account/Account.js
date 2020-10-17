import React from 'react';
import './Account.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Account() {


  return(
  <div>
    <h1>Chekcing Balance</h1>
    <Form>
      <label>Account type</label><br></br>
      <select>
        <option value = "checking">Checking</option>
        <option value = "saving">Saving</option>
      </select>
    </Form>
  </div>
  );
}



  
  export default Account;