package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    AccountRepository accountRepository;

    public Account getAccount(int accountId){
         return accountRepository.findById(accountId).get();
    }

    public Account updateAccount(int accountId, Account account){
        return accountRepository.save(account);
    }
}
