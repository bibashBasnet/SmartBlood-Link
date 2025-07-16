package com.smartbloodlink.adminpanel.dto;

public class UserDTO {
    private String id;
    private String name;
    private String email;
    private String phone;
    private int age;
    private String gender;
    private String bloodType;
    private String username;
    private String address;
    private boolean isVerified;

    public UserDTO(String id, String name, String email, String phone, int age,
                   String gender, String bloodType, String username, String address, boolean isVerified) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.age = age;
        this.gender = gender;
        this.bloodType = bloodType;
        this.username = username;
        this.address = address;
        this.isVerified = isVerified;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getBloodType() { return bloodType; }
    public void setBloodType(String bloodType) { this.bloodType = bloodType; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public boolean isVerified() { return isVerified; }
    public void setVerified(boolean verified) { isVerified = verified; }
}
