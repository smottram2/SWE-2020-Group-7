package com.example.demo;

import javax.persistence.*;

@Entity
public class Customer {

    public Customer(double checkingAccountBalance, String email, String firstName, String lastName, String password, String phoneNumber, double savingsAccountBalance) {
        this.checkingAccountBalance = checkingAccountBalance;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.savingsAccountBalance = savingsAccountBalance;
    }

    @Id
    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "checkingAccountBalance")
    private double checkingAccountBalance;

    @Column(name = "savingsAccountBalance")
    private double savingsAccountBalance;


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getCheckingAccountBalance() {
        return checkingAccountBalance;
    }

    public void setCheckingAccountBalance(double checkingAccountBalance) {
        this.checkingAccountBalance = checkingAccountBalance;
    }

    public double getSavingsAccountBalance() {
        return savingsAccountBalance;
    }

    public void setSavingsAccountBalance(double savingsAccountBalance) {
        this.savingsAccountBalance = savingsAccountBalance;
    }

    public Customer() {

    }
}