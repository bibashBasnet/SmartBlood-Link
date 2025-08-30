package com.KathfordStudent.SmartBloodLink.model;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Token")
public class OtpTokenModel {

    @Id
    private String id;          // MongoDB ObjectId (as String)
    private String userId;
    private String purpose;     // "RESET_PASSWORD"
    private String codeHash;    // bcrypt(OTP)
    private Instant expiresAt;  // now + 10m
    private int attempts;       // throttle (e.g., max 5)
    private boolean used;
    private String channel;     // "EMAIL"

    // --- Constructors ---
    public OtpTokenModel() {
    }

    public OtpTokenModel(String id, String userId, String purpose, String codeHash,
                         Instant expiresAt, int attempts, boolean used, String channel) {
        this.id = id;
        this.userId = userId;
        this.purpose = purpose;
        this.codeHash = codeHash;
        this.expiresAt = expiresAt;
        this.attempts = attempts;
        this.used = used;
        this.channel = channel;
    }

    // --- Getters and Setters ---
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPurpose() {
        return purpose;
    }
    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getCodeHash() {
        return codeHash;
    }
    public void setCodeHash(String codeHash) {
        this.codeHash = codeHash;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }
    public void setExpiresAt(Instant expiresAt) {
        this.expiresAt = expiresAt;
    }

    public int getAttempts() {
        return attempts;
    }
    public void setAttempts(int attempts) {
        this.attempts = attempts;
    }

    public boolean isUsed() {
        return used;
    }
    public void setUsed(boolean used) {
        this.used = used;
    }

    public String getChannel() {
        return channel;
    }
    public void setChannel(String channel) {
        this.channel = channel;
    }
}
