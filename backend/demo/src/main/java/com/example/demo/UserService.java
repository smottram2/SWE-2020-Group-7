package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User getUser(int userId){
         return userRepository.findById(userId).get();
    }

    public User updateUser(int userId, User user){
        return userRepository.save(user);
    }
}
