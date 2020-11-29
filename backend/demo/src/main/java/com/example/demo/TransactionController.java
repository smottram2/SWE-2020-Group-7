package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @PostMapping("/add")
    public Transaction createTransaction(@PathVariable("firstName") String firstName, @RequestBody Transaction transaction){
        return transactionService.createTransaction(transaction);
    }

    @GetMapping("/{firstName}")
    private List<Transaction> getAllCustomerTransactions(@PathVariable("firstName") String firstName){
        return transactionService.getAllCustomerTransactions(firstName);
    }

    @PutMapping("/{firstName}/{transaction_id}")
    public Optional<Transaction> getTransaction(@PathVariable("firstName") String firstName, @PathVariable("transaction_id") Long transaction_id){
        return transactionService.getTransaction(firstName, transaction_id);
    }
}
