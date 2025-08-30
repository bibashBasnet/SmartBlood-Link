package com.smartbloodlink.adminpanel.controller;

import com.smartbloodlink.adminpanel.repository.UserRepository;
import com.smartbloodlink.adminpanel.repository.DonationRequestRepository;
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

    @Autowired
    private DonationRequestRepository donateRepository;

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count()-1);
        stats.put("verifiedUsers", (userRepository.countByUserTypeAndIsVerifiedTrue(0)+userRepository.countByUserTypeAndIsVerifiedTrue(1)));
        stats.put("totalRequests", (requestRepository.findByIsFresh(false)).size());
        stats.put("totalDonationRequest", donateRepository.count());
        return stats;
    }
}
