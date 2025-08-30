package com.KathfordStudent.SmartBloodLink.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.KathfordStudent.SmartBloodLink.repository.UserRepository;
import com.KathfordStudent.SmartBloodLink.service.MailService;
import com.KathfordStudent.SmartBloodLink.service.OtpService;
import com.KathfordStudent.SmartBloodLink.service.ResetTokenService;

import java.time.Duration;
import java.util.Map;


@RestController
@RequestMapping("/auth/forgot-password")
public class ForgetPasswordController {
    private final UserRepository users;
    private final OtpService otpService;
    private final MailService mailService;
    private final ResetTokenService resetSvc;

    public ForgetPasswordController(UserRepository users,
                                    OtpService otpService,
                                    MailService mailService,
                                    ResetTokenService resetSvc) {
        this.users = users;
        this.otpService = otpService;
        this.mailService = mailService;
        this.resetSvc = resetSvc;
    }

    @PostMapping("/otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        users.findByEmail(email).ifPresent(user -> {
        String otp = otpService.generateAndSave(user.getId(), "RESET_PASSWORD", Duration.ofMinutes(10));
        mailService.send(email, "Your OTP", "Your password reset OTP is: " + otp + " (valid 10 minutes)");
        });
        // Always 200 for privacy
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String,String>> verify(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        String otp = body.get("otp");
        var user = users.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        otpService.verifyOrThrow(user.getId(), "RESET_PASSWORD", otp); // checks hash, expiry, attempts, marks used
        String resetToken = resetSvc.issue(user.getId(), Duration.ofMinutes(15)); // short-lived token
        return ResponseEntity.ok(Map.of("resetToken", resetToken));
    }

    @PostMapping("/reset")
    public ResponseEntity<?> reset(@RequestBody Map<String,String> body) {
        String token = body.get("token");
        String newPw = body.get("newPassword");
        String userId = resetSvc.requireValidUserId(token);
         var user = users.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token or user not found"));
        user.setPassword(newPw);
        users.save(user);
        resetSvc.revoke(token); // optional: one-time use
        return ResponseEntity.ok().build();
    }
}
