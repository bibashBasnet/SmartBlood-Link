package com.KathfordStudent.SmartBloodLink.dto;

public class LoginResponse {
    private String id;
    private String name;
    private String email;
    private String phone;
    private int age;
    private String bloodType;
    private String gender;
    private String address;

    public LoginResponse(String id, String name, String email, String phone, String bloodType, int age, String gender, String address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.bloodType = bloodType;
        this.age = age;
        this.address = address;
        this.gender = gender;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getBloodType() { return bloodType; }
    public String getGender() {return gender;}
    public String getAddress() {return address;}
}
