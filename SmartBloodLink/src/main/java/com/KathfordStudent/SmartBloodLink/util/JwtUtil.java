package com.KathfordStudent.SmartBloodLink.util;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtUtil {
    
    private final Key secret_key;

    public JwtUtil(@Value("${jwt.secret}") String secreteKey){
        byte[] keyBytes = Base64.getDecoder().decode(secreteKey);
        this.secret_key = Keys.hmacShaKeyFor(keyBytes);
    }

    private static final long Exiration_time = 1296000000;

    public String generateToken(String userId){
        return Jwts.builder()
        .setSubject(userId)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + Exiration_time))
        .signWith(secret_key, SignatureAlgorithm.HS512)
        .compact();
    }

    public String validateTokenAndGetUserId(String token){
        Claims claims = Jwts.parserBuilder()
        .setSigningKey(secret_key)
        .build()
        .parseClaimsJws(token)
        .getBody();
        return claims.getSubject();
    }
}
