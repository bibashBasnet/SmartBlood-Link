package com.KathfordStudent.SmartBloodLink.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.KathfordStudent.SmartBloodLink.model.UserModel;
import com.KathfordStudent.SmartBloodLink.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired UserRepository userRepository;

    @GetMapping
    public List<UserModel> getAllUser(){
        return userRepository.findAll();
    }

    @GetMapping("/getUserById/{id}")
    public Optional<UserModel> getUserById(@PathVariable String id){
        return userRepository.findById(id);
    }

    @PostMapping("/createUser")
    public UserModel createUser(@RequestBody UserModel user){
        return userRepository.save(user);
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable String id){
        userRepository.deleteById(id);
    }

    @PutMapping("/updateUser/{id}")
    public UserModel updateUser(@PathVariable String id, @RequestBody UserModel user){
        user.setId(id);
        return userRepository.save(user);
    }
}
