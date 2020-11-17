package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @PostMapping("")
    public Customer createCustomer(@RequestBody Customer customer){
        return customerService.createCustomer(customer);
    }

    @GetMapping("/{firstName}")
    private Optional<Customer> getCustomer(@PathVariable("firstName") String firstName){
        return customerService.getCustomer(firstName);
    }

    @PutMapping("/{firstName}")
    public Customer updateCustomer(@PathVariable("firstName") String firstName, @RequestBody Customer customer){
        return customerService.updateCustomer(firstName, customer);
    }
}
