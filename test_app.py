import pytest
import pyrebase
from app import app
import json

@pytest.fixture
def test_client():
    return app.test_client()

# def firebase_db():
#     firebaseConfig = {
#     "apiKey": "AIzaSyDc0E0DTgLMZupkPzNh2z00tlTaOAVeIdo",
#     "authDomain": "citadel-financial-inc.firebaseapp.com",
#     "databaseURL": "https://citadel-financial-inc.firebaseio.com",
#     "projectId": "citadel-financial-inc",
#     "storageBucket": "citadel-financial-inc.appspot.com",
#     "messagingSenderId": "103748076105",
#     "appId": "1:103748076105:web:35c0ec15edabe98b473598"
#   }

#     firebase = pyrebase.initialize_app(firebaseConfig)
#     db = firebase.database()

#     return db

def test_print_account_checking_balance(test_client):
    response = test_client.get("/accounts?uid=nligsz1JQcXTlys08mO8qup7HZo2")
    assert response.status_code == 200
    assert response.json["checking"]["balance"] == 0


def test_print_account_savings_balance(test_client):
    response = test_client.get("/accounts?uid=nligsz1JQcXTlys08mO8qup7HZo2")
    assert response.status_code == 200
    assert response.json["savings"]["balance"] == 0


def test_withdraw_money_from_checking_less_than_balance(test_client):
    test_client.post("/account/checking/deposit",
                     data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                           "amount": 200}),
                     content_type="application/json")

    response = test_client.post("/account/checking/withdraw", 
                                data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                                      "amount": 100}),
                                content_type="application/json")

    test_client.post("/account/checking/withdraw", 
                     data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                           "amount": 100}),
                     content_type="application/json")
    assert response.status_code == 200
    assert "Withdrawal Successful" in response.get_data(as_text=True)


def test_withdraw_money_from_savings_less_than_balance(test_client):
    test_client.post("/account/savings/deposit",
                     data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                           "amount": 200}),
                     content_type="application/json")

    response = test_client.post("/account/savings/withdraw", 
                                data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                                      "amount": 100}),
                                content_type="application/json")

    test_client.post("/account/savings/withdraw", 
                     data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                           "amount": 100}),
                     content_type="application/json")
    assert response.status_code == 200
    assert "Withdrawal Successful" in response.get_data(as_text=True)


def test_withdraw_money_from_checking_more_than_balance(test_client):
    response = test_client.post("/account/checking/withdraw", 
                                data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                                      "amount": 100}),
                                content_type="application/json")

    assert response.status_code == 400
    assert "Withdrawal Unsucessful. Withdrawal amount exceeds account balance." in response.get_data(as_text=True)


def test_withdraw_money_from_savings_more_than_balance(test_client):
    response = test_client.post("/account/savings/withdraw", 
                                data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                                      "amount": 100}),
                                content_type="application/json")

    assert response.status_code == 400
    assert "Withdrawal Unsucessful. Withdrawal amount exceeds account balance." in response.get_data(as_text=True)


def test_withdraw_money_from_checking_negative_amount(test_client):
    response = test_client.post("/account/checking/withdraw", 
                                data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                                      "amount": -100}),
                                content_type="application/json")

    assert response.status_code == 400
    assert "Withdraw Unsuccessful. Cannot withdraw a negative amount of money." in response.get_data(as_text=True)


def test_withdraw_money_from_savings_negative_amount(test_client):
    response = test_client.post("/account/savings/withdraw", 
                                data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                                      "amount": -100}),
                                content_type="application/json")

    assert response.status_code == 400
    assert "Withdraw Unsuccessful. Cannot withdraw a negative amount of money." in response.get_data(as_text=True)


def test_deposit_money_to_checking(test_client):
    response = test_client.post("/account/checking/deposit",
                                data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                                                 "amount": 100}),
                                content_type="application/json")

    test_client.post("/account/checking/withdraw", 
                     data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                                      "amount": 100}),
                     content_type="application/json")
    assert response.status_code == 200
    assert "Deposit Successful" in response.get_data(as_text=True)


def test_deposit_money_to_savings(test_client):
    response = test_client.post("/account/savings/deposit",
                                data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                                                 "amount": 100}),
                                content_type="application/json")

    test_client.post("/account/savings/withdraw", 
                     data=json.dumps({"uid": "nligsz1JQcXTlys08mO8qup7HZo2",
                                      "amount": 100}),
                     content_type="application/json")
    assert response.status_code == 200
    assert "Deposit Successful" in response.get_data(as_text=True)