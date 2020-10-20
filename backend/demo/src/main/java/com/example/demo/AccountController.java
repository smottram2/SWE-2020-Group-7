package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AccountController {

    @Autowired
    AccountService accountService;

    @GetMapping("/accounts/{name}")
    private Account getAccount(@PathVariable("name") String name){
        return accountService.getAccount(name);
    }

    @PutMapping("/accounts/{name}")
    public Account updateAccount(@PathVariable("name") String name, @RequestBody Account account){
        return accountService.updateAccount(name, account);
    }
}
