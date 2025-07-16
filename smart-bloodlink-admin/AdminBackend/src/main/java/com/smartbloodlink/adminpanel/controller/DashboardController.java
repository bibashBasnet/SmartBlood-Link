package com.smartbloodlink.adminpanel.controller;

import com.smartbloodlink.adminpanel.repository.UserRepository;
import com.smartbloodlink.adminpanel.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RequestRepository requestRepository;

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("verifiedUsers", userRepository.countByUserTypeAndIsVerifiedTrue(0));
        stats.put("totalRequests", requestRepository.count());

        return stats;
    }
}
