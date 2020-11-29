package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    public Optional<Transaction> getTransaction(String firstName, Long transaction_id){
         return transactionRepository.findById(transaction_id);
    }

    public List<Transaction> getAllCustomerTransactions(String firstName){
        List<Transaction> transactions = new ArrayList<>();
        transactionRepository.findAll().forEach(transactions::add);
        return transactions;
    }

    public Transaction createTransaction(Transaction transaction){
        return transactionRepository.save(transaction);
    }


}
