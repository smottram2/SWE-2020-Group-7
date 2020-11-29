package com.example.demo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "transactionTime")
    private LocalDateTime transactionTime;

    @Column(name = "account")
    private String account;

    @Column(name = "merchantName")
    private String merchantName;

    public Transaction(long id, LocalDateTime transactionTime, String account, String merchantName) {
        this.id = id;
        this.transactionTime = transactionTime;
        this.account = account;
        this.merchantName = merchantName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(LocalDateTime transactionTime) {
        this.transactionTime = transactionTime;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    @ManyToOne
    @JoinColumn(name = "firstName", nullable = true)
    @JsonBackReference(value = "customerTransaction")
    private Customer customer;

}
