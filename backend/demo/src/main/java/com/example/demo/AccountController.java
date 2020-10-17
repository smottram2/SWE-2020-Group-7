package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

    //@Autowired
    //private AccountService accountService;

    @GetMapping("/accounts")
    public String foo(){
        return "This is placeholder text";
    }

    @GetMapping("/accounts/{id}")
    public Account getBalance(@PathVariable String id){
        return null;
    }
}
