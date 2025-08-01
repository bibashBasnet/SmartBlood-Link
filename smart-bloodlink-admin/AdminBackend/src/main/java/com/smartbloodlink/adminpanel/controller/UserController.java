package com.smartbloodlink.adminpanel.controller;

import com.smartbloodlink.adminpanel.dto.UserDTO;
import com.smartbloodlink.adminpanel.model.UserModel;
import com.smartbloodlink.adminpanel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public UserModel createUser(@RequestBody UserModel user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<UserModel> userOpt = userRepository.findByUsername(username);
        Map<String, Object> res = new HashMap<>();

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            UserModel user = userOpt.get();
            if (user.getUserType() == 2) {
                res.put("success", true);
                res.put("user", user);
                return res;
            }
        }

        res.put("success", false);
        res.put("message", "Invalid credentials or not an admin.");
        return res;
    }

    @PutMapping("/{id}/verify")
    public UserModel verifyUser(@PathVariable String id) {
        UserModel user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setVerified(true);
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
        Map<String, String> res = new HashMap<>();
        res.put("message", "User deleted successfully.");
        return res;
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/unverified")
    public List<UserDTO> getUnverifiedUsers() {
        return userRepository.findByIsVerifiedFalse().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/userType/{type}")
    public List<UserDTO> getUsersByType(@PathVariable int type) {
        return userRepository.findByUserType(type).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/unverified/type/{type}")
    public List<UserDTO> getUnverifiedUsersByType(@PathVariable int type) {
        return userRepository.findByUserTypeAndIsVerifiedFalse(type).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private UserDTO toDTO(UserModel user) {
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getAge(),
                user.getGender(),
                user.getBloodType(),
                user.getUsername(),
                user.getAddress(),
                user.isVerified()
        );
    }
}
