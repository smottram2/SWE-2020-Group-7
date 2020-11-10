package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    public Optional<Customer> getCustomer(String firstName){
         return customerRepository.findById(firstName);
    }

    public Customer updateCustomer(String firstName, Customer customer){
        return customerRepository.save(customer);
    }

    public Customer createCustomer(Customer customer){
        return customerRepository.save(customer);
    }
}
