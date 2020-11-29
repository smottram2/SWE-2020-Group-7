package com.example.demo;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Set;

@Entity
public class Customer {

    public Customer(BigDecimal checkingAccountBalance, String email, String firstName, String lastName, String password, String phoneNumber, BigDecimal savingsAccountBalance) {
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
    private BigDecimal checkingAccountBalance;

    @Column(name = "savingsAccountBalance")
    private BigDecimal savingsAccountBalance;


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

    public BigDecimal getCheckingAccountBalance() {
        return checkingAccountBalance;
    }

    public void setCheckingAccountBalance(BigDecimal checkingAccountBalance) {
        this.checkingAccountBalance = checkingAccountBalance;
    }

    public BigDecimal getSavingsAccountBalance() {
        return savingsAccountBalance;
    }

    public void setSavingsAccountBalance(BigDecimal savingsAccountBalance) {
        this.savingsAccountBalance = savingsAccountBalance;
    }

    @OneToMany(mappedBy = "customer")
    @JsonManagedReference(value = "customerTransaction")
    private Set<Transaction> customerTransactions;

}