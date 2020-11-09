package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class AccountController {

    @Autowired
    AccountService accountService;

    @GetMapping("/accounts/{accountId}")
    private Account getAccount(@PathVariable("accountId") int accountId){
        return accountService.getAccount(accountId);
    }

    @PutMapping("/accounts/{accountId}")
    public Account updateAccount(@PathVariable("accountId") int accountId, @RequestBody Account account){
        return accountService.updateAccount(accountId, account);
    }
}
