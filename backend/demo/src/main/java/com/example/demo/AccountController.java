package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AccountController {

    @Autowired
    AccountService accountService;

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("/accounts/{name}")
    private Account getAccount(@PathVariable("name") String name){
        return accountService.getAccount(name);
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PutMapping("/accounts/{name}")
    public Account updateAccount(@PathVariable("name") String name, @RequestBody Account account){
        return accountService.updateAccount(name, account);
    }
}
