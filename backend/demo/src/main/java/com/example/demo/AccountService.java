package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    AccountRepository accountRepository;

    public Optional<Account> getAccount(String accountName){
         return accountRepository.findById(accountName);
    }

    public Account updateAccount(String accountName, Account account){
        return accountRepository.save(account);
    }

    public Account createAccount(Account account){
        return accountRepository.save(account);
    }
}
