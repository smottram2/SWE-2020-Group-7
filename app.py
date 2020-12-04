from flask import Flask, request, make_response
from flask_cors import CORS, cross_origin
import pyrebase
import os
import requests
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)
app.config["CORS_SUPPORTS_CREDENTIALS"] = True


with open("firebaseConfig.json") as obj:
    firebaseConfig = json.load(obj)

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()


def create_transaction(uid, account, amount, transaction_type, change, from_acct=None, to_acct=None):
    data = {
        "timestamp": str(datetime.now()),
        "type": transaction_type,
        "amount": amount,
        "change": change
    }

    if from_acct:
        data["from_acct"] = from_acct

    if to_acct:
        data["to_acct"] = to_acct
    
    db.child("users").child(uid).child("accounts").child(account).child("transactions").push(data)


def create_low_balance_alert(uid, account, amount):
    data = {
        "type": "low balance",
        "account": account,
        "amount": amount,
        "timestamp": str(datetime.now())
    }

    db.child("users").child(uid).child("alerts").push(data)


def create_large_withdrawal_alert(uid, account, amount):
    data = {
        "type": "large withdrawal",
        "account": account,
        "amount": amount,
        "timestamp": str(datetime.now())
    }

    db.child("users").child(uid).child("alerts").push(data)


@app.route("/alert/<alert_id>", methods=["DELETE"])
def alert_delete(alert_id):
    uid = request.json["uid"]
    db.child("users").child(uid).child("alerts").child(alert_id).remove()
    return "", 204


@app.route("/alerts", methods=["GET","DELETE"])
def all_alerts_delete():
    if request.method == "GET":
        uid = request.args.get('uid')
        alerts_list = db.child("users").child(uid).child("alerts").get().val()
        return alerts_list, 200
    
    elif request.method == "DELETE":
        uid = request.json["uid"]
        db.child("users").child(uid).child("alerts").remove()
        return "", 204


@app.route("/account/<account_name>/bill/<bill_id>", methods=["DELETE"])
def bill_delete(account_name, bill_id):
    uid = request.json["uid"]
    db.child("users").child(uid).child("accounts").child(account_name).child("bills").child(bill_id).remove()
    return "", 204


@app.route("/account/<account_name>/bills", methods=["GET", "POST"])
def bill_create(account_name):
    if request.method == "GET":
        uid = request.args.get('uid')
        bills_list = db.child("users").child(uid).child("accounts").child(account_name).child("bills").get().val()
        return bills_list, 200

    elif request.method == "POST":
        uid = request.json["uid"]
        amount = request.json["amount"]
        to_acct = request.json["to_acct"]
        recurring_cycle = request.json["recurring_cycle"]
        day = request.json["day"]

        data = {
            "amount": amount,
            "to_acct": to_acct,
            "recurring_cycle": recurring_cycle,
            "day": day
        }

        db.child("users").child(uid).child("accounts").child(account_name).child("bills").push(data)

        return "Bill successfully scheduled", 200
        



@app.route("/account/<account_name>/transfer", methods=["POST"])
def transfer(account_name):
    uid = request.json["uid"]
    amount = request.json["amount"]
    to_acct_name = request.json["to_acct"]
    current_balance_from_acct = db.child("users").child(uid).child("accounts").child(account_name).child("balance").get().val()
    current_balance_to_acct = db.child("users").child(uid).child("accounts").child(to_acct_name).child("balance").get().val()

    new_balance_from_acct = current_balance_from_acct - amount
    new_balance_to_acct = current_balance_to_acct + amount

    if amount < 0:
        return "Transfer Unsuccessful. Transfer amount cannot be negative", 400

    if new_balance_from_acct >= 0:
        db.child("users").child(uid).child("accounts").child(account_name).child("balance").set(new_balance_from_acct)
        db.child("users").child(uid).child("accounts").child(to_acct_name).child("balance").set(new_balance_to_acct)


        # Create alert for large-withdrawal/low-balance if conditions hold true
        if new_balance_from_acct < 20:
            create_low_balance_alert(uid, account_name, amount)
        if amount > 500:
            create_large_withdrawal_alert(uid, account_name, amount)

        create_transaction(uid, account_name, amount, "withdrawal", "negative", to_acct=to_acct_name)
        create_transaction(uid, to_acct_name, amount, "deposit", "positive", from_acct=account_name)

        return "Transfer Successful", 200
    else:
        return "Transfer Unsucessful. Transfer amount exceeds origin account balance.", 400


