package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
public class AccountController {

    @Autowired
    AccountService accountService;

    @GetMapping("/customers/{firstName}/{accountName}")
    private Optional<Account> getAccount(@PathVariable String firstName, @PathVariable String accountName){
        return accountService.getAccount(firstName);
    }

    @PutMapping("/customers/{firstName}/{accountName}")
    public Account updateAccount(@PathVariable String firstName, @PathVariable String accountName, @RequestBody Account account){
        return accountService.updateAccount(accountName, account);
    }
}
