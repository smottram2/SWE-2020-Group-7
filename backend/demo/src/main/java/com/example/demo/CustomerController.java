package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @PutMapping("/customers/")
    public Customer createCustomer(@RequestBody Customer customer){
        return customerService.createCustomer(customer);
    }

    @GetMapping("/customers/{firstName}")
    private Optional<Customer> getCustomer(@PathVariable("firstName") String firstName){
        return customerService.getCustomer(firstName);
    }

    @PutMapping("/customers/newCustomer")
    public Customer updateCustomer(@PathVariable("firstName") String firstName, @RequestBody Customer customer){
        return customerService.updateCustomer(firstName, customer);
    }
}
