package com.KathfordStudent.SmartBloodLink.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.KathfordStudent.SmartBloodLink.dto.LoginRequest;
import com.KathfordStudent.SmartBloodLink.dto.LoginResponse;
import com.KathfordStudent.SmartBloodLink.dto.UserUpdateDTO;
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
    public ResponseEntity<?> getUserById(@PathVariable String id){
        if(userRepository.existsById(id)){
            return ResponseEntity.ok(userRepository.findById(id));
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not found");
        }
        
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody UserModel user){
        if(userRepository.existsByName(user.getUsername())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User Already exist");
        }
        else{
            if(user.getUserType() == 1){
                if(user.getDriverLicenceUrl() == null || user.getDriverLicenceUrl().isEmpty()){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Driver Licence picture is missing");
                }
            }
            return ResponseEntity.ok(userRepository.save(user));
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id){
        if(!userRepository.existsById(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exits");
        }
        else{
            userRepository.deleteById(id);
            return ResponseEntity.ok("User has been successfully deleted");
        }
        
    }

    @PatchMapping("/updateUser/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody UserUpdateDTO dto) {
        Optional<UserModel> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        UserModel user = optionalUser.get();

        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getAge() != null) user.setAge(dto.getAge());
        if (dto.getGender() != null) user.setGender(dto.getGender());
        if (dto.getBloodType() != null) user.setBloodType(dto.getBloodType());
        if (dto.getAddress() != null) user.setAddress(dto.getAddress());

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }



    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        Optional<UserModel> user = userRepository.findByUsername(loginRequest.getUsername());

        if(user.isPresent()){
            UserModel userDetail = user.get();
            if(userDetail.getPassword().equals(loginRequest.getPassword())){
                LoginResponse response = new LoginResponse(
                    userDetail.getId(),
                    userDetail.getName(),
                    userDetail.getEmail(),
                    userDetail.getPhone(),
                    userDetail.getBloodType(),
                    userDetail.getAge(),
                    userDetail.getGender(),
                    userDetail.getAddress()
                );
                return ResponseEntity.ok(response);
            }
            else{
                return ResponseEntity.status(401).body("Incorrect Password");
            }
        }
        return ResponseEntity.status(401).body("Incorrect Username");
    }
}
