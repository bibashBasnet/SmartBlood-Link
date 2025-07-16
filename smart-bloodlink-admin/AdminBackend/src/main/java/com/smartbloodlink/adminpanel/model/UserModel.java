package com.smartbloodlink.adminpanel.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("users")
public class UserModel {
    @Id
    private String id;
    private String name;
    private String email;
    private String phone;
    private int age;
    private String gender;
    private String bloodType;
    private String username;
    private String password;
    private int userType; // 2: Admin, 0: User
    private String profileUrl;
    private String address;
    private boolean isVerified = false;
}
