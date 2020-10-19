package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    AccountRepository accountRepository;

    public Account getAccount(String name){
         return accountRepository.findById(name).get();
    }

    

    public void updateAccount(Account account){
        accountRepository.save(account);
    }
}
