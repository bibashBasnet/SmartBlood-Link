package com.KathfordStudent.SmartBloodLink.service;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ResetTokenService {

    private static class Rec {
        final String userId;
        final Instant expiresAt;
        boolean used;
        Rec(String userId, Instant expiresAt) {
            this.userId = userId;
            this.expiresAt = expiresAt;
            this.used = false;
        }
    }

    private final Map<String, Rec> store = new ConcurrentHashMap<>();

    /** Issue a short-lived token (e.g., 15 minutes) tied to a userId */
    public String issue(String userId, Duration ttl) {
        String token = UUID.randomUUID().toString().replace("-", "");
        store.put(token, new Rec(userId, Instant.now().plus(ttl)));
        return token;
    }

    /** Validate and return userId; throws 401 if invalid/expired/used */
    public String requireValidUserId(String token) {
        Rec r = store.get(token);
        if (r == null || r.used || r.expiresAt.isBefore(Instant.now())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired token");
        }
        return r.userId;
    }

    /** Mark token as used (one-time use) */
    public void revoke(String token) {
        Rec r = store.get(token);
        if (r != null) {
            r.used = true;
            store.put(token, r);
        }
    }
}
