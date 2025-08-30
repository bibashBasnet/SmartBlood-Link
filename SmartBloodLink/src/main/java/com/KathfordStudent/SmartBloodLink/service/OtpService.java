package com.KathfordStudent.SmartBloodLink.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.KathfordStudent.SmartBloodLink.model.OtpTokenModel;
import com.KathfordStudent.SmartBloodLink.repository.OtpTokenRepository;

@Service
public class OtpService {

    private final OtpTokenRepository repo;

    public OtpService(OtpTokenRepository repo) {
        this.repo = repo;
    }

    public String generateAndSave(String userId, String purpose, Duration ttl) {
        String otp = String.format("%06d", (int)(Math.random() * 1_000_000));
        OtpTokenModel t = new OtpTokenModel();
        t.setUserId(userId);
        t.setPurpose(purpose);
        t.setCodeHash(sha256B64(otp));         // store HASH, not raw code
        t.setExpiresAt(Instant.now().plus(ttl));
        t.setAttempts(0);
        t.setUsed(false);
        t.setChannel("EMAIL");
        repo.save(t);
        return otp;                            // send this via email
    }

    public void verifyOrThrow(String userId, String purpose, String code) {
        OtpTokenModel t = repo
            .findTopByUserIdAndPurposeAndUsedFalseOrderByExpiresAtDesc(userId, purpose)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "OTP not found"));

        if (t.getExpiresAt().isBefore(Instant.now()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "OTP expired");
        if (t.getAttempts() >= 5)
            throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Too many attempts");

        t.setAttempts(t.getAttempts() + 1);
        // compare hashes
        if (!sha256B64(code).equals(t.getCodeHash())) {
            repo.save(t);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid OTP");
        }
        t.setUsed(true);
        repo.save(t);
    }

    private static String sha256B64(String s) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] dig = md.digest(s.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(dig);
        } catch (Exception e) {
            throw new RuntimeException("Hashing failed", e);
        }
    }
}
