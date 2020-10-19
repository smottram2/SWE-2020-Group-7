package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AccountController {

    @Autowired
    AccountService accountService;

    @GetMapping("/accounts/{name}")
    private Account getAccount(@PathVariable("name") String name){
        return accountService.getAccount(name);
    }

    @PutMapping("/accounts")
    private String updateAccount(@RequestBody Account account){
        accountService.updateAccount(account);
        return account.getName();
    }
}