@app.route("/account/<account_name>/withdraw", methods=["POST"])
def withdraw(account_name):
    uid = request.json["uid"]
    amount = request.json["amount"]
    current_balance = db.child("users").child(uid).child("accounts").child(account_name).child("balance").get().val()

    if amount < 0:
        return "Withdraw Unsuccessful. Cannot withdraw a negative amount of money.", 400

    new_balance = current_balance - amount
    if new_balance >= 0:
        db.child("users").child(uid).child("accounts").child(account_name).child("balance").set(new_balance)

        # Create alert for large-withdrawal/low-balance if conditions hold true
        if new_balance < 20:
            create_low_balance_alert(uid, account_name, amount)
        if amount > 500:
            create_large_withdrawal_alert(uid, account_name, amount)

        create_transaction(uid, account_name, amount, "withdrawal", "negative")

        return "Withdrawal Successful", 200
    else:
        return "Withdrawal Unsucessful. Withdrawal amount exceeds account balance.", 400


@app.route("/account/<account_name>/deposit", methods=["POST"])
def deposit(account_name):
    uid = request.json["uid"]
    amount = request.json["amount"]
    current_balance = db.child("users").child(uid).child("accounts").child(account_name).child("balance").get().val()

    new_balance = current_balance + amount
    db.child("users").child(uid).child("accounts").child(account_name).child("balance").set(new_balance)

    create_transaction(uid, account_name, amount, "deposit", "positive")

    return "Deposit Successful", 200


@app.route("/account/<account_name>/payment", methods=["POST"])
def payment(account_name):
    uid = request.json["uid"]
    amount = request.json["amount"]
    to_acct = request.json["to_acct"]
    current_balance = db.child("users").child(uid).child("accounts").child(account_name).child("balance").get().val()

    if amount < 0:
        return "Payment Unsucessful. Payment amount cannot be negative.", 400

    new_balance = current_balance - amount
    if new_balance >= 0:
        db.child("users").child(uid).child("accounts").child(account_name).child("balance").set(new_balance)

        # Create alert for large-withdrawal/low-balance if conditions hold true
        if new_balance < 20:
            create_low_balance_alert(uid, account_name, amount)
        if amount > 500:
            create_large_withdrawal_alert(uid, account_name, amount)

        create_transaction(uid, account_name, amount, "payment", "negative", to_acct)

        return "Payment Successful", 200
    else:
        return "Payment Unsucessful. Payment amount exceeds account balance.", 400


@app.route("/accounts", methods=["GET"])
def accounts():
    uid = request.args.get('uid')

    accounts = db.child("users").child(uid).child("accounts").get().val()
    return accounts, 200


@app.route("/transactions/<account_name>", methods=["GET"])
def transactions(account_name):
    uid = request.args.get('uid')

    accounts = db.child("users").child(uid).child("accounts").child(account_name).child("transactions").get().val()
    return accounts, 200


@app.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]
    try:
        signup_endpoint = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDc0E0DTgLMZupkPzNh2z00tlTaOAVeIdo"
        resp = requests.post(signup_endpoint, data={"email": email, "password": password, "returnSecureToken": True})
        response_body = {
            "id_token": resp.json()["idToken"],
            "refresh_token": resp.json()["refreshToken"],
            "uid": resp.json()["localId"]
        }
        return response_body, 200
    except:
        return "Incorrect credentials", 401
        
    
@app.route("/register", methods=["POST"])
def register():
    email = request.json["email"]
    password = request.json["password"]
    try:
        # Signs up user to Firebase Auth using the Firebase API
        signup_endpoint = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDc0E0DTgLMZupkPzNh2z00tlTaOAVeIdo"
        resp = requests.post(signup_endpoint, data={"email": email, "password": password, "returnSecureToken": True})
        response_body = {
            "id_token": resp.json()["idToken"],
            "refresh_token": resp.json()["refreshToken"],
            "uid": resp.json()["localId"]
        }

        uid = resp.json()["localId"]

        # Creates user info object for the user in the Realtime Database
        data = {
            "first_name": request.json["first_name"],
            "last_name": request.json["last_name"],
            "email": request.json["email"],
            "phone_no": request.json["phone_no"],
        }
        db.child("users").child(uid).child("userInfo").set(data)

        # Creates the checking and savings accounts for the user in the Realtime Database
        data = {
            "checking": {
                "balance": 0
            },
            "savings": {
                "balance": 0
            }
        }
        db.child("users").child(uid).child("accounts").set(data)

        return response_body, 200
    except:
        return "Incorrect credentials", 401


@app.route("/atms", methods=["GET"])
def atms():
    atm_list = db.child("atms").get().val()
    return atm_list, 200


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=int(os.environ.get('PORT', 8080)))
